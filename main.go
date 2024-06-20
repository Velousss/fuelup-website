package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", serveFile("index.html"))
	http.HandleFunc("/about", serveFile("about.html"))
	http.HandleFunc("/contact", serveFile("contact.html"))
	http.HandleFunc("/buy", serveFile("buy.html"))
	http.HandleFunc("/login", serveFile("login.html"))
	http.HandleFunc("/signup", serveFile("signup.html"))
	http.HandleFunc("/nearby", serveFile("nearby.html"))
	http.HandleFunc("/result", serveFile("result.html"))

	fmt.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		fmt.Println("Failed to start server:", err)
	}
}

func serveFile(filename string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filename)
	}
}
