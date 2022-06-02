# react-flask-mongo-app

Sample dev app for testing stuff

## Super simple example

based on the example here: [https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i](https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i)

```bash
cd flask_react

# setup virtual environment with flask & python-dotenv and whatever else...
python3 -m venv .venv
source .venv/bin/activate
pip install flask python-dotenv

# start the flask backend
npm run start-backend

# start the mongodb database
npm run start-database

# start react frontend
npm start
```

## Pre-reqs

**python**, **npm** & **mongo** using Homebrew on macOS. See:
- https://brew.sh/
- https://nodejs.org/en/download/package-manager/#n
- https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-osx-prereq

