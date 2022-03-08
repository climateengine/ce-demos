FROM python:3.8.2-slim


ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

# Install production dependencies.
RUN pip install --no-cache-dir -r requirements.txt

# Local docker image
CMD exec uvicorn main:api --workers 1 --port 80 --host "0.0.0.0"
