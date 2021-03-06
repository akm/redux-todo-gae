export GOPATH := $(GOPATH):$(PWD):$(PWD)/vendor
VERSION = $(shell cat ./VERSION)

.PHONY: all checksetup dep_lift dep_sink check build test ci run show_version deploy update-traffic

all: check

checksetup:
	go get golang.org/x/tools/cmd/goimports

vendor_lift:
	mv vendor/Gopkg.* .
	mv vendor/src/*.* vendor/
	rm -rf vendor/src

vendor_sink:
	mkdir -p vendor/src
	mv vendor/*.* vendor/src
	mv Gopkg.* vendor/

dep_ensure:
	dep ensure

ensure: vendor_lift dep_ensure vendor_sink

check:
	go fmt src/api/*.go
	go fmt src/gae_support/*.go
	go fmt src/models/*.go

	go vet src/api/*.go
	go vet src/gae_support/*.go
	go vet src/models/*.go

	goimports -l src/api/*.go
	goimports -l src/gae_support/*.go
	goimports -l src/models/*.go

	git diff --exit-code


server_build:
	goapp build	./src/models \
							./src/api

server_test:
	goapp test	./src/models \
							./src/api

ui_setup:
	cd ./ui && npm install

ui_build:
	cd ./ui && npm run build
	rm -rf ./app/redux-todo/ui
	cp -R ./ui/dist ./app/redux-todo/ui

ui_test:
	cd ./ui && npm run test

build: ui_build server_build
test: ui_test server_test

ci: check test

run:
	dev_appserver.py ./app/redux-todo/app.yaml

show_version:
	@echo ${VERSION}

deploy: build
	appcfg.py -A $${PROJECT} -V ${VERSION} update ./app/redux-todo

update-traffic:
	gcloud --project ${PROJECT} app services set-traffic redux-todo --splits=${VERSION}=1 -q
