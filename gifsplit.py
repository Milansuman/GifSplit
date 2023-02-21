from flask import *
from PIL import ImageSequence, Image
import json
import hashlib

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

            # Getting the hash of the file contents. This can help avoid duplication
            file_hash = hashlib.md5(file.stream.read()).hexdigest()

            with Image.open(file) as im:
                for i, frame in enumerate(ImageSequence.Iterator(im)):

                    #creating a hash for all the frames. The hashing helps with duplication issues.
                    frame_hash = hashlib.md5(f"{file_hash}{i}".encode()).hexdigest()
                    frame.save(f"uploads/{frame_hash}.png", format="PNG")
                    frames.append(f"uploads/{frame_hash}.png")

        
        return json.dumps({"frames": frames})
    except Exception as e:
        print(e)
        return make_response(json.dumps({}), 400)
