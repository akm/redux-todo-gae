package models

import (
	"errors"

	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
	"google.golang.org/appengine/log"
)

var ErrNoSuchTodo = errors.New("No such data in Todos")

type TodoAccessor struct{}

func (pa *TodoAccessor) Find(ctx context.Context, id string) (*Todo, error) {
	m := &Todo{ID: id}
	err := pa.LoadByID(ctx, m)
	if err != nil {
		return nil, err
	}
	return m, nil
}

func (pa *TodoAccessor) FindByKey(ctx context.Context, key *datastore.Key) (*Todo, error) {
	m := &Todo{}
	err := pa.LoadByKey(ctx, key, m)
	if err != nil {
		return nil, err
	}
	return m, nil
}

func (pa *TodoAccessor) LoadByID(ctx context.Context, m *Todo) error {
	key, err := datastore.DecodeKey(m.ID)
	if err != nil {
		log.Errorf(ctx, "Failed to decode id(%v) to key because of %v \n", m.ID, err)
		return err
	}
	return pa.LoadByKey(ctx, key, m)
}

func (pa *TodoAccessor) LoadByKey(ctx context.Context, key *datastore.Key, m *Todo) error {
	ctx = context.WithValue(ctx, "Todo.key", key)
	err := datastore.Get(ctx, key, m)
	switch {
	case err == datastore.ErrNoSuchEntity:
		return ErrNoSuchTodo
	case err != nil:
		log.Errorf(ctx, "Failed to Get todo key(%v) to key because of %v \n", key, err)
		return err
	}
	m.ID = key.Encode()
	return nil
}

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
