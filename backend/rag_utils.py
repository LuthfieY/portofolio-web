import os
import uuid
from qdrant_client import QdrantClient
from qdrant_client.http import models
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

QDRANT_URL = os.getenv("QDRANT_URL", "http://qdrant:6333")
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
QDRANT_COLLECTION = "projects"

# Initialize Clients
qdrant_client = QdrantClient(url=QDRANT_URL)
if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)

def init_qdrant():
    """Ensure collection exists"""
    try:
        collections = qdrant_client.get_collections()
        exists = any(c.name == QDRANT_COLLECTION for c in collections.collections)
        
        if not exists:
            qdrant_client.create_collection(
                collection_name=QDRANT_COLLECTION,
                vectors_config=models.VectorParams(
                    size=768,  # Gemini embedding-001 size
                    distance=models.Distance.COSINE
                )
            )
            print(f"Created Qdrant collection: {QDRANT_COLLECTION}")
    except Exception as e:
        print(f"Failed to init Qdrant: {e}")

async def sync_project_to_qdrant(project_data: dict):
    if not GOOGLE_API_KEY:
        print("GOOGLE_API_KEY not set, skipping RAG sync.")
        return

    try:
        # Prepare text to embed
        text_content = f"Title: {project_data.get('title')}\nDescription: {project_data.get('description')}\nTags: {', '.join(project_data.get('tags', []))}"
        
        # Generate Embedding
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=text_content,
            task_type="retrieval_document",
            title=project_data.get('title')
        )
        embedding = result['embedding']
        
        # Prepare Payload
        payload = {
            "pageContent": text_content,  # camelCase for n8n/LangChain
            "page_content": text_content,  # snake_case for backwards compatibility
            "text": text_content,
            "metadata": {
                "title": project_data.get("title", "Untitled"),
                "technologies": ", ".join(project_data.get("tags", [])),
                "project_link": project_data.get("project_url", ""),
                "github_link": project_data.get("github_url", ""),
                "category": project_data.get("category", ""),
                "featured": project_data.get("featured", False)
            }
        }
        
        # Generate a UUID from the ObjectId string
        project_uuid = str(uuid.uuid5(uuid.NAMESPACE_OID, str(project_data.get('_id'))))

        qdrant_client.upsert(
            collection_name=QDRANT_COLLECTION,
            points=[
                models.PointStruct(
                    id=project_uuid, 
                    vector=embedding,
                    payload=payload
                )
            ]
        )
        print(f"Synced project {project_data.get('title')} to Qdrant.")
        
    except Exception as e:
        print(f"Error syncing to Qdrant: {e}")

async def delete_project_from_qdrant(project_id: str):
    if not GOOGLE_API_KEY:
        return

    try:
        # Generate UUID from ID (same method as sync)
        project_uuid = str(uuid.uuid5(uuid.NAMESPACE_OID, str(project_id)))

        qdrant_client.delete(
            collection_name=QDRANT_COLLECTION,
            points_selector=models.PointIdsList(
                points=[project_uuid]
            )
        )
        print(f"Deleted project {project_id} from Qdrant.")
    except Exception as e:
        print(f"Error deleting from Qdrant: {e}")

def get_uuid_from_oid(oid_str):
    return str(uuid.uuid5(uuid.NAMESPACE_OID, str(oid_str)))
