# Chat Application

This repository contains the code for the semester project that is part of module _Advanced Softare Programming_.
Used technologies so far:

-   docker
-   nodejs
-   react
-   react-redux and redux-thunk
-   mongodb
-   websockets

## Requirements:

This application uses docker and docker-compose to simplify the build process and make the startup for the communication between frontend and backend easier.

To initialize the project for development you need the following:

-   a UNIX bases operating system (on windows we had some struggle while building with docker)
-   docker `~18.0`
-   docker-compose `~3.6`
-   make (optional)

#### Environment Variables

If you are running the application via `make` or `docker-compose` it should not be necessary to change the default settings.
If you have already a **mongoDB** running or another application on one of the ports, you can change the configuration by customizing the environment variables stored in the `.env` file.

| Variable            | default value            | description                                                |
| ------------------- | ------------------------ | ---------------------------------------------------------- |
| MONGODB_HOST        | `mongodb://mongodb/main` | set the db-host eg: `mongodb://localhost:27017/chat`       |
| PORT                | 3000                     | set the backend port                                       |
| SERVER_HOST         | 'http://localhost'       | the host information of the server e.g: `http://localhost` |
| YANDEX_API_KEY      |                          | set the api key for tranlation api `yandex`                |
| DISPLAY_TIME_FORMAT | `MM/DD/YY h:mm`          | set the default time format                                |
| APP_HOST            | 0.0.0.0                  | set the host for the react app: e.g.: `127.0.0.1`          |

## Running the application

Clone and open the project:

```sh
git clone git@github.com:nilsjung/chat-application.git
cd chat-application
```

#### Run with `make` file

In the root directory just type `make`.
The build process then should start.

**Commands implemented so far**

-   `make` starts the application by running `install build start and logging`
-   `make start` starts `docker-compose up --remove-orphans -d` as deamon
-   `make build` runs `docker-compose build --force-rm`
-   `make format` runs `npx prettier --write \"./{backend,app}/**/*.{js,jsx}\"`
-   `make nodeModules` installs the node-modules dependencies. necessary for the _prettier_ hook.
-   `make logging` runs `docker-compose logs -f`
-   `make stop` runs `docker-compose down`
-   `make clean` runs `docker rmi chatapp_app chat_app_backend` removes the docker-images for the service `backend` and `app`
-   `make cleanVolumes` removes all docker volumes that are in the state dangling

To add new dependencies in your `package.json` you first have to clean the container by running `make clean` and reinitialize the application with `make`

#### Run with docker-compose

As the `make` file is just a wrapper for `docker-compose`, you also can start the application by `docker-compose`.

```sh
docker-compose build
docker-compose up
```

## Development

### App (React-App)

Based on a webpack development server the frontend reloads every time you change some code in any of a `*.js`, `*.jsx` or `*.scss` file.

#### Bootstrap

The styles are loaded from the source files of the npm bootstrap package. To change bootstrap behavior or styling overwrite the part in new sass file beneath `sass/bootstrap` and import the file in `sass/main.scss`. Variables can be overwritten in `sass/components/_variables.scss`.

#### Testing

You can develop the backend test driven.
Therefor you have to enter the backend and run the make-file

```sh
make test

# or without make
docker-compose run --rm backend sh -c "npm test"
```

This starts `mocha` as testing environment via the `npm script`.
`nodemon` is used to activate _reload on change_.

### Mongodb

Here shouldn't be anything to do.

### Backend (Nodejs-Server with ExpressJs)

The backend is based on the ExpressJs library with socket.io as websocket framework.

#### Testing

As a testing framework we use the mocka/chai framework.
Tests can be run with `cd backend && make test`. The watch option is not implemented so far.
