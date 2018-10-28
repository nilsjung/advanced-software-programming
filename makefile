all: build start logging

start:
	docker-compose up --quiet-pull --remove-orphans -d

build:
	docker-compose build --force-rm

logging:
	docker-compose logs -f

stop:
	docker-compose down

clean:
	docker rmi chatapp_app chat_app_backend