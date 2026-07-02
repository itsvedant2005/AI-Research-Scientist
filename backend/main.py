from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from pdf_utils import extract_text
from rag.utils import chunk_text
from rag.embeddings import get_embeddings
from rag.vectorstore import create_index, search
from groq_service import ask_gemini

import os

app = FastAPI(title="AI Research Scientist API")

# ----------------------------
# Startup Event
# ----------------------------
@app.on_event("startup")
async def startup():
    print("✅ FastAPI started successfully")

# ----------------------------
# CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "*"  # Change to your frontend URL after deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Upload Folder
# ----------------------------
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ----------------------------
# Home
# ----------------------------
@app.get("/")
def home():
    return {
        "status": "success",
        "message": "AI Research Scientist API is running"
    }

# ----------------------------
# Basic AI Chat
# ----------------------------
@app.get("/ask")
def ask(question: str):
    return {"answer": ask_gemini(question)}

# ----------------------------
# Upload PDF
# ----------------------------
@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "PDF uploaded successfully",
        "filename": file.filename
    }

# ----------------------------
# Read PDF
# ----------------------------
@app.get("/read-pdf")
def read_pdf(filename: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        return {"error": "File not found"}

    text = extract_text(file_path)

    return {"text": text[:3000]}

# ----------------------------
# Ask PDF
# ----------------------------
@app.get("/ask-pdf")
def ask_pdf(filename: str, question: str):
    file_path = os.path.join(UPLOAD_DIR, filename)

    if not os.path.exists(file_path):
        return {"error": "File not found"}

    pdf_text = extract_text(file_path)

    prompt = f"""
Answer the question using only the document.

Document:
{pdf_text}

Question:
{question}
"""

    return {"answer": ask_gemini(prompt)}

# ----------------------------
# Index PDF
# ----------------------------
@app.post("/index-pdf")
async def index_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    text = extract_text(file_path)

    chunks = chunk_text(text)

    vectors = get_embeddings(chunks)

    create_index(vectors, chunks)

    return {
        "message": "PDF Indexed Successfully",
        "chunks": len(chunks)
    }

# ----------------------------
# Ask RAG
# ----------------------------
@app.get("/ask-rag")
def ask_rag(question: str):
    query_vector = get_embeddings([question])[0]

    relevant_chunks = search(query_vector)

    context = "\n".join(relevant_chunks)

    prompt = f"""
Answer using only the context.

Context:
{context}

Question:
{question}
"""

    return {"answer": ask_gemini(prompt)}

# ----------------------------
# Literature Review
# ----------------------------
@app.get("/literature-review")
def literature_review():
    from rag.vectorstore import stored_chunks

    if not stored_chunks:
        return {"review": "No PDF indexed yet."}

    context = "\n".join(stored_chunks[:10])

    prompt = f"""
You are a research assistant.

Based on the following content:

{context}

Generate:
1. Summary
2. Key Findings
3. Research Trends
4. Limitations
5. Future Scope
"""

    return {"review": ask_gemini(prompt)}

# ----------------------------
# Research Gap
# ----------------------------
@app.get("/research-gap")
def research_gap():
    from rag.vectorstore import stored_chunks

    if not stored_chunks:
        return {"research_gaps": "No PDF indexed yet."}

    context = "\n".join(stored_chunks[:10])

    prompt = f"""
Analyze the following research content.

{context}

Identify:
1. Research Gaps
2. Limitations
3. Unexplored Areas
4. Opportunities for Future Work
"""

    return {"research_gaps": ask_gemini(prompt)}

# ----------------------------
# Proposal
# ----------------------------
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

    return {"proposal": ask_gemini(prompt)}