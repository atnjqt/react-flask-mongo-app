# react-flask-mongo-app

- [Etienne P Jacquot](mailto:jacquot.etienne@gmail.com)

Sample dev app for testing stuff

## Super simple example

based on the example here: [https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i](https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i)

```bash
cd flask_react

# setup virtual environment with flask & python-dotenv and whatever else...
python3 -m venv .venv
source .venv/bin/activate
pip install flask python-dotenv pymongo

# start the flask backend
npm run start-backend

# start the mongodb database
npm run start-database

# start react frontend
npm start
```

> navigate in browser to [http://localhost:3000/](http://localhost:3000/) and develop your sandbox *React + Flask + MongoDB app*

### Pre-requisites for local dev:

Using Homebrew on macOS, we install **python**, **npm** & **mongo**. See:
- https://brew.sh/ (brew package manager for MacOS)
- https://docs.python-guide.org/starting/install3/osx/#doing-it-right (python is installed by default)
- https://nodejs.org/en/download/package-manager/#n (n package manager for node js)
- https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#std-label-osx-prereq (local mongodb instance)

