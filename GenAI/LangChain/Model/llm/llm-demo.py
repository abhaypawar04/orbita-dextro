import os
from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI

load_dotenv()

api = os.getenv("API")

print("API key found:", bool(api))

llm = GoogleGenerativeAI(
    model="gemini-3.1-flash-lite",
    google_api_key=api
)

result = llm.invoke("What is the capital of India?")

print(result)