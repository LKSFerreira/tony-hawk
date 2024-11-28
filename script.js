import { Pane } from "https://cdn.jsdelivr.net/npm/tweakpane";

const ROOT_NODE = document.querySelector("#app");

const skatistas = {};

const ctrl = new Pane({
    title: "Placar",
    expanded: true
});

// Função para atualizar o placar visualmente
const updatePlacar = () => {
    // Limpa o painel antes de adicionar os skatistas atualizados
    ctrl.children.forEach(child => ctrl.remove(child));

    // Adiciona cada skatista e sua pontuação no painel
    Object.keys(skatistas).forEach(nome => {
        ctrl.addBinding({ [nome]: skatistas[nome] }, nome, { label: nome });
    });
};

// Função para adicionar ou atualizar o skatista
const addOrUpdateSkatista = (nome, pontuacao) => {
    skatistas[nome] = Math.max(skatistas[nome] || 0, pontuacao);  // Armazena a maior pontuação
    updatePlacar();  // Atualiza o placar no painel
};

// Remove a lógica de alterar o tema, pois estamos fixando o tema "dark"
document.documentElement.dataset.theme = "dark";

// Função para calcular a pontuação
const calcula_pontuacao = (manobra, quantidade, multiplicador) => {
    return (manobra * quantidade) * multiplicador;
};

// Função para gerar uma cor aleatória
const gerarCorAleatoria = () => {
    const letras = '0123456789ABCDEF';
    let cor = '#';
    for (let i = 0; i < 6; i++) {
        cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
};

// Função para criar o formulário de manobras
const createManobraForm = (manobras) => {
    let comboCounter = 0;
    let pontuacaoTotal = 0;
    const manobrasRepetidas = {};

    const form = document.createElement('form');
    form.addEventListener('submit', (event) => event.preventDefault());

    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = "Selecione as manobras:";
    fieldset.appendChild(legend);

    const ul = document.createElement('ul');
    
    Object.keys(manobras).forEach((manobra) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const spanManobra = document.createElement('span');
        spanManobra.textContent = manobra;
        const spanSvg = document.createElement('span');

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("aria-hidden", "true");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "currentColor");
        svg.innerHTML = `<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd"/>`;

        spanSvg.appendChild(svg);

        const input = document.createElement('input');
        input.classList.add('sr-only');
        input.type = 'checkbox';

        input.addEventListener('change', () => {
            if (input.checked) {
                comboCounter++;
                pontuacaoTotal += calcula_pontuacao(manobras[manobra], 1, comboCounter);
                manobrasRepetidas[manobra] = (manobrasRepetidas[manobra] || 0) + 1;
            } else {
                comboCounter--;
                pontuacaoTotal -= calcula_pontuacao(manobras[manobra], 1, comboCounter + 1); // Ajusta a pontuação ao desmarcar
                manobrasRepetidas[manobra]--;
            }
            updateZerarComboButton();
        });

        // Adiciona o evento de clique com o botão direito do mouse
        label.addEventListener('contextmenu', (event) => {
            event.preventDefault();

            // Verifica se a manobra está selecionada antes de permitir a repetição
            if (!input.checked) {
                alert("Apenas manobras selecionadas podem ser repetidas.");
                return;
            }
            
            // Incrementar o combo e o multiplicador
            comboCounter++;
            manobrasRepetidas[manobra]++;
            pontuacaoTotal += calcula_pontuacao(manobras[manobra], manobrasRepetidas[manobra], comboCounter);

            // Alterar a cor da manobra para uma cor aleatória
            label.style.color = gerarCorAleatoria();

            updateZerarComboButton();
        });

        label.appendChild(spanManobra);
        label.appendChild(spanSvg);
        label.appendChild(input);
        li.appendChild(label);
        ul.appendChild(li);
    });

    fieldset.appendChild(ul);
    form.appendChild(fieldset);

    const divButtons = document.createElement('div');
    divButtons.classList.add('div_buttons');
    fieldset.appendChild(divButtons);

    const zerarComboButton = document.createElement('button');
    zerarComboButton.type = 'button';
    zerarComboButton.textContent = 'Zerar Combo';
    divButtons.appendChild(zerarComboButton);

    const resetButton = document.createElement('button');
    resetButton.type = 'reset';
    resetButton.textContent = 'Reiniciar';
    divButtons.appendChild(resetButton);
    
    const calcButton = document.createElement('button');
    calcButton.type = 'button';
    calcButton.textContent = 'Calcular';
    divButtons.appendChild(calcButton);
    calcButton.addEventListener('click', () => {
        const selectedManobras = document.querySelectorAll('input[type="checkbox"]:checked');
        if (selectedManobras.length === 0) {
            alert("Por favor, selecione pelo menos uma manobra.");
            return;
        }

        let nomeSkatista = "";
        while (true) {
            nomeSkatista = prompt("Digite o nome do Skatista (3-12 caracteres):");
            if (nomeSkatista === null) {
                // Se o usuário cancelar, sai da função sem reiniciar o formulário
                return;
            }
            if (nomeSkatista.length >= 3 && nomeSkatista.length <= 12) {
                break;
            } else {
                alert("O nome do skatista deve ter entre 3 e 12 caracteres.");
            }
        }

        addOrUpdateSkatista(nomeSkatista, pontuacaoTotal);  // Adiciona ou atualiza o skatista no placar

        // Clica no botão reset
        resetButton.click();
        pontuacaoTotal = 0; // Reseta a pontuação total após calcular
        comboCounter = 0; // Reseta o contador do combo após calcular
        Object.keys(manobrasRepetidas).forEach(key => manobrasRepetidas[key] = 0); // Reseta as manobras repetidas
        updateZerarComboButton();
    });

    // Evento para restaurar a cor original ao clicar em reset
    resetButton.addEventListener('click', () => {
        const allLabels = document.querySelectorAll('label');
        allLabels.forEach((label) => {
            label.style.removeProperty('color');  // Remove o estilo inline da cor
        });
    });

    zerarComboButton.addEventListener('click', () => {
        comboCounter = 0;
        updateZerarComboButton();
    });

    const updateZerarComboButton = () => {
        if (comboCounter > 0) {
            zerarComboButton.textContent = `Zerar Combo ${comboCounter}x`;
        } else {
            zerarComboButton.textContent = 'Zerar Combo';
        }
    };

    return form;
};

// Função para carregar as manobras do arquivo JSON
const loadManobras = async () => {
    try {
        const response = await fetch('manobras.json');
        const manobras = await response.json();
        ROOT_NODE.appendChild(createManobraForm(manobras));
    } catch (error) {
        console.error('Erro ao carregar as manobras:', error);
    }
};

// Carrega as manobras e cria o formulário
loadManobras();