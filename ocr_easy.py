import sys
import json
import contextlib
import warnings

warnings.filterwarnings(
    "ignore",
    message="'pin_memory' argument is set as true"
)

def main():
    if len(sys.argv) < 2:
        print(json.dumps({
            "success": False,
            "text": "",
            "error": "Image path is required"
        }, ensure_ascii=False))
        return

    image_path = sys.argv[1]

    try:
        with contextlib.redirect_stdout(sys.stderr):
            import easyocr

            reader = easyocr.Reader(
                ['th', 'en'],
                gpu=False,
                verbose=False
            )

            results = reader.readtext(
                image_path,
                detail=0,
                paragraph=False,
                decoder="beamsearch",
                mag_ratio=2,
                contrast_ths=0.1,
                adjust_contrast=0.7,
                text_threshold=0.6,
                low_text=0.3
            )

            text = "\n".join(results).strip()

        print(json.dumps({
            "success": True,
            "text": text,
            "error": None
        }, ensure_ascii=False))

    except Exception as e:
        print(json.dumps({
            "success": False,
            "text": "",
            "error": str(e)
        }, ensure_ascii=False))

if __name__ == "__main__":
    main()