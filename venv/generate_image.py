import os
from huggingface_hub import InferenceClient
from PIL import Image

with open("api_key.txt", "r") as file:
    api_key = file.read().strip() 


client = InferenceClient(
	provider="replicate",
	api_key="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"
)


# Define save directory
save_dir = "GeneratedImages"
os.makedirs(save_dir, exist_ok=True)  # Create folder if it doesn't exist

def Generate_Image(prompt):
    """Generates an image based on the given prompt and saves it."""
    image = client.text_to_image(
        prompt,
        model="stabilityai/stable-diffusion-3.5-large"
    )
    print("\nGenerating Image")

    # Create a unique filename
    image_filename = f"{prompt[:7].replace(' ', '_')}.png"
    image_path = os.path.join(save_dir, image_filename)

    # Save image
    image.save(image_path)
    print(f"Image saved at: {image_path}")

    return image_path  # Return path to the saved image


Generate_Image("cat on space")