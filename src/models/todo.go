package models

import (
	"time"

	"golang.org/x/net/context"
	"google.golang.org/appengine/datastore"
	// "google.golang.org/appengine/log"

	"gopkg.in/go-playground/validator.v9"
)

type Todo struct {
	ID        string    `json:"id" datastore:"-"`
	Text      string    `json:"text" validate:"required"`
	Completed bool      `json:"completed" validate:"required"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (m *Todo) Validate() error {
	validator := validator.New()
	err := validator.Struct(m)
	return err
}

func (m *Todo) Create(ctx context.Context) error {
	return m.CreateWith(ctx, m.PutWithNewKey)
}

func (m *Todo) CreateWith(ctx context.Context, f func(ctx context.Context) error) error {
	t := time.Now()
	if m.CreatedAt.IsZero() {
		m.CreatedAt = t
	}
	if m.UpdatedAt.IsZero() {
		m.UpdatedAt = t
	}

	err := m.Validate()
	if err != nil {
		return err
	}

	return f(ctx)
}

func (m *Todo) PutWithNewKey(ctx context.Context) error {
	key := datastore.NewIncompleteKey(ctx, "todos", nil)

	res, err := datastore.Put(ctx, key, m)
	if err != nil {
		return err
	}
	m.ID = res.Encode()

	return nil
}
