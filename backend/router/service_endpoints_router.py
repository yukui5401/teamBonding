from fastapi import Request, APIRouter
from loguru import logger
import json

from service.generate_image_prompt import get_image_prompt

router = APIRouter(prefix="/api", tags=["api"])

@router.post("/image_prompt")
async def image_prompt(request: Request):
    """
    text to image endpoint
    request format:
    {
        "batch": "user inputs"
    }
    """

    data = await request.json()
    logger.info(f"TTM Request Received {data}")

    result = get_image_prompt(data["batch"])
    return result