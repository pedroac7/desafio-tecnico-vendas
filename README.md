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
* **Data Seeding:** População automática do banco de dados na inicialização.

## 📋 Funcionalidades Principais
* **Listagem de Vendas:** Visualização de dados com formatação de moeda e data.
* **Filtros:** Busca por termo (Produto/Categoria) e intervalo de datas.
* **Ordenação:** Clique nos cabeçalhos da tabela para ordenar (Ascendente/Descendente).
* **Exportação:** Geração de PDF contendo os dados filtrados na tela.

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