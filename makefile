all: nodeModules build start logging

start:
	docker-compose up --remove-orphans -d

build:
	docker-compose build --force-rm

format:
	npm run format

nodeModules:
	npm install

logging:
	docker-compose logs -f

stop:
	docker-compose down

clean: stop
	docker rmi chatapp_app chat_app_backend

cleanVolumes:
	docker volume rm $$(docker volume ls -qf dangling=true)