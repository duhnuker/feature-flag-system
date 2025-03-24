from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
from app.api.graphql import schema

app = FastAPI()

graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

@app.get("/")
def health_check():
    return {"status": "running"}