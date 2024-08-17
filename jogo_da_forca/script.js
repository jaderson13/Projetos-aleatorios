document.querySelector("#btn_iniciar").onclick = () => Carregar_jogo(-1);

var inicio = true;
var vidas = 3;

function Ler_palavras() {
  let vet_palavras = ["Ubiraniu", "claudineyo"];
  return vet_palavras;
}

function Ler_dados() {
  let vet_palavras = Ler_palavras();
  let str_dados = localStorage.getItem("forca_data");
  let obj_dados;

  if (inicio) {
    obj_dados = { vet_teclas: [], vet_palavra1: [], vet_palavra2: [] };
    let palavra, numero, tecla_ativa, obj_letra;

    //criar objetos para cada letra das palavras

    for (let i = 0; i < vet_palavras.length; i++) {
      palavra = vet_palavras[i];

      for (let j = 0; j < palavra.length; j++) {
        numero = (Math.floor(Math.random() * 100))+j;
        tecla_ativa = numero > 23 && numero < 40 ? true : false;

        obj_letra = {
          id: palavra[j].toUpperCase(),
          ativa: false,
          ativada_padrao: tecla_ativa
        }

        if (i == 0) { obj_dados.vet_palavra1.push(obj_letra); }

        else { obj_dados.vet_palavra2.push(obj_letra); }

      }
    }

    //criar objetos para as teclas do teclado

    for (let i = 65; i <= 90; i++) {
      obj_letra = {
        id: String.fromCharCode(i),
        ativa: true
      }
      obj_dados.vet_teclas.push(obj_letra);
    }

    Salvar_dados(obj_dados);
  }

  else if (str_dados) {
    obj_dados = JSON.parse(str_dados);
  }

  return obj_dados;
}

function Salvar_dados(forca_data) {
  localStorage.setItem('forca_data', JSON.stringify(forca_data));
}

function Carregar_jogo(letra_escolhida) {

  let palavra, letra, classe = "";
  let letra_correta = false;

  let vet_palavras = Ler_palavras();
  let teclado = document.querySelector(".teclado");
  let vet_telas = ["#palavra1", "#palavra2"];
  document.querySelector(".tela_inicial").style.display = "none";
  document.querySelector("header").style.display = "flex";

  for (let i = 0; i < vet_palavras.length; i++) {
    palavra = vet_palavras[i];
    for (let j = 0; j < palavra.length; j++) {
      if (palavra[j].toUpperCase() == letra_escolhida) {
        letra_correta = true;
        break;
      }
    }
  }

  if (letra_correta || inicio) {
    console.log("achoy");
    teclado.innerHTML = ``;
    let obj_dados = Ler_dados();
    inicio = false;

    for (let i = 65; i < 91; i++) {

      if (!obj_dados.vet_teclas[i-65].ativa || obj_dados.vet_teclas[i-65].id == letra_escolhida) {
        obj_dados.vet_teclas[i-65].ativa = false;
        classe = "tecla_inativa";
      }

      else { classe = "tecla"; }

      teclado.innerHTML += `<button id="bt-${i}" class="${classe}">${obj_dados.vet_teclas[i-65].id}</button> `;

    }

    for (let i = 0; i < vet_palavras.length; i++) {

      forca = document.querySelector(vet_telas[i]);
      forca.innerHTML = ``;

      palavra = i == 0 ? obj_dados.vet_palavra1 : obj_dados.vet_palavra2;

      for (let j = 0; j < palavra.length; j++) {
        letra = "";

        if (palavra[j].ativa || palavra[j].ativada_padrao || palavra[j].id == letra_escolhida) {
          letra = palavra[j].id;
          palavra[j].ativa = true;
        }

        forca.innerHTML += `<div class="card_ativo">${letra}</div>`
      }
    }

    Salvar_dados(obj_dados);
    Inicializar_botoes();
  }

  else {
    vidas--;
    Carregar_barra_vida()
  }

}

function Carregar_barra_vida() {

  document.querySelector(`#borda div:nth-child(${3-vidas})`).style.display="none";
  document.querySelector("#tela_erro").innerHTML=`Letra errada, vidas restantes ${vidas}`;

  if(vidas<=0){
    document.querySelector("#palavra1").innerHTML="",  document.querySelector("#palavra2").innerHTML="";
    document.querySelector(".teclado").innerHTML="",document.querySelector(".tela_inicial").style.display="flex";
    document.querySelector("#tela_erro").style.display="none";
  }
}

function Inicializar_botoes() {
  let obj_dados = Ler_dados();

  for (let i = 65; i < 91; i++) {

    if (!obj_dados.vet_teclas[i-65].ativa) {
      document.querySelector(`#bt-${i}`).onclick = () => function(botao){botao.prevaultDefault();}
    }
    else {
      document.querySelector(`#bt-${i}`).onclick = () => Carregar_jogo(obj_dados.vet_teclas[i - 65].id);
    }

  }
}




