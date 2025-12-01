from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from tabulate import tabulate
from dotenv import load_dotenv
import os

load_dotenv()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)

# Fetch and display data
db = SessionLocal()
try:
    result = db.execute(text("SELECT * FROM menu_items"))
    rows = result.fetchall()
    if rows:
        # Get column names
        columns = result.keys()
        # Print as table
        print(tabulate(rows, headers=columns, tablefmt='grid'))
    else:
        print("No data found in the menu_items table")
except Exception as e:
    print(f"Error: {e}")
finally:
    db.close()