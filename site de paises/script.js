document.querySelector(".modo_tema").onclick = () => Alternar_tema();

function Alternar_tema() {
    let str_dados = localStorage.getItem("tema_cor");
    let tema_cor;

    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let card = document.querySelector(".card_pais");
    let barra_pesquisa = document.querySelector(".barra_pesquisa");
    let campo_pesquisa = document.querySelector("#campo_pesquisa");
    let filtro_pesquisa = document.querySelector(".filtro_pesquisa");
    let html = document.querySelector("*");
    let botao_tema = document.querySelector("header a");
    let filtro_cor = document.querySelector("#regioes");
    let icone = document.querySelector(".modo_tema i");

    if (str_dados) {
        tema_cor = JSON.parse(str_dados);
    }

    else {
        tema_cor = { cor: 0 };
    }

    if (tema_cor.cor == 0) {
        header.style.background = "rgb(40, 40, 40)";
        main.style.background = "rgb(32, 32, 32)";
        filtro_pesquisa.style.background = "rgb(32, 32, 32)";
        filtro_cor.style.background = "rgb(32, 32, 32)";
        barra_pesquisa.style.background = "none";
        card.style.background = "rgb(39, 39, 39)";
        card.style.boxShadow = "none";
        filtro_pesquisa.style.boxShadow = "none";
        campo_pesquisa.style.boxShadow = "none";
        header.style.boxShadow = "none";
        html.style.color = "white";
        botao_tema.style.color = "white";
        filtro_cor.style.color = "white";
        campo_pesquisa.style.color = "white";
        tema_cor.cor = 1;
        header.style.margin = "0";
        filtro_pesquisa.style.border = "solid rgb(71, 71, 71) 1px";
        barra_pesquisa.style.border = "solid rgb(71, 71, 71) 1px";
        card.style.border = "solid rgb(60, 60, 60) 1px"
        icone.classList.replace("fa-regular fa-moon","fa-regular fa-sun");

    }

    else {
        header.style.backgroundColor = "unset"
        main.style.backgroundColor = "rgba(245, 245, 245, 0.413)";
        barra_pesquisa.style.background = "white";
        filtro_pesquisa.style.background = "white";
        filtro_cor.style.background = "white";
        filtro_cor.style.color = "black";
        html.style.color = "black";
        filtro_pesquisa.style.border = "none";
        barra_pesquisa.style.border = "none";
        filtro_pesquisa.style.boxShadow = "1px 1px 8px gainsboro";
        campo_pesquisa.style.border = "none";
        campo_pesquisa.style.boxShadow = "-1px 2px 8px gainsboro";
        card.style.boxShadow = "-1px 10px 8px rgb(236, 236, 236)";
        card.style.background = "white";
        botao_tema.style.color = "unset";
        tema_cor.cor = 0;
        card.style.border = "none";
        icone.classList.replace("fa-regular fa-sun","fa-regular fa-moon");
    }

    localStorage.setItem('tema_cor', JSON.stringify(tema_cor));

}