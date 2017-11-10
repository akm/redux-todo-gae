package api

import (
	"github.com/labstack/echo"
)

func SetupRoutes(e *echo.Echo) {
	h := &TodoHandler{}
	e.GET("/todos", h.Collection(h.Index))
	e.POST("/todos", h.Collection(h.Create))
}
