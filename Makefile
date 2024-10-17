default: clean_frontend install_frontend

dev:
	make dev_frontend	

build:
	make build_frontend	

test:
	make test_frontend	

test_watch:
	make test_watch_frontend	

clean_frontend:
	cd frontend && rm -rf node_modules && rm -rf dist

install_frontend:
	cd frontend && npm install

lint_frontend:
	cd frontend && npm run verify

dev_frontend:
	cd frontend && npm run start

build_frontend:
	cd frontend && npm run build

clean_frontend_cache:
	cd frontend && rm -rf .parcel-cache

test_frontend:
	cd frontend && npm run npm run start

test_watch_frontend:
	cd frontend && npm run npm run start
