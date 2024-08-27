onload = () => {
    Carregar_conteudo(false);
    Alternar_tema();
}

var inicio = true;
var btn_limpar = document.querySelector(".barra_pesquisa i:last-of-type");

document.querySelector(".modo_tema").onclick = () => Alternar_tema();
document.querySelector("#btn_limpar").onclick = () => Limpar_resultado();

document.querySelector("#regioes").onchange = () => {
    if (document.querySelector("#regioes").value == "0") {Carregar_conteudo(false); }
    else {Carregar_conteudo(true); }
}

document.querySelector("#btn_pesquisa").onclick = () => {
    let pesquisa = document.querySelector("#campo_pesquisa").value;
    if (pesquisa == "") { alert("Não deixe o campo em branco!");  filtro = false;}
    else{ Carregar_conteudo(true);}
 }

function Carregar_conteudo(filtro) {

    fetch('https://restcountries.com/v3.1/all')
        .then(dados => dados.json())
        .then(dados => {
            vet_paises = dados;

            let pesquisa = document.querySelector("#campo_pesquisa").value.toUpperCase();
            let filtro_regiao = document.querySelector("#regioes").value.toUpperCase();
            let str_html = "";
            let achar = false;
            let pais, regiao;

            console.log(filtro_regiao+" "+filtro);

            for (let i = 0; i < vet_paises.length; i++) {
                pais = vet_paises[i].name.common.toUpperCase();
                regiao = vet_paises[i].region.toUpperCase();

                if (!filtro || filtro_regiao == regiao || pesquisa == pais || pais.indexOf(pesquisa) != -1) {
                    console.log("alouwe");
                    achar = true;
                    str_html +=
                        `
                <div class="card_pais">
                        <img alt="bandeira" src="${vet_paises[i].flags.png}">
                        <article>
                            <h3>${vet_paises[i].name.common}</h3>
                            <h4><b>População:</b> ${vet_paises[i].population}</h4>
                            <h4><b>Região: </b>${vet_paises[i].region}</h4>
                            <h4><b>Capital: </b>${vet_paises[i].capital}</h4>
                        </article>
                    </div>
                `;
                }
            }

            if (!achar) {
                str_html =
                    `
            <div class="card_pais">       
                <article>
                    <h4><b>Nenhum resultado encontrado</b></h4>
                </article>
            </div>
        `;
            }
            
            document.querySelector(".secao_cards").innerHTMl = "";
            document.querySelector(".secao_cards").innerHTML = str_html;

            if (pesquisa=="") { btn_limpar.style.visibility = "hidden"; }
            else { btn_limpar.style.visibility = "unset"; }

            Alternar_tema(true);

        })
}

function Limpar_resultado() {
    document.querySelector("#campo_pesquisa").value = "";
    Carregar_conteudo(false);
}

function Alternar_tema(pesquisa) {
    let str_dados = localStorage.getItem("tema_cor");
    let tema_cor;
    let header = document.querySelector("header");
    let main = document.querySelector("main");
    let campo_pesquisa = document.querySelector("#campo_pesquisa");
    let html = document.querySelector("*");
    let botao_tema = document.querySelector("header a");
    let filtro_cor = document.querySelector("#regioes");
    let tela_tema = document.querySelector(".modo_tema");
    let vet_cards = document.querySelectorAll(".card_pais");
    let btn_pesquisa = document.querySelector("#btn_pesquisa");

    if (str_dados) {
        tema_cor = JSON.parse(str_dados);
    }

    else {
        tema_cor = { cor: 0 };
    }

    if (inicio || pesquisa) { tema_cor.cor = tema_cor.cor == 0 ? 1 : 0; }

    if (tema_cor.cor == 0) {
        header.style.background = "rgb(40, 40, 40)";
        main.style.background = "rgb(32, 32, 32)";
        filtro_cor.style.background = "rgb(32, 32, 32)";
        btn_pesquisa.style.background = "rgb(47, 47, 47)";
        campo_pesquisa.style.background = "rgb(32, 32, 32)";
        btn_pesquisa.style.borderColor = "black";
        filtro_cor.style.boxShadow = "none";
        campo_pesquisa.style.boxShadow = "none";
        header.style.boxShadow = "none";
        html.style.color = "white";
        botao_tema.style.color = "white";
        filtro_cor.style.color = "white";
        btn_pesquisa.style.color = "white";
        btn_limpar.style.color = "white";
        campo_pesquisa.style.color = "white";
        header.style.margin = "0";
        filtro_cor.style.border = "solid rgb(71, 71, 71) 1px";
        campo_pesquisa.style.border = "solid rgb(71, 71, 71) 1px";
        tema_cor.cor = 1;
        tela_tema.innerHTML =
            `
        <i class="fa-regular fa-sun"></i>
            <h4>Modo Claro</h4>
        `;

        for (let i = 0; i < vet_cards.length; i++) {
            vet_cards[i].style.border = "solid rgb(70, 70, 70) 1px";
            vet_cards[i].style.background = "rgb(47, 47, 47)";
            vet_cards[i].style.boxShadow = "none";
        }

    }

    else {
        header.style.backgroundColor = "unset"
        main.style.backgroundColor = "rgba(220, 220, 220, 0.209)";
        campo_pesquisa.style.background = "white";
        btn_pesquisa.style.background = "white";
        btn_pesquisa.style.borderColor = "rgb(232, 232, 232)";
        filtro_cor.style.background = "white";
        filtro_cor.style.color = "black";
        btn_pesquisa.style.color = "black";
        btn_limpar.style.color = "black";
        html.style.color = "black";
        filtro_cor.style.border = "none";
        campo_pesquisa.style.border = "none";
        filtro_cor.style.boxShadow = "1px 1px 8px gainsboro";
        campo_pesquisa.style.border = "none";
        campo_pesquisa.style.color = "black";
        campo_pesquisa.style.boxShadow = "-1px 2px 8px gainsboro";
        botao_tema.style.color = "unset";
        tema_cor.cor = 0;
        tela_tema.innerHTML =
            `
         <i class="fa-regular fa-moon"></i>
            <h4>Modo Escuro</h4>
        `;

        for (let i = 0; i < vet_cards.length; i++) {
            vet_cards[i].style.boxShadow = "-1px 10px 8px rgb(236, 236, 236)";
            vet_cards[i].style.background = "white";
            vet_cards[i].style.border = "none";
        }
    }


    localStorage.setItem('tema_cor', JSON.stringify(tema_cor));
    inicio = false;
}