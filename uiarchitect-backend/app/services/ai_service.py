import os
from openai import OpenAI
import base64

from dotenv import load_dotenv
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=OPENAI_API_KEY)

MODEL = 'gpt-4o-mini'

async def generate_component_tree(
    image_contents: bytes,
    language: str
):
    # convert to readable b64 str format for AI
    base64_image = base64.b64encode(image_contents).decode("utf-8")

    prompt = f"""
    You are an expert software architect.

    Analyse the provided UI image and generate a clean, scalable architecture based on the selected language.

    SELECTED LANGUAGE: {language}

    IMPORTANT:
    You MUST strictly follow the rules for the selected language.

    VALIDATION RULE:
    If the image is NOT a user interface (e.g. it is a photo, landscape, person, animal, object), return EXACTLY:

    {{
    "error": "InvalidUI",
    "message": "The provided image does not appear to be a user interface."
    }}

    IF THE IMAGE IS A UI:

    1. Identify logical UI sections (e.g. Header, Hero, CardList, Footer)
    2. Break into reusable units
    3. Use a hierarchical tree structure
    4. Avoid generic names like "Component1", "Box", "Container"
    5. Group repeated elements into reusable units

    LANGUAGE-SPECIFIC RULES (STRICT):

    If language == "TypeScript" or "JavaScript":
    - Use React Native architecture
    - Types allowed: component, hook, style
    - Naming:
        - Components → PascalCase (HeroSection)
        - Hooks → camelCase starting with "use" (useHeroData)

    If language == "Python":
    - Use backend/API architecture (FastAPI style)
    - Types allowed: route, service, function
    - Naming:
        - snake_case (get_hero_data)

    If language == "Kotlin":
    - Use Android architecture
    - Types allowed: screen, composable, viewmodel
    - Naming:
        - PascalCase (HeroScreen, HeroViewModel)

    OUTPUT FORMAT (STRICT JSON ONLY):

    {{
    "name": "App",
    "type": "root",
    "children": [
        {{
        "name": "ExampleNode",
        "type": "component | hook | style | route | service | function | screen | composable | viewmodel",
        "children": []
        }}
    ]
    }}

    RULES:
    - Do NOT include any explanation
    - Do NOT include markdown
    - Return ONLY valid JSON
    """

    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt
                    },
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{base64_image}"
                        }
                    }
                ]
            }
        ]
    )

    return response.choices[0].message.content
