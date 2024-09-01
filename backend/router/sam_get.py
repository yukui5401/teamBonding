from fastapi import Request, APIRouter
from loguru import logger
import json

router = APIRouter(prefix="/info", tags=["info"])

@router.get("/all")
async def image_prompt(request: Request):
    """
    Info about the project
    """

    return "This project serves DreamGPT"