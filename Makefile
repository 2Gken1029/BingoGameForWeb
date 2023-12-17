init:
	@echo "初期設定を行います"
	docker compose up -d 
	docker compose exec admin-php composer install
	docker compose exec admin-php php artisan key:generate
	docker compose exec admin-php npm install
	docker compose exec admin-php php artisan migrate
	docker compose exec admin-php php artisan storage:link

analyse:
	@echo "コードの静的解析・フォーマットを行います"
	docker compose exec admin-php ./vendor/bin/pint
	docker compose exec admin-php ./vendor/bin/phpstan analyse

down:
	@echo "コンテナを落とします"
	docker compose down
	
admin:
	@echo "コンテナの中に入ります"
	docker compose exec admin-php bash 

build:
	docker compose exec admin-php npm run build
