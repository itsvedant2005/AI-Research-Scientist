import faiss
import numpy as np

# Global variables
index = None
stored_chunks = []


def create_index(vectors, chunks):
    global index
    global stored_chunks

    vectors = np.array(vectors).astype("float32")

    dimension = vectors.shape[1]

    index = faiss.IndexFlatL2(dimension)

    index.add(vectors)

    stored_chunks = chunks

    print(f"✅ Indexed {len(chunks)} chunks")


def search(query_vector, k=3):
    global index
    global stored_chunks

    if index is None:
        return [
            "No PDF has been indexed yet. Please upload using /index-pdf first."
        ]

    query_vector = np.array(
        [query_vector]
    ).astype("float32")

    distances, indices = index.search(
        query_vector,
        k
    )

    results = []

    for idx in indices[0]:

        if idx < len(stored_chunks):
            results.append(
                stored_chunks[idx]
            )

    return results