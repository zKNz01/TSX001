import React from 'react';
import useFetch from './useFecth';

type produto = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
  descricao: string;
  internacional: boolean;
};

const App = () => {
  const [id, setId] = React.useState('p001');

  const produtos = useFetch<produto[]>('https://data.origamid.dev/produtos/');
  const produto = useFetch<produto>(
    `https://data.origamid.dev/produtos/${id}`,
    {
      cache: 'force-cache',
    },
  );

  return (
    <section className="flex">
      <div>
        {produtos.data &&
          produtos.data.map((produto) => (
            <button onClick={() => setId(produto.id)} key={produto.id}>
              {produto.id}
            </button>
          ))}
      </div>
      <div>
        {produto.loading && <div>Carregando...</div>}
        {produto.data && (
          <ul>
            <li>ID: {produto.data.id}</li>
            <li>Nome: {produto.data.nome}</li>
            <li>Preço: {produto.data.preco}</li>
            <li>Quantidade: {produto.data.quantidade}</li>
            <li>Descrição: {produto.data.descricao}</li>
            {produto.data.internacional ? <li>Internacional</li> : ''}
          </ul>
        )}
      </div>
    </section>
  );
};

export default App;
