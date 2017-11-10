package api

import (
	"github.com/labstack/echo"
)

func SetupRoutes(e *echo.Echo) {
	h := &TodoHandler{
		TodoIdName: "id",
	}

	g := e.Group("/api/todos", h.Collection)
	g.GET("", h.Index)
	g.POST("", h.Create)

	g = e.Group("/api/todos/:id", h.Member)
	g.POST("/toggle", h.Toggle)
}
