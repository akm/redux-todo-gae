package api

import (
	"github.com/labstack/echo"

	"gae_support"
)

func SetupRoutes(e *echo.Echo) {
	h := &TodoHandler{}
	e.GET("/todos", gae_support.With(h.Index))
	e.POST("/todos", gae_support.With(h.Create))
}
