document.querySelector("#btn_op1").onclick = () => Ler_palavras(0, document.querySelector("#btn_op1").innerHTML);
document.querySelector("#btn_op2").onclick = () => Ler_palavras(1, document.querySelector("#btn_op2").innerHTML);
document.querySelector("#btn_op3").onclick = () => Ler_palavras(2, document.querySelector("#btn_op3").innerHTML);
document.querySelector("#btn_op4").onclick = () => Ler_palavras(3, document.querySelector("#btn_op4").innerHTML);

var inicio = true;
var vidas = 3;
var vet_palavras;  //Detectar vitória

function Ler_palavras(tema, tema_escolhido) {

  tema_atual = tema_escolhido;
  //Criar palavras
  let obj_palavras = {
    carros: ["Saveiro", "Hilux", "Fusca", "Voyage", "Camaro", "Orochi", "Montana", "Lamborghini Veneno", "Corolla", "Bugatti Veyron"],
    jogos: ["Cuphead", "Dark souls", "Elden ring", "Forza Horizon", "Grand Theft Auto", "Doom Eternal", "God of War", "League of Legends", "Valorant", "Hitman"],
    comidas: ["Miojo", "Macarronada", "Salada", "Bolo de Chocolate", "Coxinha", "Pastel", "Misto Quente", "Feijoada", "Esfirra", "Pao com Linguiça"],
    marcas: ["Lacoste", "Positivo", "Nvidia", "Amd", "Intel", "Gigabyte", "Topper", "Red Dragon", "Rise Mode", "Flydigi"]
  }

  if (tema == 0) { tema = obj_palavras.comidas; }

  else if (tema == 1) { tema = obj_palavras.carros; }

  else if (tema == 2) { tema = obj_palavras.jogos; }

  else if (tema == 3) { tema = obj_palavras.marcas; }

  let palavras = Array(2);
  let atual = 2;
  let anterior = 2;

  for (let i = 0; i < palavras.length; i++) {
    while (atual == anterior) { atual = Math.floor(Math.random() * tema.length); }

    anterior = atual;
    palavras[i] = tema[atual];
  }

  vet_palavras = palavras;
  document.querySelector(".tema").innerHTML += " " + tema_escolhido;

  Carregar_jogo(0);
}

function Ler_dados(vet_palavras) {
  let str_dados = localStorage.getItem("forca_data");
  let obj_dados, cont_letra;

  if (inicio) {
    obj_dados = { vet_teclas: [], vet_palavra1: [], vet_palavra2: [], temas: {} };
    let palavra, numero, tecla_ativa, obj_letra;

    //criar objetos para cada letra das palavras

    for (let i = 0; i < vet_palavras.length; i++) {
      palavra = vet_palavras[i];
      cont_letra = 0;

      for (let j = 0; j < palavra.length; j++) {
        numero = (Math.floor(Math.random() * 100)) - j;

        if (cont_letra <= 2) { tecla_ativa = numero > 50 && numero < 80 ? true : false; }
        else {tecla_ativa=false;}

        if (tecla_ativa) { cont_letra++; }

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
  let teclado = document.querySelector(".teclado");
  let vet_telas = ["#palavra1", "#palavra2"];
  document.querySelector(".tela_inicial").style.display = "none";
  document.querySelector("header").style.opacity = "unset";

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
    teclado.innerHTML = ``;
    let obj_dados = Ler_dados(vet_palavras);
    inicio = false;

    for (let i = 65; i < 91; i++) {

      if (!obj_dados.vet_teclas[i - 65].ativa || obj_dados.vet_teclas[i - 65].id == letra_escolhida) {
        obj_dados.vet_teclas[i - 65].ativa = false;
        classe = "tecla_inativa";
      }

      else { classe = "tecla"; }

      teclado.innerHTML += `<button id="bt-${i}" class="${classe}">${obj_dados.vet_teclas[i - 65].id}</button> `;

    }

    for (let i = 0; i < vet_palavras.length; i++) {

      forca = document.querySelector(vet_telas[i]);
      forca.innerHTML = ``;

      palavra = i == 0 ? obj_dados.vet_palavra1 : obj_dados.vet_palavra2;

      for (let j = 0; j < palavra.length; j++) {
        letra = "";
        classe = "card_ativo"

        if (palavra[j].id != " ") {
          if (palavra[j].ativa || palavra[j].ativada_padrao || palavra[j].id == letra_escolhida) {
            letra = palavra[j].id;
            palavra[j].ativa = true;
          }
        }

        else {
          classe = "card_vazio";
        }

        forca.innerHTML += `<div class="${classe}">${letra}</div>`
      }
    }

    Salvar_dados(obj_dados);
    Inicializar_botoes();
    Verificar_vitoria();
  }

  else if (letra_escolhida != -1) {
    vidas--;
    Carregar_barra_vida()
  }

}

function Verificar_vitoria() {
  let obj_dados = Ler_dados();
  let vitoria = false;
  let palavra;

  for (let i = 0; i < 2; i++) {

    palavra = i == 0 ? obj_dados.vet_palavra1 : obj_dados.vet_palavra2;

    for (let j = 0; j < palavra.length; j++) {
      if (palavra[j].ativa || palavra[j].ativada_padrao || palavra[j].id == " ") {
        vitoria = true;
      }
      else {
        vitoria = false;
        break;
      }
    }
  }

  if (vitoria) {
    vidas = 0;
    Carregar_barra_vida(vitoria);
  }

}

function Carregar_barra_vida(vitoria) {
  let mensagem = "Você perdeu!";
  document.querySelector(`#borda div:nth-child(${3 - vidas})`).style.display = "none";
  document.querySelector("#tela_erro").innerHTML = `Letra errada, vidas restantes ${vidas}`;
  document.querySelector("#cont_vidas").innerHTML = vidas;

  if (vidas <= 0) {
    if (vitoria) { mensagem = "Você ganhou!" };

    document.querySelector("#palavra1").innerHTML = "", document.querySelector("#palavra2").innerHTML = "";
    document.querySelector(".teclado").innerHTML = "", document.querySelector(".tela_inicial").style.display = "flex";
    document.querySelector("#tela_erro").innerHTML = ""; document.querySelector(".tela_inicial h1").innerHTML = mensagem;
    document.querySelector(".tela_inicial h2").innerHTML = "Recomeçar"; document.querySelector(".tela_inicial ul").style.display = "none";
    document.querySelector("#btn_recomeçar").onclick = () => location.reload(); document.querySelector("#btn_recomeçar").style.display = "unset";
    document.querySelector("header").style.display = "none";
  }
}

function Inicializar_botoes() {
  let obj_dados = Ler_dados();

  for (let i = 65; i < 91; i++) {

    if (!obj_dados.vet_teclas[i - 65].ativa) {
      document.querySelector(`#bt-${i}`).onclick = () => function (botao) { botao.prevaultDefault(); }
    }
    else {
      document.querySelector(`#bt-${i}`).onclick = () => Carregar_jogo(obj_dados.vet_teclas[i - 65].id);
    }

  }
}






