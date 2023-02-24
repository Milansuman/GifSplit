from flask import *
from PIL import ImageSequence, Image
import json
import hashlib
import os
import threading
import time
import cleanup

class Clean(threading.Thread):
    def __init__(self, folder, filter_seconds, sleep_time):
        super().__init__()
        self.lock = threading.Lock()
        self.is_using = False
        self.secs = filter_seconds
        self.folder = folder
        self.sleep_time = sleep_time
        self.daemon = True #daemonize cleanup thread

    def run(self):
        while True:
            if not self.is_using:
                with self.lock:
                    cleanup.clear_cache(self.folder, self.secs)
            time.sleep(self.sleep_time)
            
cleanup_thread = Clean("uploads/", 60 * 5, 60 * 10)
cleanup_thread.start()

app = Flask(__name__)

@app.route("/")
def index(name=None):
    return render_template("index.html", name=name)

@app.route("/uploads/<filename>")
def uploads(filename):
    return send_file(f"uploads/{filename}")

@app.route("/api/split", methods=['POST'])
def split():
    cleanup_thread.is_using = True
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

                    if not os.path.exists(f"uploads/{frame_hash}.png"):
                        frame.save(f"uploads/{frame_hash}.png", format="PNG")
                        
                    frames.append(f"uploads/{frame_hash}.png")
        
        cleanup_thread.is_using = False
        return json.dumps({"frames": frames})
    except:
        cleanup_thread.is_using = False
        return make_response(json.dumps({}), 400)
