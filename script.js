function carregarDados() {
    return fetch('dados.json')
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao ler o arquivo JSON:', error);
        });
}

// Função para atualizar o estado de um armário
function atualizarEstadoArmario(id, novoEstado) {
    console.log("Estado atualizado para o armário " + id + ": " + novoEstado);
    // Aqui você pode adicionar a lógica para atualizar o estado no arquivo JSON
    // usando uma chamada de API ou outra forma de persistência de dados
}

// Função para renderizar os armários na página
let armariosData;

function renderizarArmarios() {
    carregarDados()
        .then(data => {
            armariosData = data.armarios;
            const linha1 = document.getElementById("linha1");
            const linha2 = document.getElementById("linha2");
            linha1.innerHTML = "";
            linha2.innerHTML = "";

            armariosData.forEach(armario => {
                const divArmario = document.createElement("div");
                divArmario.classList.add("armario");
                divArmario.style.width = armario.width + "px";
                divArmario.style.border = armario.border;
                divArmario.style.position = armario.position;
                divArmario.style.aspectRatio = armario.aspectRatio;
                divArmario.style.borderRadius = armario.borderRadius;
                divArmario.style.backgroundColor = armario.backgroundColor;
                divArmario.style.display = armario.display;
                divArmario.style.flexDirection = armario.flexDirection;
                divArmario.style.placeItems = armario.placeItems;
                divArmario.style.justifyContent = armario.justifyContent;
                divArmario.style.fontWeight = armario.fontWeight;
                divArmario.style.gap = armario.gap;

                divArmario.innerText = "Armario " + armario.id;
                const button = document.createElement("button");
                button.classList.add("botao");
                button.classList.add(armario.estado);
                button.innerText = armario.estado;
                button.addEventListener("click", function () {
                    const novoEstado = obterNovoEstado(armario.estado);
                    button.classList.remove(armario.estado);
                    button.classList.add(novoEstado);
                    armario.estado = novoEstado;
                    button.innerText = armario.estado;
                    atualizarEstadoArmario(armario.id, novoEstado);
                });

                divArmario.appendChild(button);

                if (armario.id <= 5) {
                    linha1.appendChild(divArmario);
                } else {
                    linha2.appendChild(divArmario);
                }
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
}

// Função auxiliar para obter o próximo estado com base no estado atual
function obterNovoEstado(estadoAtual) {
    if (estadoAtual === "aberto") {
        return "em-uso";
    } else if (estadoAtual === "em-uso") {
        return "manutencao";
    } else {
        return "aberto";
    }
}

// Chamar a função de renderização para exibir os armários iniciais na página
renderizarArmarios();