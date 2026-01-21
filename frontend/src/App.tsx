/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  getSortedRowModel
} from '@tanstack/react-table'; 

import type { SortingState } from '@tanstack/react-table';

interface Venda {
  id: number;
  produto: string;
  categoria: string;
  quantidade: number;
  valor: number;
  data: string;
}

function App() {
  // --- CONFIGURAÇÃO AUTOMÁTICA DE API ---
  // Se estiver no site (Produção), usa o Render. Se estiver no PC (Dev), usa Localhost.
  const API_URL = import.meta.env.PROD 
    ? 'https://desafio-backend-pedro.onrender.com/relatorio' 
    : 'http://localhost:3000/relatorio';
  // --

  const [vendas, setVendas] = useState<Venda[]>([]);
  const [loading, setLoading] = useState(false);

  const [termo, setTermo] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

  const [sorting, setSorting] = useState<SortingState>([]);

  const buscarVendas = () => {
    setLoading(true);
    axios.get(API_URL, {
      params: {
        termo: termo,
        dataInicio: dataInicio,
        dataFim: dataFim
      }
    })
      .then(response => {
        setVendas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar vendas:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    buscarVendas();
  }, []);

  const columns = useMemo(() => [
    { 
      header: 'Produto', 
      accessorKey: 'produto' 
    },
    { 
      header: 'Categoria', 
      accessorKey: 'categoria',
      cell: (info: any) => (
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
          {info.getValue()}
        </span>
      )
    },
    { 
      header: 'Qtd', 
      accessorKey: 'quantidade',
      cell: (info: any) => <div className="text-center">{info.getValue()}</div>
    },
    { 
      header: 'Valor (R$)', 
      accessorKey: 'valor',
      cell: (info: any) => <div className="text-right">R$ {info.getValue().toFixed(2)}</div>
    },
    { 
      header: 'Data', 
      accessorKey: 'data',
      cell: (info: any) => <div className="text-right">{new Date(info.getValue()).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</div>
    },
  ], []);

  const table = useReactTable({
    data: vendas,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), 
  });

  // Gera o PDF
  const gerarPDF = () => {
    const doc = new jsPDF();

    doc.text("Relatório de Vendas", 14, 10);
    doc.setFontSize(10);
    doc.text(`Filtros aplicados: ${termo || 'Nenhum'} | Período: ${dataInicio || 'Início'} até ${dataFim || 'Fim'}`, 14, 16);
    doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 22);

    autoTable(doc, {
      startY: 25,
      head: [['Produto', 'Categoria', 'Qtd', 'Valor (R$)', 'Data']],
      body: vendas.map(venda => [
        venda.produto,
        venda.categoria,
        venda.quantidade,
        venda.valor.toFixed(2),
        new Date(venda.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      ]),
    });

    doc.save('relatorio-vendas.pdf');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Cabeçalho */}
        <div className="p-6 bg-blue-600 text-white flex justify-between items-center">
          <h1 className="text-2xl font-bold">Relatório de Vendas</h1>
          <button 
            onClick={gerarPDF}
            className="bg-white text-blue-600 px-4 py-2 rounded font-bold hover:bg-gray-100 transition"
          >
            Exportar PDF
          </button>
        </div>

        {/* --- Filtros --- */}
        <div className="p-6 bg-gray-50 border-b grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700">Buscar Produto/Categoria</label>
            <input 
              type="text" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              placeholder="Ex: Mouse"
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Início</label>
            <input 
              type="date" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Fim</label>
            <input 
              type="date" 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button 
              onClick={buscarVendas}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex-1 font-semibold"
            >
              Filtrar
            </button>
            <button 
              onClick={() => { setTermo(''); setDataInicio(''); setDataFim(''); window.location.reload(); }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition font-semibold"
            >
              Limpar
            </button>
          </div>
        </div>

        {/* --- Tabela Interativa (TanStack) --- */}
        <div className="p-6">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Carregando dados...</p>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-100">
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th 
                          key={header.id} 
                          className="p-3 font-semibold text-gray-700 border-b cursor-pointer hover:bg-gray-200 select-none transition-colors"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {/* Ícone de ordenação */}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length === 0 ? (
                     <tr><td colSpan={5} className="p-8 text-center text-gray-500">Nenhuma venda encontrada com esses filtros.</td></tr>
                  ) : (
                    table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="p-3">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;