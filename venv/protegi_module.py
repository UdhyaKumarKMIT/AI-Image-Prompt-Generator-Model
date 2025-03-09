beam_prompt = """
You are a model which performs beam search on a stable diffusion prompt.
You will be given a prompt. You will generate 2 prompts which have the same semantic meaning to the input prompt.
Remember that these are prompts for stable diffusion and should follow that format.
The output will be in json format, with the key as "output".
Input:
"""

gradient_prompt = """
You are model for generating textual gradient (criticism) for given input prompts.
I will give image prompt as input. You will generate criticisms for the image caption.
Generate up to 3 criticisms. Keep in mind that this an prompt for stable diffusion,
so provide criticisms to refine the quality of generated image from the prompt.
Be specific about the criticisms.
The output will be in json format, with the key as "output".
Input:
"""

implement_prompt = """
You are a model for implementing criticisms to transform a prompt.
I give you a prompt for stable diffusion and list of criticisms.
You will generate a modified prompt based on the criticisms.
Keep in mind that you are generating a prompt for an image generation model.
The output will be in json format, with the key as "output".
Input:
"""

import json

from openai import OpenAI

client = OpenAI(api_key="sk-eebb12441c3d4fe88c350dc104ea0e7c", base_url="https://api.deepseek.com")

# sk-eebb12441c3d4fe88c350dc104ea0e7c

def parse_json_garbage(s):
    s = s[next(idx for idx, c in enumerate(s) if c in "{["):]
    try:
        return json.loads(s)
    except json.JSONDecodeError as e:
        return json.loads(s[:e.pos])


def beam_search(prompt):
    p = beam_prompt+prompt+"\nOutput:"

    response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a model which performs beam search on a stable diffusion prompt."},
        {"role": "user", "content": p},
    ],
    stream=False
    )
    x = response.choices[0].message.content
    y = parse_json_garbage(x)
    return y["output"]
    
    
def gradient(prompt):
    p = gradient_prompt+prompt+"\nOutput:"

    response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are model for generating textual gradient (criticism) for given input prompts."},
        {"role": "user", "content": p},
    ],
    stream=False
    )
    x = response.choices[0].message.content
    y = parse_json_garbage(x)
    return y["output"]


def implement(prompt, criticisms):
    p = implement_prompt+prompt+"\nCriticisms:"+criticisms+"\nOutput"

    response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a model for implementing criticisms to transform a prompt."},
        {"role": "user", "content": p},
    ],
    stream=False
    )
    x = response.choices[0].message.content
    y = parse_json_garbage(x)
    return y["output"]

import torch
import open_clip
from PIL import Image
from sentence_transformers import SentenceTransformer, util
from sklearn.preprocessing import MinMaxScaler
from bert_score import score
import textstat
from transformers import logging as hf_logging
import re
from sklearn.metrics.pairwise import cosine_similarity

# Device setup
device = "cuda" if torch.cuda.is_available() else "cpu"

# Load CLIP Model (ViT-L/14)
clip_model_name = 'ViT-L-14/openai'
clip_model_name, clip_model_pretrained_name = clip_model_name.split('/', 2)

clip_model, _, clip_processor = open_clip.create_model_and_transforms(
    clip_model_name, 
    pretrained=clip_model_pretrained_name, 
    precision='fp16' if device == 'cuda' else 'fp32',
    device=device,
    jit=False,
    cache_dir=None
)

tokenizer = open_clip.get_tokenizer(clip_model_name)
clip_model.eval()

# Load SBERT Model for Text Similarity
embedding_model  = SentenceTransformer("all-MiniLM-L6-v2")

# Suppress Hugging Face Warnings
hf_logging.set_verbosity_error()

def compute_clip_scores(image, prompts):
    image = clip_processor(image).unsqueeze(0).to(device)
    text_tokens = tokenizer(prompts).to(device)

    with torch.no_grad():
        image_features = clip_model.encode_image(image.half())
        text_features = clip_model.encode_text(text_tokens)

    image_features /= image_features.norm(dim=-1, keepdim=True)
    text_features /= text_features.norm(dim=-1, keepdim=True)
    
    clip_scores = (text_features @ image_features.T).squeeze().tolist()  # Cosine similarity
    return clip_scores

def score_prompt_refinements(raw_caption, prompts, image_path):
    image = Image.open(image_path)

    ### 1. CLIP Similarity Score ###
    clip_scores = compute_clip_scores(image, prompts)
    scaler = MinMaxScaler()
    clip_scores = scaler.fit_transform([[s] for s in clip_scores]).flatten()
    
    ### 2. LLM Ranking Score ###
    prompt_text = "\n".join([f"{i+1}. {p}" for i, p in enumerate(prompts)])
    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
        {"role": "system", "content": "You are an expert in ranking and scoring image descriptions."},
        {"role": "user", "content": f"""Given the original caption:
        
        "{raw_caption}"
        
        Score the following refined prompts on a scale of 0 to 1 based on their accuracy, descriptiveness, and coherence. Return the scores as a **Python list** in the same order as the input prompts.
        
        Prompts:
        {prompts}
        
        Output format: [score1, score2, score3, ...]"""},
    ],
        stream=False
    )

    content = response.choices[0].message.content
    cleaned_content = re.sub(r"```[\w]*", "", content).strip()  # Removes ```python and ```
    llm_scores = eval(cleaned_content)

    ### 3. Embedding Similarity Score ###
    original_embedding = embedding_model.encode(raw_caption, convert_to_tensor=True).cpu().numpy().reshape(1, -1)
    prompt_embeddings = embedding_model.encode(prompts, convert_to_tensor=True).cpu().numpy()
    
    embed_scores = cosine_similarity(original_embedding, prompt_embeddings).flatten()
    embed_scores = scaler.fit_transform(embed_scores.reshape(-1, 1)).flatten()
    
    w1, w2, w3 = 0.6, 0.25, 0.15  # Weights for CLIP, LLM, and Embeddings
    final_scores = [
        w1 * clip + w2 * llm + w3 * embed
        for clip, llm, embed in zip(clip_scores, llm_scores, embed_scores)
    ]

    sorted_prompts = sorted(zip(prompts, final_scores), key=lambda x: x[1], reverse=True)

    return sorted_prompts

def generator(caption_input, image_path):
# Integrate all the steps
    T = 1

    start = [caption_input]
    start += beam_search(caption_input)

    for _ in range(T):
        criticisms = []
        print("Generating Criticisms")
        for s in start:
            criticisms.append([str(crit) for crit in gradient(s)])
        new_prompts = []
        print("Implementing Criticisms")
        for x,y in zip(start,criticisms):
            new_prompts.append(implement(x,",".join(y)))
        beam = []
        print("Beam Search Expansion")
        for x in new_prompts:
            beam.append(x)
            beam += beam_search(x)
        print("Scoring Prompts")
        results = score_prompt_refinements(caption_input, beam, image_path)
        start.clear()
        for p in results[:3]:
            start.append(p[0])
        print(start)
    return start