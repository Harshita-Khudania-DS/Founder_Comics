from pydantic import BaseModel
from typing import List, Optional

class PanelCreate(BaseModel):
    panel_number: int
    description: str
    dialogue: Optional[str]
    image_url: Optional[str]


class ComicCreate(BaseModel):
    title: str
    theme: str
    mood: str
    prompt_text: str
    panels: List[PanelCreate]


class PanelResponse(PanelCreate):
    id: str

    class Config:
        orm_mode = True


class ComicResponse(BaseModel):
    id: str
    title: str
    theme: str
    mood: str
    panels: List[PanelResponse]

    class Config:
        orm_mode = True
