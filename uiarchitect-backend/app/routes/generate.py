from fastapi import APIRouter, UploadFile, File, Form, HTTPException
import json

from app.services.ai_service import generate_component_tree

router = APIRouter()

@router.post("/generate")
async def generate(
    image: UploadFile = File(...),
    language: str = Form(...)
):
    if not image or language:
        raise HTTPException(status_code=400, detail="Image and language is required")

    contents = await image.read()
    result = await generate_component_tree(contents, language)

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
