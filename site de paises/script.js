function Ler_dados(funcao, filtro, campo, tipo_funcao) {
    fetch('https://restcountries.com/v3.1/all')
        .then(dados => dados.json())
        .then(dados => {
            vet_paises = dados;
            if (tipo_funcao == 0) { funcao(filtro, campo); }
            else{funcao();}     
        })
}
