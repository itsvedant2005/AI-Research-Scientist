from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pdf_utils import extract_text
from rag.utils import chunk_text
from rag.embeddings import get_embeddings
from rag.vectorstore import create_index, search, stored_chunks
from groq_service import ask_gemini

import os

app = FastAPI(
    title="AI Research Scientist API",
    version="1.0.0",
    description="AI-powered Research Assistant using FastAPI, RAG, FAISS and Groq."
)

# ---------------------------------
# Startup
# ---------------------------------

@app.on_event("startup")
async def startup():
    os.makedirs("uploads", exist_ok=True)
    print("✅ AI Research Scientist API Started")

# ---------------------------------
# CORS
# ---------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        # Replace with your frontend URL after deployment
        # "https://your-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"

# ---------------------------------
# Home
# ---------------------------------

@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AI Research Scientist API is running 🚀"
    }

# ---------------------------------
# Health Check
# ---------------------------------

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

# ---------------------------------
# AI Chat
# ---------------------------------

@app.get("/ask")
def ask(question: str):
    return {
        "answer": ask_gemini(question)
    }

# ---------------------------------
# Upload PDF
# ---------------------------------

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "PDF uploaded successfully.",
        "filename": file.filename
    }

# ---------------------------------
# Read PDF
# ---------------------------------

@app.get("/read-pdf")
def read_pdf(filename: str):

    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="PDF not found."
        )

    text = extract_text(file_path)

    return {
        "text": text[:3000]
    }

# ---------------------------------
# Ask PDF
# ---------------------------------

@app.get("/ask-pdf")
def ask_pdf(filename: str, question: str):

    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        raise HTTPException(
            status_code=404,
            detail="PDF not found."
        )

    pdf_text = extract_text(file_path)

    prompt = f"""
Answer the question using ONLY the document.

Document:
{pdf_text}

Question:
{question}
"""

    return {
        "answer": ask_gemini(prompt)
    }

# ---------------------------------
# Index PDF
# ---------------------------------

@app.post("/index-pdf")
async def index_pdf(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text(file_path)

    chunks = chunk_text(text)

    vectors = get_embeddings(chunks)

    create_index(vectors, chunks)

    return {
        "message": "PDF indexed successfully.",
        "chunks": len(chunks)
    }

# ---------------------------------
# RAG Question Answering
# ---------------------------------

@app.get("/ask-rag")
def ask_rag(question: str):

    query_vector = get_embeddings([question])[0]

    relevant_chunks = search(query_vector)

    if not relevant_chunks:
        return {
            "answer": "No indexed document found."
        }

    context = "\n".join(relevant_chunks)

    prompt = f"""
Answer ONLY from the provided context.

Context:
{context}

Question:
{question}
"""

    return {
        "answer": ask_gemini(prompt)
    }

# ---------------------------------
# Literature Review
# ---------------------------------

@app.get("/literature-review")
def literature_review():

    if not stored_chunks:
        return {
            "review": "No PDF indexed yet."
        }

    context = "\n".join(stored_chunks[:10])

    prompt = f"""
Generate a literature review based on the following content.

{context}

Include:

1. Summary
2. Key Findings
3. Research Trends
4. Limitations
5. Future Scope
"""

    return {
        "review": ask_gemini(prompt)
    }

# ---------------------------------
# Research Gap Analysis
# ---------------------------------

@app.get("/research-gap")
def research_gap():

    if not stored_chunks:
        return {
            "research_gaps": "No PDF indexed yet."
        }

    context = "\n".join(stored_chunks[:10])

    prompt = f"""
Analyse the following research content.

{context}

Identify:

1. Research Gaps
2. Limitations
3. Unexplored Areas
4. Future Research Opportunities
"""

    return {
        "research_gaps": ask_gemini(prompt)
    }

# ---------------------------------
# Research Proposal Generator
# ---------------------------------

@app.get("/proposal")
def proposal(topic: str):

    prompt = f"""
Generate a research proposal on:

{topic}

Include:

- Title
- Abstract
- Problem Statement
- Objectives
- Methodology
- Expected Outcomes
- Future Scope
"""

    return {
        "proposal": ask_gemini(prompt)
    }