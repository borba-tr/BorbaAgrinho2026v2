document.addEventListener("DOMContentLoaded", function () {
  const campos = [
    {
      input: document.getElementById("agua"),
      valor: document.getElementById("valorAgua")
    },
    {
      input: document.getElementById("energia"),
      valor: document.getElementById("valorEnergia")
    },
    {
      input: document.getElementById("mata"),
      valor: document.getElementById("valorMata")
    },
    {
      input: document.getElementById("tecnologiaCampo"),
      valor: document.getElementById("valorTecnologia")
    },
    {
      input: document.getElementById("solo"),
      valor: document.getElementById("valorSolo")
    },
    {
      input: document.getElementById("agrotoxicos"),
      valor: document.getElementById("valorAgrotoxicos")
    }
  ];

  const btnCalcular = document.getElementById("btnCalcular");
  const btnResetar = document.getElementById("btnResetar");
  const resultadoSimulador = document.getElementById("resultadoSimulador");

  const btnCorrigirQuiz = document.getElementById("btnCorrigirQuiz");
  const btnLimparQuiz = document.getElementById("btnLimparQuiz");
  const resultadoQuiz = document.getElementById("resultadoQuiz");
  const formQuiz = document.getElementById("formQuiz");

  const btnEventoSurpresa = document.getElementById("btnEventoSurpresa");
  const eventoSurpresa = document.getElementById("eventoSurpresa");

  function atualizarValores() {
    campos.forEach(function (campo) {
      if (campo.input && campo.valor) {
        campo.valor.textContent = campo.input.value;
      }
    });
  }

  campos.forEach(function (campo) {
    if (campo.input) {
      campo.input.addEventListener("input", atualizarValores);
    }
  });

  function calcularMedia() {
    let soma = 0;

    campos.forEach(function (campo) {
      if (campo.input) {
        soma += Number(campo.input.value);
      }
    });

    return Math.round(soma / campos.length);
  }

  function definirClassificacao(media) {
    if (media >= 85) {
      return {
        nome: "Excelente",
        classe: "excelente",
        impacto: "baixo impacto ambiental",
        economia: "alta economia de recursos",
        recomendacao:
          "A fazenda está muito sustentável. Continue mantendo a preservação da mata, o cuidado com o solo e o uso de tecnologia."
      };
    }

    if (media >= 70) {
      return {
        nome: "Boa",
        classe: "bom",
        impacto: "impacto ambiental moderado",
        economia: "boa economia de recursos",
        recomendacao:
          "A fazenda está no caminho certo. Para melhorar, aumente o uso de energia limpa e reduza desperdícios."
      };
    }

    if (media >= 50) {
      return {
        nome: "Regular",
        classe: "regular",
        impacto: "impacto ambiental em atenção",
        economia: "economia de recursos ainda limitada",
        recomendacao:
          "A fazenda precisa evoluir. Invista em irrigação inteligente, proteção do solo e preservação ambiental."
      };
    }

    return {
      nome: "Baixa",
      classe: "baixo",
      impacto: "alto risco ambiental",
      economia: "baixo aproveitamento dos recursos",
      recomendacao:
        "A sustentabilidade está baixa. É necessário rever o uso da água, proteger a mata e adotar tecnologias sustentáveis."
    };
  }

  function calcularSustentabilidade() {
    const media = calcularMedia();
    const resultado = definirClassificacao(media);

    if (!resultadoSimulador) return;

    resultadoSimulador.className = "resultado " + resultado.classe;

    resultadoSimulador.innerHTML = `
      <strong>Índice de sustentabilidade:</strong> ${media}%<br>
      <strong>Classificação:</strong> ${resultado.nome}<br>
      <strong>Impacto ambiental:</strong> ${resultado.impacto}<br>
      <strong>Economia de recursos:</strong> ${resultado.economia}<br>
      <strong>Recomendação:</strong> ${resultado.recomendacao}

      <div class="medidor-sustentabilidade">
        <div class="barra-sustentabilidade" style="width: ${media}%;"></div>
      </div>

      <span class="selo-resultado">
        Fazenda com sustentabilidade ${resultado.nome}
      </span>

      <div class="check-final">
        <strong>Resumo:</strong><br>
        Quanto maior o equilíbrio entre água, energia limpa, preservação,
        tecnologia, solo e redução de agrotóxicos, maior será o potencial
        sustentável da fazenda.
      </div>
    `;
  }

  function resetarSimulador() {
    const valoresIniciais = [60, 50, 55, 50, 60, 45];

    campos.forEach(function (campo, index) {
      if (campo.input) {
        campo.input.value = valoresIniciais[index];
      }
    });

    atualizarValores();

    if (resultadoSimulador) {
      resultadoSimulador.className = "resultado";
      resultadoSimulador.innerHTML =
        "Ajuste os valores e clique no botão para ver o resultado.";
    }
  }

  if (btnCalcular) {
    btnCalcular.addEventListener("click", calcularSustentabilidade);
  }

  if (btnResetar) {
    btnResetar.addEventListener("click", resetarSimulador);
  }

  function corrigirQuiz() {
    const perguntas = ["q1", "q2", "q3", "q4", "q5", "q6"];
    let pontos = 0;
    let respondidas = 0;

    perguntas.forEach(function (pergunta) {
      const respostaSelecionada = document.querySelector(
        `input[name="${pergunta}"]:checked`
      );

      if (respostaSelecionada) {
        respondidas++;

        if (respostaSelecionada.value === "correto") {
          pontos++;
        }
      }
    });

    if (!resultadoQuiz) return;

    if (respondidas < perguntas.length) {
      resultadoQuiz.className = "resultado regular";
      resultadoQuiz.innerHTML =
        "<strong>Atenção:</strong> responda todas as perguntas antes de corrigir o quiz.";
      return;
    }

    let mensagem = "";

    if (pontos === 6) {
      mensagem = "Excelente! Você compreende muito bem o agro sustentável.";
      resultadoQuiz.className = "resultado excelente";
    } else if (pontos >= 4) {
      mensagem = "Muito bom! Você está no caminho certo.";
      resultadoQuiz.className = "resultado bom";
    } else if (pontos >= 2) {
      mensagem = "Bom começo! Ainda é possível aprender mais.";
      resultadoQuiz.className = "resultado regular";
    } else {
      mensagem =
        "Continue estudando. O campo sustentável depende de escolhas conscientes.";
      resultadoQuiz.className = "resultado baixo";
    }

    resultadoQuiz.innerHTML = `
      <strong>Resultado:</strong> você acertou ${pontos} de ${perguntas.length} perguntas.<br>
      ${mensagem}
      <br><br>
      <strong>Aprendizado:</strong><br>
      💧 A irrigação inteligente ajuda a economizar água.<br>
      ☀️ A energia solar reduz impactos ambientais.<br>
      📡 Sensores ajudam o produtor a tomar decisões com dados.<br>
      🌱 A cobertura vegetal e a rotação de culturas protegem o solo.<br>
      🚁 Drones auxiliam no monitoramento das plantações.<br>
      🌎 Uma fazenda sustentável equilibra produção, tecnologia e preservação.

      <div class="selo-final">
        🏅 Selo conquistado: Guardião do Agro Sustentável
      </div>
    `;
  }

  function limparQuiz() {
    if (formQuiz) {
      formQuiz.reset();
    }

    if (resultadoQuiz) {
      resultadoQuiz.className = "resultado";
      resultadoQuiz.innerHTML = "Responda às perguntas e clique em corrigir.";
    }
  }

  if (btnCorrigirQuiz) {
    btnCorrigirQuiz.addEventListener("click", corrigirQuiz);
  }

  if (btnLimparQuiz) {
    btnLimparQuiz.addEventListener("click", limparQuiz);
  }

  const eventosDoCampo = [
    {
      titulo: "Seca prolongada",
      problema:
        "A fazenda enfrentou um período de pouca chuva. O produtor precisa agir para economizar água.",
      opcoes: [
        {
          texto: "Usar irrigação inteligente",
          correta: true,
          feedback:
            "Boa escolha! A irrigação inteligente ajuda a economizar água e mantém a produção mesmo em períodos de seca."
        },
        {
          texto: "Irrigar sem controle",
          correta: false,
          feedback:
            "Essa decisão aumenta o desperdício de água. O ideal é controlar a irrigação de acordo com a necessidade do solo."
        },
        {
          texto: "Ignorar a seca",
          correta: false,
          feedback:
            "Ignorar o problema pode prejudicar a plantação. O produtor precisa monitorar a água e proteger o solo."
        }
      ]
    },
    {
      titulo: "Chuva forte",
      problema:
        "A propriedade recebeu chuva intensa. Existe risco de erosão no solo.",
      opcoes: [
        {
          texto: "Manter cobertura vegetal",
          correta: true,
          feedback:
            "Boa decisão! A cobertura vegetal protege o solo e reduz os efeitos da erosão causada pela chuva."
        },
        {
          texto: "Retirar toda a vegetação",
          correta: false,
          feedback:
            "Essa escolha aumenta o risco de erosão. A vegetação ajuda a proteger a terra."
        },
        {
          texto: "Deixar a água levar o solo",
          correta: false,
          feedback:
            "Isso prejudica a fertilidade da terra. O cuidado com o solo é essencial para uma produção sustentável."
        }
      ]
    },
    {
      titulo: "Aparecimento de pragas",
      problema:
        "Foram encontrados sinais de pragas na plantação.",
      opcoes: [
        {
          texto: "Monitorar com drones e sensores",
          correta: true,
          feedback:
            "Excelente! A tecnologia ajuda a identificar o problema cedo e permite uma ação mais precisa."
        },
        {
          texto: "Usar produtos sem controle",
          correta: false,
          feedback:
            "O uso sem controle pode prejudicar o ambiente. O ideal é monitorar e agir com responsabilidade."
        },
        {
          texto: "Não verificar a plantação",
          correta: false,
          feedback:
            "Sem monitoramento, o problema pode crescer. Drones e sensores ajudam na prevenção."
        }
      ]
    },
    {
      titulo: "Energia solar em alta",
      problema:
        "Os painéis solares tiveram ótimo rendimento durante a semana.",
      opcoes: [
        {
          texto: "Aproveitar energia limpa",
          correta: true,
          feedback:
            "Boa escolha! A energia solar reduz custos e diminui impactos ambientais na propriedade."
        },
        {
          texto: "Desligar os painéis",
          correta: false,
          feedback:
            "Essa decisão desperdiça uma oportunidade de usar energia limpa e econômica."
        },
        {
          texto: "Ignorar a economia gerada",
          correta: false,
          feedback:
            "Acompanhar os dados de energia ajuda o produtor a planejar melhor os custos da fazenda."
        }
      ]
    },
    {
      titulo: "Sensor detectou solo seco",
      problema:
        "Os sensores indicaram baixa umidade no solo.",
      opcoes: [
        {
          texto: "Ajustar a irrigação conforme os dados",
          correta: true,
          feedback:
            "Muito bem! Usar dados dos sensores permite irrigar na medida certa e evitar desperdício."
        },
        {
          texto: "Regar sem verificar os dados",
          correta: false,
          feedback:
            "Sem usar os dados, pode haver desperdício ou falta de água. A tecnologia ajuda na decisão correta."
        },
        {
          texto: "Desconsiderar os sensores",
          correta: false,
          feedback:
            "Os sensores ajudam a proteger a produção. Ignorar os dados pode prejudicar o cultivo."
        }
      ]
    },
    {
      titulo: "Mutirão de preservação",
      problema:
        "A comunidade se reuniu para recuperar uma área de mata próxima da propriedade.",
      opcoes: [
        {
          texto: "Participar e preservar a mata",
          correta: true,
          feedback:
            "Excelente decisão! A preservação fortalece o equilíbrio entre produção, natureza e comunidade."
        },
        {
          texto: "Desmatar a área recuperada",
          correta: false,
          feedback:
            "Essa escolha prejudica o meio ambiente. A mata ajuda a proteger água, solo e biodiversidade."
        },
        {
          texto: "Não apoiar a preservação",
          correta: false,
          feedback:
            "A participação da comunidade fortalece a sustentabilidade e melhora o futuro do campo."
        }
      ]
    }
  ];

  let eventoAtual = null;

  function sortearEventoSurpresa() {
    if (!eventoSurpresa) return;

    const numeroSorteado = Math.floor(Math.random() * eventosDoCampo.length);
    eventoAtual = eventosDoCampo[numeroSorteado];

    eventoSurpresa.className = "evento-destaque";

    eventoSurpresa.innerHTML = `
      <strong>Missão Relâmpago do Campo</strong><br><br>
      <strong>Evento surpresa:</strong> ${eventoAtual.titulo}<br>
      ${eventoAtual.problema}
      <br><br>
      <strong>Qual decisão o produtor deve tomar?</strong>

      <div class="opcoes-evento">
        ${eventoAtual.opcoes
          .map(function (opcao, index) {
            return `
              <button type="button" class="botao-secundario btnOpcaoEvento" data-index="${index}">
                ${opcao.texto}
              </button>
            `;
          })
          .join("")}
      </div>

      <div id="feedbackEvento" class="resultado">
        Escolha uma decisão para ver o resultado.
      </div>
    `;

    const botoesOpcoes = document.querySelectorAll(".btnOpcaoEvento");

    botoesOpcoes.forEach(function (botao) {
      botao.addEventListener("click", function () {
        const indice = Number(botao.getAttribute("data-index"));
        responderMissao(indice);
      });
    });
  }

  function responderMissao(indice) {
    if (!eventoAtual) return;

    const feedbackEvento = document.getElementById("feedbackEvento");
    const opcaoEscolhida = eventoAtual.opcoes[indice];

    if (!feedbackEvento || !opcaoEscolhida) return;

    if (opcaoEscolhida.correta) {
      feedbackEvento.className = "resultado excelente";
      feedbackEvento.innerHTML = `
        <strong>Boa escolha!</strong><br>
        ${opcaoEscolhida.feedback}
      `;
    } else {
      feedbackEvento.className = "resultado regular";
      feedbackEvento.innerHTML = `
        <strong>Atenção!</strong><br>
        ${opcaoEscolhida.feedback}
      `;
    }
  }

  if (btnEventoSurpresa && eventoSurpresa) {
    btnEventoSurpresa.addEventListener("click", sortearEventoSurpresa);
  }

  atualizarValores();
});