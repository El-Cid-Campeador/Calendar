package main

import (
	"context"
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

// App struct
type App struct {
	ctx context.Context
}

type Todo struct {
	Id           string `json:"id"`
	Title        string `json:"title"`
	Is_important uint8  `json:"is_important"`
}

type A struct {
	Date         string `json:"date"`
	Is_important uint8  `json:"is_important"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func checkError(err error) {
	if err != nil {
		panic(err)
	}
}

func connectDB() *sql.DB {
	db, err := sql.Open("sqlite3", "./test.db")
	checkError(err)

	stmt, err := db.Prepare(`CREATE TABLE IF NOT EXISTS Todos (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        is_important INT NOT NULL
    )`)

	checkError(err)

	stmt.Exec()

	return db
}

func (a *App) GetAll() []A {
	db := connectDB()
	var res []A

	stmt, err := db.Prepare(`SELECT date, is_important FROM todos`)
	checkError(err)

	rows, err := stmt.Query()
	checkError(err)

	for rows.Next() {
		var x A
		err := rows.Scan(&x.Date, &x.Is_important)
		checkError(err)

		res = append(res, x)
	}

	defer db.Close()

	return res
}
func (a *App) GetTodos(date string) []Todo {
	db := connectDB()
	var res []Todo

	stmt, err := db.Prepare(`SELECT id, title, is_important FROM todos WHERE date = ?`)
	checkError(err)

	rows, err := stmt.Query(date)
	checkError(err)

	for rows.Next() {
		var x Todo
		err := rows.Scan(&x.Id, &x.Title, &x.Is_important)
		checkError(err)

		res = append(res, x)
	}

	defer db.Close()

	return res
}

func (a *App) Post(id string, title string, date string, is_important uint8) {
	db := connectDB()

	stmt, err := db.Prepare(`INSERT INTO todos (id, title, date, is_important) VALUES (?, ?, ?, ?)`)
	checkError(err)

	stmt.Exec(id, title, date, is_important)

}

func (a *App) Delete(id string) {
	db := connectDB()

	stmt, err := db.Prepare(`DELETE FROM todos WHERE id = ?`)
	checkError(err)

	stmt.Exec(id)

	defer db.Close()
}
