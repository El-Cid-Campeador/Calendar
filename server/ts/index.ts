import express from 'express';
import cors from 'cors';
import { log } from 'console';
import Database from 'better-sqlite3';

const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function connectDB() {
    const db = new Database('./db.db');
    db.exec(`CREATE TABLE IF NOT EXISTS Todos (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        date TEXT NOT NULL,
        is_important INT NOT NULL
    )`);

    return db;
}

app.route('/').get((req, res) => {
    const db = connectDB();
    const arr = db.prepare(`SELECT date, is_important FROM todos`).all() as { date: string, is_important: number }[];

    res.json({ result: arr });
})

app.route('/:date').get((req, res) => {
    const { date } = req.params;

    const db = connectDB();
    const arr = db.prepare(`SELECT id, title, is_important FROM todos WHERE date = ?`).all(date) as { id: string, title: string, is_important: number }[];

    res.json({ result: arr });
}).post((req, res) => {
    const { date } = req.params;
    const { id, title, is_important } = req.body;

    const db = connectDB();
    db.prepare(`INSERT INTO todos (id, title, date, is_important) VALUES (?, ?, ?, ?)`).run(id, title, date, is_important);
    
    res.json({
        msg: 'created!'
    });
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const db = connectDB();
    db.prepare(`DELETE FROM todos WHERE id = ?`).run(id);

    res.json({
       msg: 'deleted!' 
    });
});

app.listen(PORT, () => {
    log(`At http://127.0.0.1:${PORT}/`);
});
