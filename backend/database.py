from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017/portfolio")

client = AsyncIOMotorClient(MONGO_DETAILS)

# Extract database name from connection string or use default
# Connection string format: mongodb://host:port/database_name
db_name = MONGO_DETAILS.split('/')[-1].split('?')[0] if '/' in MONGO_DETAILS and MONGO_DETAILS.split('/')[-1] else "portfolio"
database = client[db_name]

def get_database():
    return database
