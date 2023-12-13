import json
import numpy as np
import faiss
from langchain.embeddings import OpenAIEmbeddings
from dotenv import load_dotenv
import os

# load_dotenv(".env")

os.environ["OPENAI_API_KEY"] = "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"

real_embeddings = OpenAIEmbeddings()

import sys
queryString = sys.argv[1]

all_services = [
    "Home Cleaning",
    "Carpet Cleaning Service",
    "Deep Cleaning",
    "Disinfecting Services",
    "Move In Cleaning",
    "Move Out Cleaning",
    "Vacation Rental Cleaning",
    "Garage Cleaning",
    "One Time Cleaning Services",
    "Car Washing",
    "Laundry Help",
    "Pressure Washing",
    "Spring Cleaning",
    "Painting and Decorating",
    "Backyard Painting",
    "Interior Design",
    "Canvas Paint Service",
    "Electrical Work",
    "Plumbing",
    "Furniture Assembly",
    "Couch Assembly",
    "Wardrobe Assembly",
    "Table Assembly",
    "Disassemble Furniture",
    "Smart Home Installation",
    "Cabinet Installation",
    "Carpentry Services",
    "Heavy Lifting",
    "Help Moving",
    "Yard Work Services",
    "Gardening Services",
    "Lawn Care Services",
    "Lawn Mowing Services",
    "Tree Trimming Service",
    "Fence Installation & Repair Services",
    "Fence Staining",
    "Lawn Fertilizer Service",
    "Outdoor Party Setup"
]


def calculate_and_save_embeddings(services, filename):

    real_embeddings_list = []

    for service in services:
        real_embeddings_list.append(real_embeddings.embed_query(service))

    real_embeddings_list = np.array(real_embeddings_list).astype("float32")
    np.save(filename, real_embeddings_list)


def load_embeddings(filename):
    return np.load(filename)



embedding_file = "real_embeddings_list.npy"
if os.path.exists(embedding_file):
    real_embeddings_list = load_embeddings(embedding_file)
else:
    calculate_and_save_embeddings(all_services, embedding_file)
    real_embeddings_list = load_embeddings(embedding_file)


index = faiss.IndexFlatL2(1536)
index.add(real_embeddings_list)

search_query = queryString
  # Replace this with the user profile.
test_sample = real_embeddings.embed_query(search_query)
test_sample = np.array([test_sample]).astype("float32")

top_N_recommendations = 4
distance, indices = index.search(test_sample, top_N_recommendations)

recommended_services = np.array(all_services)[indices]

print(json.dumps(recommended_services.tolist()[0]))
