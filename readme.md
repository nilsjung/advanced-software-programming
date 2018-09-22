# Advanced Software Programming (semester project)

## TODOS
* Find a Project
* find a styleguide
* expand frontend workflow
* expand development environment by adding dependency-commands for docker-container.
* minimize backend to just backend-stuff
* customize react-app/express-backend to match our requirements
* build a autoload on change for frontend and backend? (maybe this already works...)

## Infos
* Frontend was initialized by `create-react-app`
* Backend was initialized by `express-generator`
* MongoDB for database support
* When adding a new folder you have to add the new folder to the `docker-compose.yaml` and restart docker-compose.

## Requirements
* docker
* docker-compose


## Content
* A folder `frontend` as web-app based on ReactJS
* A folder `backend` as server service handling the requests.
* A folder `data` as mongodb volume.

## Frontend
After starting the server with `docker-compose up` you can access the frontend on `localhost:3000`
### Development
* Adding a new requirement to `package.json` requires a build refresh `docker-compose build && docker-compose up` (maybe should be simplyfied in a `makefile`)


## Backend
After starting `docker-compose up` in the root directory enter `localhost:5001`

### Development
* Adding a new requirement to `package.json` requires a build refresh `docker-compose build && docker-compose up` (maybe should be simplyfied in a `makefile`)
