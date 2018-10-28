# Chat Application

This repository contains the code for the semester project that is part of module _Advanced Softare Programming_.
Used technologies so far:
* docker
* nodejs
* react
* react-redux and redux-thunk
* mongodb
* websockets

## Requirements:
This application uses docker and docker-compose to simplify the communication between frontend and backend on every machine.

* docker `~18.0`
* docker-compose `~3.6`
* make (optional)

## Development
Clone this repository eg: `git clone git@github.com:nilsjung/chat-application.git` and enter the created folder with `cd chat-application`. Run `docker-compose build && docker-compose up` or easily `make` if installed. At the moment the image creation takes some time. This has to be improved.


### App (React-App)

Based on a webpack development server the frontend reloads every time you change some code in any of a `*.js`, `*.jsx` or `*.scss` file.

#### Redux
Actions and Reducers...

#### Bootstrap
The styles are loaded from the source files of the npm bootstrap package. To change bootstrap behavior or styling overwrite the part in new sass file beneath `sass/bootstrap` and import the file in `sass/main.scss`. Variables can be overwritten in `sass/components/_variables.scss`.

#### Testing
Not implemented so far

### Mongodb
Here shouldn't be anything to do.

### Backend (Nodejs-Server with ExpressJs)
The backend is based on the ExpressJs library with socket.io as websocket framework.

#### Testing
As a testing framework we use the mocka/chai framework.
Tests can be run with `cd backend && make test`. The watch option is not implemented so far.
