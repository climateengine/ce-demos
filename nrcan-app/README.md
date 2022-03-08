# nrcan-demo

Note: Currently a token to https://geodata.dri.edu is not supplied in nrcan-app/static/js/map.js. 

The application can be run via Docker or directly. 

Docker:
  Run these two commands
    docker build -t <name> .
    docker run -p 80:80 <name>
  Navigate to http://0.0.0.0:80/app
 
Directly:
  Set up a virtual env in nrcan-app
    python -m venv demo-env
    source demo-env/bin/activate
    pip install requirements.txt
  Run application
    python3 main.py
  Navigate to http://localhost:8000/app

