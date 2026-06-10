from sqlalchemy.orm import Session
from models import Comic, Panel

def create_comic(db: Session, comic_data: dict):
    comic = Comic(
        title=comic_data["title"],
        theme=comic_data["theme"],
        mood=comic_data["mood"],
        prompt_text=comic_data["prompt_text"]
    )

    db.add(comic)
    db.commit()
    db.refresh(comic)

    for panel in comic_data["panels"]:
        db_panel = Panel(
            comic_id=comic.id,
            panel_number=panel["panel_number"],
            description=panel["description"],
            dialogue=panel.get("dialogue"),
            image_url=panel.get("image_url")
        )
        db.add(db_panel)

    db.commit()
    return comic


def get_comic(db: Session, comic_id: str):
    return db.query(Comic).filter(Comic.id == comic_id).first()


def get_all_comics(db: Session):
    return db.query(Comic).order_by(Comic.created_at.desc()).all()


def delete_comic(db: Session, comic_id: str):
    comic = get_comic(db, comic_id)
    if comic:
        db.delete(comic)
        db.commit()
    return comic
