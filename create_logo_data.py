import base64
import os

root = r"c:\Users\pavan\Downloads\casr-clubs-hub"

owl_path = os.path.join(root, "Logos - 2_20260227_150721_0000.png")
centurion_path = os.path.join(root, "images (1).jpeg")

owl_b64 = ""
if os.path.exists(owl_path):
    with open(owl_path, "rb") as f:
        owl_b64 = base64.b64encode(f.read()).decode("utf-8")

centurion_b64 = ""
if os.path.exists(centurion_path):
    with open(centurion_path, "rb") as f:
        centurion_b64 = base64.b64encode(f.read()).decode("utf-8")

ts_content = f'''// Auto-generated embedded logos for zero 404 / 100% Vercel reliability
export const CASR_OWL_LOGO = "data:image/png;base64,{owl_b64}";
export const CENTURION_EMBLEM_LOGO = "data:image/jpeg;base64,{centurion_b64}";
'''

out_path = os.path.join(root, "src", "data", "logoData.ts")
with open(out_path, "w", encoding="utf-8") as f:
    f.write(ts_content)

print("Created logoData.ts successfully!")
