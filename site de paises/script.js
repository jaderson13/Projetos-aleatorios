document.querySelector(".modo_tema").onclick = () => Alternar_tema();

function Alternar_tema() {
    let str_dados = localStorage.getItem('tema_cor');
    let tema_cor = {};

    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let card = document.querySelector(".card_pais");
    let barra_pesquisa = document.querySelector(".barra_pesquisa");
    let campo_pesquisa = document.querySelector("#campo_pesquisa");
    let filtro_pesquisa = document.querySelector(".filtro_pesquisa");
    let html = document.querySelector("*");
    let botao_tema = document.querySelector("header a");
    let filtro_cor = document.querySelector("#regioes");

    if (str_dados) {
        tema_cor = str_dados;
    }

    else {
        tema_cor = { cor: 0 };
    }

    if (tema_cor.cor == 0) {
        header.style.background = "rgb(32, 32, 32)";
        main.style.background = "rgb(30, 30, 30)";
        header.style.margin = "0";
        filtro_pesquisa.style.background = "none";
        filtro_pesquisa.style.boxShadow = "none";
        campo_pesquisa.style.boxShadow = "none";
        header.style.boxShadow = "none";
        html.style.color = "white";
        botao_tema.style.color = "white";
        filtro_cor.style.color = "white";
        campo_pesquisa.style.color = "white";
        barra_pesquisa.style.border = "solid whitesmoke 1.5px";
        card.style.border = "solid whitesmoke 1.5px";
        tema_cor.cor = 1;
    }

    else {
        /*header.style.backgroundColor = "unset"
        main.style.backgroundColor = "rgba(245, 245, 245, 0.413)";
        html.style.color = "black";
        filtro_pesquisa.style.border = campo_pesquisa.style.border = "none";
        boxshadow*/
        tema_cor.cor = 0;
    }

    console.log(tema_cor.cor);

    localStorage.setItem('tema_cor', JSON.stringify(tema_cor));

}