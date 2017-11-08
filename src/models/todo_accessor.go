package models

import (
	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
	// "google.golang.org/appengine/log"
)

type TodoAccessor struct {}

func (pa *TodoAccessor) Query() *datastore.Query {
	return datastore.NewQuery("todos")
}

func (pa *TodoAccessor) All(ctx context.Context) ([]*Todo, error) {
	return pa.ArrayByQuery(ctx, pa.Query())
}

func (pa *TodoAccessor) AllActive(ctx context.Context) ([]*Todo, error) {
	return pa.ListByCompleted(ctx, true)
}

func (pa *TodoAccessor) AllCompleted(ctx context.Context) ([]*Todo, error) {
	return pa.ListByCompleted(ctx, false)
}

func (pa *TodoAccessor) ListByCompleted(ctx context.Context, completed bool) ([]*Todo, error) {
	q := pa.Query().Filter("Completed =", completed)
	return pa.ArrayByQuery(ctx, q)
}

func (pa *TodoAccessor) ArrayByQuery(ctx context.Context, q *datastore.Query) ([]*Todo, error) {
	iter := q.Run(ctx)
	var res = []*Todo{}
	for {
		pl := Todo{}
		key, err := iter.Next(&pl)
		if err == datastore.Done {
			break
		}
		if err != nil {
			return nil, err
		}
		pl.ID = key.Encode()
		res = append(res, &pl)
	}
	return res, nil
}
