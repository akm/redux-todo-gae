package api

import (
	"net/http"

	"github.com/labstack/echo"
	"golang.org/x/net/context"
	"google.golang.org/appengine/log"

	"gae_support"
	"models"
)

func TodoBy(key string, impl func(c echo.Context) error) func(c echo.Context) error {
	return func(c echo.Context) error {
		ctx := c.Get("aecontext").(context.Context)
		id := c.Param(key)

		accessor := &models.TodoAccessor{}
		m, err := accessor.Find(ctx, id)
		switch {
		case err == models.ErrNoSuchTodo:
			return c.JSON(http.StatusNotFound, map[string]string{"message": "Not found for " + id})
		case err != nil:
			log.Errorf(ctx, "TodoBy %v id: %v\n", err, id)
			return err
		}

		c.Set("todo", m)
		return impl(c)
	}
}

type TodoHandler struct {
	TodoIdName string
}

func (h *TodoHandler) Collection(action echo.HandlerFunc) echo.HandlerFunc {
	return gae_support.With(action)
}

func (h *TodoHandler) Member(action echo.HandlerFunc) echo.HandlerFunc {
	return gae_support.With(TodoBy(h.TodoIdName, action))
}

func (h *TodoHandler) Index(c echo.Context) error {
	ctx := c.Get("aecontext").(context.Context)
	accessor := &models.TodoAccessor{}

	var f func(ctx context.Context) ([]*models.Todo, error)
	completed := c.QueryParam("completed")

	switch completed {
	case "completed":
		f = accessor.AllCompleted
	case "active":
		f = accessor.AllActive
	default:
		f = accessor.All
	}

	todos, err := f(ctx)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, todos)
}

func (h *TodoHandler) Create(c echo.Context) error {
	ctx := c.Get("aecontext").(context.Context)

	req := c.Request()
	todo := &models.Todo{}
	if err := c.Bind(todo); err != nil {
		log.Errorf(ctx, "err: %v\n", err)
		log.Errorf(ctx, "req: %v\n", req)
		return err
	}

	err := todo.Create(ctx)
	if err != nil {
		log.Errorf(ctx, "Failed to reserve or wait todo: %v\n%v\n", todo, err)
		return err
	}
	log.Debugf(ctx, "Created todo: %v\n", todo)
	return c.JSON(http.StatusCreated, todo)
}

func (h *TodoHandler) Toggle(c echo.Context) error {
	ctx := c.Get("aecontext").(context.Context)
	todo := c.Get("todo").(*models.Todo)
	err := todo.Toggle(ctx)
	if err != nil {
		log.Errorf(ctx, "Failed to toggle todo: %v\n%v\n", todo, err)
		return err
	}
	log.Debugf(ctx, "Toggle todo: %v\n", todo)
	return c.JSON(http.StatusOK, todo)
}
