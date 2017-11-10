package api

import (
	"github.com/labstack/echo"
)

func SetupRoutes(e *echo.Echo) {
	h := &TodoHandler{
		TodoIdName: "id",
	}

	e.GET("/api/todos", h.Collection(h.Index))
	e.POST("/api/todos", h.Collection(h.Create))

	e.POST("/api/todos/:id/toggle", h.Member(h.Toggle))
}
