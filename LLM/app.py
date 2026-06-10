from flask import Flask, render_template_string, request
from transformers import pipeline
from diffusers import StableDiffusionPipeline
import torch
import base64
from io import BytesIO

app = Flask(__name__)

# -------------------------
# LOAD TEXT MODEL (for script)
# -------------------------
text_generator = pipeline(
    "text-generation",
    model="gpt2"
)

# -------------------------
# LOAD IMAGE MODEL
# -------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"

image_generator = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    torch_dtype=torch.float16 if device == "cuda" else torch.float32
)

image_generator = image_generator.to(device)


HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Joke to Comic Generator</title>
</head>
<body style="text-align:center; font-family:Arial;">
    <h1>Joke → Comic Generator</h1>

    <form method="POST">
        <textarea name="joke" rows="4" cols="50" placeholder="Enter your joke here..."></textarea><br><br>
        <button type="submit">Generate Comic</button>
    </form>

    {% if script %}
        <h2>Comic Script:</h2>
        <p>{{ script }}</p>
    {% endif %}

    {% if image %}
        <h2>Generated Comic Image:</h2>
        <img src="data:image/png;base64,{{ image }}" width="512">
    {% endif %}
</body>
</html>
"""

# -------- TEXT GENERATION --------
def generate_script(joke):
    prompt = f"Convert this joke into a funny 3-panel comic description:\nJoke: {joke}\nComic:"
    
    result = text_generator(prompt, max_length=200, do_sample=True)
    return result[0]["generated_text"]


# -------- IMAGE GENERATION --------
def generate_image(script):
    prompt = f"3 panel comic strip, cartoon style, colorful, {script}"

    image = image_generator(prompt).images[0]

    buffered = BytesIO()
    image.save(buffered, format="PNG")
    return base64.b64encode(buffered.getvalue()).decode()


@app.route("/", methods=["GET", "POST"])
def home():
    script = None
    image = None

    if request.method == "POST":
        joke = request.form["joke"]
        script = generate_script(joke)
        image = generate_image(script)

    return render_template_string(HTML, script=script, image=image)


if __name__ == "__main__":
    app.run(debug=True)
