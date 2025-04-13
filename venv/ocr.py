import base64
from PIL import Image
import io

def encode_image_to_base64(image):
    """Convert image to base64 string"""
    if isinstance(image, str):
        with open(image, "rb") as image_file:
            return base64.b64encode(image_file.read()).decode('utf-8')
    else:
        buffered = io.BytesIO()
        Image.fromarray(image).save(buffered, format="PNG")
        return base64.b64encode(buffered.getvalue()).decode('utf-8')
    
from groq import Groq

def analyze_image(image):
    """Analyze image using Groq's vision model and return response."""
    try:
        base64_image = encode_image_to_base64(image) 
        print("Encoded Image:", base64_image[:100])
        
        client = Groq(api_key="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")
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text", 
                            "text": "Extract all data from the image in table format (columns and rows)."
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/png;base64,{base64_image}",
                            },
                        },
                    ],
                }
            ],
            model="llama-3.2-90b-vision-preview",
            temperature=0.1,
        )
        
        return chat_completion.choices[0].message.content
    
    except Exception as e:
        return f"Error occurred: {str(e)}"