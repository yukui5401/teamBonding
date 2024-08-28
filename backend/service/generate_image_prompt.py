import cohere
from loguru import logger
import time

co = cohere.Client('iUQfod3NXl7FzpL5Xj79ao9Pu8JYyVgMPfv2pRwJ')

master_prompt = "Create an image with the following description \n"
master_prompt_keywords = ["abstract", "pastel color palette"]

class CoherePlatform:
        def __init__(self, **kwargs):
            self.__dict__.update(kwargs)  
            self.model = kwargs.get('model', 'command-xlarge-nightly')
            self.log = kwargs.get('log', False)

        def generate(self, prompt: str) -> str:
            raw_res = co.generate(
                model=self.model,
                prompt=prompt,
                max_tokens=self.max_tokens
            )
            res = raw_res.generations[0].text.strip()
            if self.log:
                logger.debug(f"Generated Response: {res}")
            return res


def get_image_prompt(batch):
    prompts = {
    "themes": f"Brielfy list the key themes from the following dream description: '{batch}'.",
    "sentiment": f"Brielfy list  the emotions of the following dream description: '{batch}'. Provide an overall emotional tone. Do not include the introductory sentence.",
    "colours_scheme": f"Brielfy list colour scheme that would best reflect this dream: '{batch}'"
}

    cohere_client = CoherePlatform(max_tokens=100, log=True)

    ai_res = {k: cohere_client.generate(v) for k, v in prompts.items()}

    prompt_4 = f"""Generate a concise image description (max 30 words) that incorporates the following elements:
themes: {ai_res['themes']}, sentiment: {ai_res['sentiment']}, colour schemes: {ai_res['colours_scheme']}, and style elements as {', '.join(master_prompt_keywords)}."""
    image_prompt = master_prompt + cohere_client.generate(prompt_4)

    return image_prompt

