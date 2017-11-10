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

## Manipulate data

```bash
$ export BASE_URL="http://localhost:8080"
$ curl -H 'Content-Type: application/json' -X POST $BASE_URL/todos --data '{"text":"hey"}'
{"id":"aghkZXZ-Tm9uZXISCxIFdG9kb3MYgICAgICAgAoM","text":"hey","completed":false,"created_at":"2017-11-10T01:12:38.035438658Z","updated_at":"2017-11-10T01:12:38.035438658Z"}$
$
$ curl $BASE_URL/todos
[{"id":"aghkZXZ-Tm9uZXISCxIFdG9kb3MYgICAgICAgAoM","text":"hey","completed":false,"created_at":"2017-11-10T01:12:38.035438Z","updated_at":"2017-11-10T01:12:38.035438Z"}]$
$
$ curl -H 'Content-Type: application/json' -X POST $BASE_URL/todos --data '{"text":"ho"}'
{"id":"aghkZXZ-Tm9uZXISCxIFdG9kb3MYgICAgICAgAkM","text":"ho","completed":false,"created_at":"2017-11-10T01:13:20.952736425Z","updated_at":"2017-11-10T01:13:20.952736425Z"}$
$
$ curl $BASE_URL/todos
[{"id":"aghkZXZ-Tm9uZXISCxIFdG9kb3MYgICAgICAgAkM","text":"ho","completed":false,"created_at":"2017-11-10T01:13:20.952736Z","updated_at":"2017-11-10T01:13:20.952736Z"},{"id":"aghkZXZ-Tm9uZXISCxIFdG9kb3MYgICAgICAgAoM","text":"hey","completed":false,"created_at":"2017-11-10T01:12:38.035438Z","updated_at":"2017-11-10T01:12:38.035438Z"}]$
$
$ curl $BASE_URL/todos | jq .
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   334  100   334    0     0   3820      0 --:--:-- --:--:-- --:--:--  3839
[
  {
    "id": "aghkZXZ-Tm9uZXISCxIFdG9kb3MYgICAgICAgAkM",
    "text": "ho",
    "completed": false,
    "created_at": "2017-11-10T01:13:20.952736Z",
    "updated_at": "2017-11-10T01:13:20.952736Z"
  },
  {
    "id": "aghkZXZ-Tm9uZXISCxIFdG9kb3MYgICAgICAgAoM",
    "text": "hey",
    "completed": false,
    "created_at": "2017-11-10T01:12:38.035438Z",
    "updated_at": "2017-11-10T01:12:38.035438Z"
  }
]
$
