from fastapi import FastAPI, HTTPException, Depends, status, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import Base, MenuItem
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import os

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class MenuItemBase(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image: Optional[str] = None
    popular: bool = False

class MenuItemCreate(MenuItemBase):
    pass

class MenuItemResponse(MenuItemBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# Routes
@app.get("/")
def read_root():
    return {"message": "Welcome to the Menu API"}

@app.get("/api/menu/", response_model=List[MenuItemResponse])
def get_menu_items(
    response: Response,
    skip: int = 0, 
    limit: int = 100, 
    db: Session = Depends(get_db)
):
    # Add cache control headers
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    
    items = db.query(MenuItem).offset(skip).limit(limit).all()
    return items

@app.get("/api/menu/{item_id}", response_model=MenuItemResponse)
def get_menu_item(
    item_id: int, 
    response: Response,
    db: Session = Depends(get_db)
):
    # Add cache control headers
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    
    db_item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    if db_item is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    return db_item

@app.put("/api/menu/{item_id}", response_model=MenuItemResponse)
def update_menu_item(
    item_id: int, 
    item: MenuItemCreate, 
    db: Session = Depends(get_db)
):
    # Query the database for the item
    db_item = db.query(MenuItem).filter(MenuItem.id == item_id).first()
    
    # If item not found, return 404
    if db_item is None:
        raise HTTPException(status_code=404, detail="Menu item not found")
    
    # Update the item with new values
    update_data = item.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)
    
    # Save changes to database
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    
    return db_item

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)