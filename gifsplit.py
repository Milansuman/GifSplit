from flask import *
from PIL import ImageSequence, Image
import json

app = Flask(__name__)

@app.route("/")
def index(name=None):
    return render_template("index.html", name=name)

@app.route("/uploads/<filename>")
def uploads(filename):
    return send_file(f"uploads/{filename}")

@app.route("/api/split", methods=['POST'])
def split():
    frames = []
    try:
        if request.method == 'POST':
            file = request.files['image']
            with Image.open(file) as im:
                for i, frame in enumerate(ImageSequence.Iterator(im)):
                    frame.save(f"uploads/{file.filename}_{i}.png", format="PNG")
                    frames.append(f"uploads/{file.filename}_{i}.png")

        
        return json.dumps({"frames": frames})
    except:
        return make_response(json.dumps({}), 400)
