package api

import (
	"net/http"

	"golang.org/x/net/context"
	"github.com/labstack/echo"
	"google.golang.org/appengine/log"

	"gae_support"
	"models"
)

type TodoHandler struct {}

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

func SetupRoutes(e *echo.Echo) {
	h := &TodoHandler{}
	e.GET("/todos", gae_support.With(h.Index))
	e.POST("/todos", gae_support.With(h.Create))
}
