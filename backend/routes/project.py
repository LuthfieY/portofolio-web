from fastapi import APIRouter, Body, Depends, HTTPException, status, Form, File, UploadFile
from fastapi.encoders import jsonable_encoder
from typing import List

from models import ProjectItemSchema, UpdateProjectItemSchema, UserSchema
from auth import get_current_user
from database import get_database
from bson.objectid import ObjectId

router = APIRouter()

def project_helper(project) -> dict:
    return {
        "id": str(project["_id"]),
        "title": project["title"],
        "category": project.get("category", ""),
        "description": project["description"],
        "image_url": project["image_url"],
        "project_url": project.get("project_url", []),
        "github_url": project.get("github_url", []),
        "tags": project.get("tags", []),
    }

@router.post("/", response_description="Add new project item", response_model=ProjectItemSchema)
async def add_project_item(
    title: str = Form(...),
    category: str = Form(""),
    description: str = Form(...),
    project_url: str = Form(...),  # Comma-separated URLs
    github_url: str = Form(...),  # Comma-separated URLs
    tags: str = Form(...), # Received as comma-separated string
    image: UploadFile = File(...),
    current_user: UserSchema = Depends(get_current_user)
):
    import shutil
    import os
    
    # Validation for image
    if not image.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Ensure upload directory exists
    UPLOAD_DIR = "static/uploads"
    os.makedirs(UPLOAD_DIR, exist_ok=True)
    
    # Save file
    file_location = f"{UPLOAD_DIR}/{image.filename}"
    with open(file_location, "wb+") as file_object:
        shutil.copyfileobj(image.file, file_object)
        
    # Construct project object
    # In production, image_url should be the full public URL. 
    # For now, we'll store the relative path which Nginx/FastAPI static mount should serve.
    image_url = f"/uploads/{image.filename}"
    
    tags_list = [tag.strip() for tag in tags.split(',')] if tags else []
    project_urls = [url.strip() for url in project_url.split(',') if url.strip()]
    github_urls = [url.strip() for url in github_url.split(',') if url.strip()]

    project_data = {
        "title": title,
        "category": category,
        "description": description,
        "image_url": image_url,
        "project_url": project_urls,
        "github_url": github_urls,
        "tags": tags_list
    }
    
    db = get_database()
    new_project = await db.projects.insert_one(project_data)
    created_project = await db.projects.find_one({"_id": new_project.inserted_id})
    return project_helper(created_project)

@router.get("/", response_description="List all project items", response_model=List[dict])
async def get_project_items():
    db = get_database()
    projects = []
    async for project in db.projects.find():
        projects.append(project_helper(project))
    return projects

@router.get("/{id}", response_description="Get a single project item", response_model=dict)
async def get_project_item(id: str):
    db = get_database()
    try:
        if (project := await db.projects.find_one({"_id": ObjectId(id)})) is not None:
            return project_helper(project)
    except:
        pass # Invalid ID format usually
    raise HTTPException(status_code=404, detail=f"Project item {id} not found")

@router.put("/{id}", response_description="Update a project item", response_model=dict)
async def update_project_item(
    id: str, 
    title: str = Form(None),
    category: str = Form(None),
    description: str = Form(None),
    project_url: str = Form(None),  # Comma-separated URLs
    github_url: str = Form(None),   # Comma-separated URLs
    tags: str = Form(None),         # Comma-separated string
    image: UploadFile = File(None),
    current_user: UserSchema = Depends(get_current_user)
):
    import shutil
    import os

    req = {}
    
    if title is not None: req["title"] = title
    if category is not None: req["category"] = category
    if description is not None: req["description"] = description
    
    if project_url is not None:
        req["project_url"] = [url.strip() for url in project_url.split(',') if url.strip()]
        
    if github_url is not None:
        req["github_url"] = [url.strip() for url in github_url.split(',') if url.strip()]
        
    if tags is not None:
        req["tags"] = [tag.strip() for tag in tags.split(',')] if tags else []

    # Handle image update if file provided
    if image is not None:
        # Validation for image
        if not image.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
            
        UPLOAD_DIR = "static/uploads"
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        
        file_location = f"{UPLOAD_DIR}/{image.filename}"
        with open(file_location, "wb+") as file_object:
            shutil.copyfileobj(image.file, file_object)
            
        req["image_url"] = f"/uploads/{image.filename}"

    db = get_database()
    
    if len(req) >= 1:
        update_result = await db.projects.update_one({"_id": ObjectId(id)}, {"$set": req})
        if update_result.modified_count == 1:
            if (updated_project := await db.projects.find_one({"_id": ObjectId(id)})) is not None:
                return project_helper(updated_project)
    
    if (existing_project := await db.projects.find_one({"_id": ObjectId(id)})) is not None:
        return project_helper(existing_project)

    raise HTTPException(status_code=404, detail=f"Project item {id} not found")

@router.delete("/{id}", response_description="Delete a project item")
async def delete_project_item(id: str, current_user: UserSchema = Depends(get_current_user)):
    db = get_database()
    delete_result = await db.projects.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return {"message": "Project item deleted successfully"}

    raise HTTPException(status_code=404, detail=f"Project item {id} not found")
