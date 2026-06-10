from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from database import Base, engine, SessionLocal
from schemas import ComicCreate
from crud import create_comic, get_comic, get_all_comics, delete_comic

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Founder Comics API")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/comics")
def generate_comic(comic: ComicCreate, db: Session = Depends(get_db)):
    return create_comic(db, comic.dict())


@app.get("/comics")
def list_comics(db: Session = Depends(get_db)):
    return get_all_comics(db)


@app.get("/comics/{comic_id}")
def fetch_comic(comic_id: str, db: Session = Depends(get_db)):
    comic = get_comic(db, comic_id)
    if not comic:
        raise HTTPException(status_code=404, detail="Comic not found")
    return comic


@app.delete("/comics/{comic_id}")
def remove_comic(comic_id: str, db: Session = Depends(get_db)):
    comic = delete_comic(db, comic_id)
    if not comic:
        raise HTTPException(status_code=404, detail="Comic not found")
    return {"message": "Comic deleted"}
