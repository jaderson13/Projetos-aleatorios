document.querySelector("#zerar").onclick = () => Limpar_tela();
document.querySelector("#apagar").onclick = () => Apagar_digito();
document.querySelector("#num0").onclick = () => Exibir_digito(0);
document.querySelector("#num1").onclick = () => Exibir_digito(1);
document.querySelector("#num2").onclick = () => Exibir_digito(2);
document.querySelector("#num3").onclick = () => Exibir_digito(3);
document.querySelector("#num4").onclick = () => Exibir_digito(4);
document.querySelector("#num5").onclick = () => Exibir_digito(5);
document.querySelector("#num6").onclick = () => Exibir_digito(6);
document.querySelector("#num7").onclick = () => Exibir_digito(7);
document.querySelector("#num8").onclick = () => Exibir_digito(8);
document.querySelector("#num9").onclick = () => Exibir_digito(9);
document.querySelector("#parentese_esquerdo").onclick = () => Exibir_digito("(");
document.querySelector("#parentese_direito").onclick = () => Exibir_digito(")");
document.querySelector("#dividir").onclick = () => Exibir_caracter_especial("÷");
document.querySelector("#produto").onclick = () => Exibir_caracter_especial("x");
document.querySelector("#subtrair").onclick = () => Exibir_caracter_especial("-");
document.querySelector("#soma").onclick = () => Exibir_caracter_especial("+");
document.querySelector("#virgula").onclick = () => Exibir_virgula(",");
document.querySelector("#igual").onclick = () => Exibir_calculo();

var zerado = true;
var parentese = false;
var virgula = false;
var tela = document.querySelector("#tela");
var operador = false;
var operadores = [",", "x", "÷", "+", "-",];
var virgula_posicao = -1;

function Limpar_tela() {
    tela.innerText = "0";
    zerado = true;
    parentese = false;
    virgula = false;
    operador = false;
}

function Apagar_digito() {

    let ultimo_caracter = tela.innerText.substring(tela.innerText.length - 1);

    if (tela.innerText != "0") {

        if (ultimo_caracter == ",") { virgula = false; }

        else if (ultimo_caracter == "+" || ultimo_caracter == "-" || ultimo_caracter == "x" || ultimo_caracter == "÷") { operador = false; }

        tela.innerText = tela.innerText.substring(0, tela.innerText.length - 1);

        if (tela.innerText.length == 0) {
            tela.innerText = "0";
            zerado = true;
        }
    }

}

function Exibir_digito(digito) {

    operador = false;

    if (zerado) {
        tela.innerText = digito;
        zerado = false;
    }

    else {
        tela.innerText += digito;
    }

}

function Exibir_caracter_especial(digito) {

    if (!operador) {
        tela.innerText += digito;
        operador = true;
        zerado = false;
    }
}

function Exibir_virgula(digito) {
    let ultimo_caracter = tela.innerText.substring(tela.innerText.length - 1);

    if (digito == "," && !virgula) {

        for (let i = 1; i < operadores.length; i++) {
            if (operadores[i] == ultimo_caracter) {
                digito = "0,";
                break;
            }
        }

        tela.innerText += digito;

        virgula = true;
        zerado = false;
    }
}

function Exibir_calculo() {
    let resultado = tela.innerText;
    let troca = [".","*", "/"];

    for (let i = 0; i < troca.length; i++) {
        resultado = resultado.replaceAll(operadores[i], troca[i]);
    }
     
    tela.innerText= (eval(resultado));   
}



//function Inserir_ponto(){

//}