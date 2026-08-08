import os
import sys

try:
    from PIL import Image  # type: ignore
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image  # type: ignore

root = r"c:\Users\pavan\Downloads\casr-clubs-hub"

# 1. Crop Owl Logo (Logos - 2_20260227_150721_0000.png)
owl_path = os.path.join(root, "Logos - 2_20260227_150721_0000.png")
if os.path.exists(owl_path):
    img = Image.open(owl_path)
    w, h = img.size
    # The blue circle is centered horizontally and sits near the bottom
    # Let's crop bounding box around the circle
    # Box: left, upper, right, lower
    box = (int(w * 0.08), int(h * 0.16), int(w * 0.92), int(h * 0.82))
    cropped = img.crop(box)
    out_owl = os.path.join(root, "src", "logo_owl.png")
    cropped.save(out_owl, "PNG")
    print(f"Saved cropped owl logo to {out_owl}")

# 2. Crop Centurion Emblem Logo (images (1).jpeg)
centurion_path = os.path.join(root, "images (1).jpeg")
if os.path.exists(centurion_path):
    img = Image.open(centurion_path)
    w, h = img.size
    # The top circular emblem occupies roughly (0, 0, w, w)
    box = (0, 0, w, int(w * 1.02))
    cropped = img.crop(box)
    out_centurion = os.path.join(root, "src", "logo_centurion.png")
    cropped.save(out_centurion, "PNG")
    print(f"Saved cropped Centurion emblem logo to {out_centurion}")

