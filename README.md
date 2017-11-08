# redux-todo

## Setup

1. Install Go
  - https://golang.org/doc/install
  - Or use [goenv](https://github.com/kaneshin/goenv)
    - You can install goenv by [anyenv](https://github.com/riywo/anyenv)
1. [Install the App Engine SDK for Go](https://cloud.google.com/appengine/docs/go/download?hl=ja)
1. `git clone git@github.com:akm/redux-todo.git`


## Run test

```
goapp test
```

### With coverage

```
goapp test -coverprofile coverage.out
go tool cover -html=coverage.out
```

## Run server locally

```
$ make run
```

## Deploy to appengine

```
$ export PROJECT=<YOUR_GCP_PROJECT>
$ make deploy
```

If you want to set it active, run the following command

```
$ make update-traffic
```
