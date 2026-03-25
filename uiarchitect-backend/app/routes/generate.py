from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import json

from app.services.ai_service import generate_component_tree

router = APIRouter()

@router.post("/generate")
async def generate(
    image: UploadFile = File(...),
    language: str = Form(...),
    mimeType: str = Form(...),
):

    if not image or not language or not mimeType:
        print('no image detected')
        raise HTTPException(status_code=400, detail="Image, language, and mimeType are required")

    contents = await image.read()
    result = await generate_component_tree(contents, language, mimeType)

    try:
        data = json.loads(result)

        if "error" in data:
            return {
                "success": False,
                "error": data["error"],
                "message": data.get("message", "Something went wrong - is the image UI?")
            }

        return {
            "success": True,
            "data": data,
            "language": language
        }

    except Exception:
        return {
            "success": False,
            "error": "ParseError",
            "message": "Failed to parse AI response"
        }
