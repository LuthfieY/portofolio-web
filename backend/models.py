from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class UserSchema(BaseModel):
    username: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "username": "admin",
                "email": "admin@example.com",
                "password": "strongpassword"
            }
        }

class UserLoginSchema(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        json_schema_extra = {
            "example": {
                "username": "admin",
                "password": "strongpassword"
            }
        }

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class ProjectItemSchema(BaseModel):
    title: str = Field(...)
    category: Optional[str] = None
    description: str = Field(...)
    image_url: Optional[str] = None
    project_url: list[str] = []
    github_url: list[str] = []
    tags: list[str] = []
    
    class Config:
        json_schema_extra = {
            "example": {
                "title": "My Awesome Project",
                "category": "Autonomous AI Agent",
                "description": "A detailed description of the project.",
                "image_url": "https://example.com/image.png",
                "project_url": ["https://example.com", "https://demo.example.com"],
                "github_url": ["https://github.com/user/project", "https://github.com/user/project-api"],
                "tags": ["python", "fastapi"]
            }
        }

class UpdateProjectItemSchema(BaseModel):
    title: Optional[str]
    category: Optional[str]
    description: Optional[str]
    image_url: Optional[str]
    project_url: Optional[list[str]]
    github_url: Optional[list[str]]
    tags: Optional[list[str]]

    class Config:
        json_schema_extra = {
            "example": {
                "title": "Updated Title",
                "description": "Updated description."
            }
        }

