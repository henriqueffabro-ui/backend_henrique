const texto = "mestre linguiça";
const letra = "e";

const contarLetra = (texto, letra) =>  {
    let qtd = 0;
    for(let i = 0; i < texto.length; i++){
        if (texto[i] === letra){
            qtd++;
        }
    }
    return(qtd);
};

console.log(`O texto ${texto} possui ${contarLetra(texto,letra)} letras "${letra}"`);