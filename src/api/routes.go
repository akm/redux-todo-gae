package api

import (
	"net/http"

	"github.com/labstack/echo"
)

func SetupRoutes(e *echo.Echo) {
	e.GET("/", func(c echo.Context) error {
		return c.JSON(http.StatusOK, map[string]interface{}{
			"message": "OK",
		})
	})
}
