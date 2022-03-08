import os 

from fastapi import Security, APIRouter, Header, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

template_path = os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'templates'))

router = APIRouter()

templates = Jinja2Templates(directory=template_path)


@router.get("/", description='Sanity check')
async def welcome():
    return {'DEMO': 'Welcome to the API!'}


@router.get("/app", response_class=HTMLResponse)
async def app(request: Request):
    result = "Hello from app_page"
    return templates.TemplateResponse('app.html', context={'request': request, 'result': result})
