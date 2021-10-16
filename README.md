# Xiangqi Lite

## Goal

The goal of this project is to provide basic functionalities as [xiangqi](https://xiangqi.com) provides.

## Set Up Project

Clone the project using following command:

### `git clone https://github.com/goharattiq/xiangqi_lite.git`

In the project directory:

For Database

### Create Db in PSQL with name `xiangqi_db`

### Set env var `DATABASE_URL=postgres://username:password@localhost:5432/xiangqi_db`

Others 

### Set env var for `SECRET_KEY`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_STORAGE_BUCKET_NAME`

For React :

### `npm install`

you can run to create build

### `npm run build`

For django

### `python -m venv env`

and activate your virtual environment

To install dependencies:

### `pip install -r requirements.txt`

In the project directory, you can run to start the project:

### `python manage.py runserver` or `python manage.py runserver 0.0.0.0:8000`

Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

OR

You simply can visit this repo deployment on [heroku](https://xiangqi-lite.herokuapp.com)
