# Sistema de Relatório de Vendas

Aplicação web Full Stack desenvolvida para visualização, filtragem e exportação de relatórios de vendas. O sistema permite consultar registros por período e categoria, ordenar dados dinamicamente e gerar arquivos PDF.

## 🛠 Tecnologias Utilizadas

**Frontend**
* **React + TypeScript (Vite)**
* **Tailwind CSS:** Estilização.
* **TanStack Table:** Tabela interativa com ordenação de colunas.
* **jsPDF + AutoTable:** Geração e exportação de relatórios em PDF.
* **Axios:** Consumo de API.

**Backend**
* **Node.js + Express:** API REST.
* **SQLite3:** Banco de dados SQL (Serverless/Arquivo local).
* **Hospedagem:** Vercel (Frontend) e Render (Backend).

## 📋 Funcionalidades Principais
* **Listagem de Vendas:** Visualização de dados com formatação de moeda e data.
* **Filtros:** Busca por termo (Produto/Categoria) e intervalo de datas.
* **Ordenação:** Clique nos cabeçalhos da tabela para ordenar (Ascendente/Descendente).
* **Exportação:** Geração de PDF contendo os dados filtrados na tela.

## 🔗 Demonstração Online

🟢 **Acesse o projeto rodando:** [CLIQUE AQUI PARA ACESSAR O SITE](https://desafio-tecnico-vendas.vercel.app/)

---

## 🚀 Como Executar o Projeto

Certifique-se de ter o **Node.js** instalado em sua máquina.

### 1. Rodar o Backend
O backend gerencia o banco de dados SQLite automaticamente.

```bash
cd backend
npm install
npm start
```
O servidor iniciará na porta 3000.

### 2. Rodar o Frontend
Em um novo terminal:

```bash
cd frontend
npm install
npm run dev
```
A aplicação estará disponível no link exibido.

<img width="1172" height="571" alt="Captura de tela 2026-01-21 195420" src="https://github.com/user-attachments/assets/b2648a14-108d-4761-8114-215812615e31" />
<img width="1186" height="626" alt="Captura de tela 2026-01-21 195339" src="https://github.com/user-attachments/assets/c51fd304-bb79-479b-a624-e16b33365e89" />
<img width="1186" height="895" alt="Captura de tela 2026-01-21 195240" src="https://github.com/user-attachments/assets/bc2670a6-cc17-4937-8a71-42f06b5d2a82" />

