import os

import uvicorn
import v1

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi.staticfiles import StaticFiles


os.environ['TZ'] = 'UTC'
title_detail = os.getenv('PROJECT_ID', 'Local')
version = os.getenv('SHORT_SHA', 'local')

api = FastAPI(title=f"FastAPI: {title_detail}", version=version)
api.mount("/static", StaticFiles(directory="static"), name="static")

api.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=['*'],
    allow_methods=["*"],
    allow_headers=["*"],
)

@api.get("/", include_in_schema=False)
def redirect_root():
    return RedirectResponse(url="/docs")


api.include_router(v1.routers.home.router,)


if __name__ == "__main__":
    import json
    contents = json.dumps(api.openapi(), indent=2)
    with open("openapi.json", "w") as f:
        f.write(contents)
    uvicorn.run("main:api", workers=1, host="0.0.0.0", port=8000, debug=True, reload=True)
