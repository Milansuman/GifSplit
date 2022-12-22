from PIL import Image, ImageSequence
from typing import List

def extract_frames(image: Image.Image) -> List[Image.Image]:
    if image.format != "GIF":
        return

    frames: List[Image.Image] = []
    for frame in ImageSequence.Iterator(image):
        frames.append(frame)