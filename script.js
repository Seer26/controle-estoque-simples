let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

function salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function cadastrarProduto() {
    const nome = document.getElementById('nome').value;
    const codigo = document.getElementById('codigo').value;
    const quantidade = parseInt(document.getElementById('quantidade').value);
    const minimo = parseInt(document.getElementById('minimo').value);

    if (!nome || !codigo || isNaN(quantidade) || isNaN(minimo)) return alert('Preencha todos os campos corretamente.');

    produtos.push({ nome, codigo, quantidade, minimo });
    salvarProdutos();
    alert('Produto cadastrado!');
}

function entradaProduto() {
    const codigo = document.getElementById('codigoMov').value;
    const qtd = parseInt(document.getElementById('quantidadeMov').value);
    const produto = produtos.find(p => p.codigo === codigo);
    if (!produto) return alert('Produto não encontrado.');
    produto.quantidade += qtd;
    salvarProdutos();
}

function saidaProduto() {
    const codigo = document.getElementById('codigoMov').value;
    const qtd = parseInt(document.getElementById('quantidadeMov').value);
    const produto = produtos.find(p => p.codigo === codigo);
    if (!produto) return alert('Produto não encontrado.');
    if (produto.quantidade < qtd) return alert('Estoque insuficiente.');
    produto.quantidade -= qtd;
    salvarProdutos();
}

function mostrarRelatorio() {
    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '';
    produtos.forEach(p => {
        const alerta = p.quantidade <= p.minimo ? ' ⚠️ Baixo estoque!' : '';
        lista.innerHTML += `<p><strong>${p.nome}</strong> (Código: ${p.codigo}) - Quantidade: ${p.quantidade}${alerta}</p>`;
    });
}
