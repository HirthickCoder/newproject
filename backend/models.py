# models.py
from sqlalchemy import Column, Integer, String, Float, Text, Boolean
from database import Base
from datetime import datetime

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from database import Base
from datetime import datetime

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    price = Column(Float)
    category = Column(String)
    image = Column(String, nullable=True)
    popular = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
class HomePageContent(Base):
    __tablename__ = 'home_page_content'
    
    id = Column(Integer, primary_key=True, index=True)
    section = Column(String(50), unique=True, nullable=False)
    title = Column(String(200))
    subtitle = Column(Text)
    content = Column(Text)
    image = Column(String(255))
    button_text = Column(String(50))
    button_link = Column(String(100))
    active = Column(Boolean, default=True)
    order = Column(Integer, default=0)
    created_at = Column(String(50), default=datetime.utcnow)
    updated_at = Column(String(50), default=datetime.utcnow, onupdate=datetime.utcnow)