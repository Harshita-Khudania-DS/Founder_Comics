from sqlalchemy import Column, String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from database import Base

class Comic(Base):
    __tablename__ = "comics"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String(255))
    theme = Column(String(100))
    mood = Column(String(100))
    prompt_text = Column(String(1000))
    llm_model = Column(String(50), default="phi")
    created_at = Column(DateTime, default=datetime.utcnow)

    panels = relationship(
        "Panel",
        back_populates="comic",
        cascade="all, delete"
    )


class Panel(Base):
    __tablename__ = "panels"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    comic_id = Column(String(36), ForeignKey("comics.id"))
    panel_number = Column(Integer)
    description = Column(String(1000))
    dialogue = Column(String(500))
    image_url = Column(String(500))  # Object storage URL
    created_at = Column(DateTime, default=datetime.utcnow)

    comic = relationship("Comic", back_populates="panels")
