let Lenguage = [];
let editIndex = null;

/* carregar JSON */
fetch("info.json")
    .then(r => r.json())
    .then(data => {

        /* pega a lista correta do JSON! */
        Lenguage = data["Linguagem de programação"];

        renderList(Lenguage);
    });

/*Renderizar lista */
function renderList(lista) {
    const container = document.getElementById("linguageList");
    container.innerHTML = "";

    lista.forEach((f, index) => {
        const card = document.createElement("div");
        card.className = "lenguage-card";

        card.innerHTML = `
            <h3>${f.titulo} (${f.ano})</h3>

            <p><b>Linguagem:</b> ${f.titulo}</p>
            <p><b>Ano:</b> ${f.ano}</p>
            <p><b>Criador:</b> ${f.criador}</p>
            <p><b>Tempo de existência:</b> ${f["Tempo de existencia"]}</p>
            <p><b>Descrição:</b> ${f.descrição}</p>

            <button onclick="openModal(${index})">Editar</button>
            <button onclick="removeMovie(${index})">Excluir</button>
        `;

        container.appendChild(card);
    });
}

/*Area de pesquisa*/
document.getElementById("btnSearch").onclick = () => {
    const q = document.getElementById("searchInput").value.toLowerCase();
    const filtrado = Lenguage.filter(f => f.titulo.toLowerCase().includes(q));
    renderList(filtrado);
};

document.getElementById("btnListAll").onclick = () => renderList(Lenguage);

document.getElementById("btnAdd").onclick = () => {
    editIndex = null;
    clearForm();
    openPopup("Adicionar Linguagem");
};

/*Abrir modal*/
function openPopup(nome) {
    document.getElementById("modalTitle").textContent = nome;
    document.getElementById("modal").style.display = "flex";
}

/*Abrir modal para edição */
function openModal(index) {
    editIndex = index;
    const f = Lenguage[index];

    document.getElementById("nome").value = f.titulo;
    document.getElementById("ano").value = f.ano;
    document.getElementById("criador").value = f.criador;
    document.getElementById("tempo").value = f["Tempo de existencia"];
    document.getElementById("descricao").value = f.descrição;

    openPopup("Editar Linguagem");
}

/*Fechar */
document.getElementById("btnClose").onclick = () => {
    document.getElementById("modal").style.display = "none";
};

/*Salvar */
document.getElementById("lenguageForm").onsubmit = (e) => {
    e.preventDefault();

    const novo = {
        titulo: document.getElementById("nome").value,
        ano: document.getElementById("ano").value,
        criador: document.getElementById("criador").value,
        "Tempo de existencia": document.getElementById("tempo").value,
        descrição: document.getElementById("descricao").value
    };

    if (editIndex !== null) {
        Lenguage[editIndex] = novo;
    } else {
        Lenguage.push(novo);
    }

    renderList(Lenguage);
    document.getElementById("modal").style.display = "none";
};

/*Remover itens */
function removeMovie(i) {
    if (confirm("Tem certeza que deseja excluir?")) {
        Lenguage.splice(i, 1);
        renderList(Lenguage);
    }
}

/*Limpar o formulario */
function clearForm() {
    document.getElementById("lenguageForm").reset();
}
