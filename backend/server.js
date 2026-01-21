const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Conexão com o Banco de Dados
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
    } else {
        console.log('Conectado ao banco de dados SQLite.');
        inicializarTabela();
    }
});

function inicializarTabela() {
    db.run(`CREATE TABLE IF NOT EXISTS vendas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto TEXT,
        categoria TEXT,
        quantidade INTEGER,
        valor REAL,
        data TEXT
    )`, () => {
        db.get("SELECT count(*) as count FROM vendas", (err, row) => {
            if (row.count === 0) {
                console.log("Inserindo 15 registros");
                const vendas = [
                    { produto: "Notebook Dell", categoria: "Eletrônicos", quantidade: 1, valor: 3500.00, data: "2023-05-15" },
                    { produto: "Mouse Logitech", categoria: "Acessórios", quantidade: 2, valor: 150.00, data: "2023-08-20" },
                    { produto: "Teclado Mecânico", categoria: "Acessórios", quantidade: 1, valor: 250.00, data: "2023-11-10" },
                    { produto: "Monitor LG 24", categoria: "Eletrônicos", quantidade: 1, valor: 900.00, data: "2023-12-05" },
                    { produto: "Cadeira Gamer", categoria: "Móveis", quantidade: 1, valor: 1200.00, data: "2024-02-14" },
                    { produto: "Headset HyperX", categoria: "Acessórios", quantidade: 3, valor: 300.00, data: "2024-06-30" },
                    { produto: "Mesa de Escritório", categoria: "Móveis", quantidade: 1, valor: 450.00, data: "2024-09-12" },
                    { produto: "Webcam Full HD", categoria: "Eletrônicos", quantidade: 1, valor: 200.00, data: "2024-11-25" },
                    { produto: "Impressora Epson", categoria: "Escritório", quantidade: 1, valor: 800.00, data: "2025-01-10" },
                    { produto: "Cabo HDMI 2.0", categoria: "Acessórios", quantidade: 5, valor: 20.00, data: "2025-03-22" },
                    { produto: "Smartphone Samsung", categoria: "Eletrônicos", quantidade: 1, valor: 2500.00, data: "2025-07-15" },
                    { produto: "Monitor Ultrawide", categoria: "Eletrônicos", quantidade: 1, valor: 1800.00, data: "2025-10-05" },
                    { produto: "Tablet iPad", categoria: "Eletrônicos", quantidade: 1, valor: 3200.00, data: "2025-12-20" },
                    { produto: "Suporte Notebook", categoria: "Acessórios", quantidade: 2, valor: 80.00, data: "2026-01-15" },
                    { produto: "HD Externo 2TB", categoria: "Acessórios", quantidade: 1, valor: 450.00, data: "2026-02-10" }
                ];

                const stmt = db.prepare("INSERT INTO vendas (produto, categoria, quantidade, valor, data) VALUES (?, ?, ?, ?, ?)");
                vendas.forEach(v => {
                    stmt.run(v.produto, v.categoria, v.quantidade, v.valor, v.data);
                });
                stmt.finalize();
            }
        });
    });
}

// Rota Get
app.get('/relatorio', (req, res) => {
    const { termo, dataInicio, dataFim } = req.query; 

    let sql = "SELECT * FROM vendas WHERE 1=1";
    let params = [];

    if (termo) {
        sql += " AND (produto LIKE ? OR categoria LIKE ?)";
        params.push(`%${termo}%`, `%${termo}%`);
    }

    if (dataInicio) {
        sql += " AND data >= ?";
        params.push(dataInicio);
    }

    if (dataFim) {
        sql += " AND data <= ?";
        params.push(dataFim);
    }

    // Ordena por data
    sql += " ORDER BY data DESC";

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json(rows);
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});