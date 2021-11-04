FROM python:3.8-slim-buster

RUN apt-get update && apt-get install -y build-essential
WORKDIR /app
COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

RUN python3 /app/manage.py collectstatic --no-input

RUN python manage.py makemigrations
RUN python manage.py migrate

CMD ["python3", "manage.py", "runsslserver","0.0.0.0:9000"]