const range = (inicio, fim) => {
    let numeros = [];
    while(inicio <= fim){
        numeros.push(inicio);
        inicio++;
    }
    return(numeros);
}

const soma = (array) => {
    let total = 0;

    for(let i = 0; i < array.length; i++){
        total+= array[i];
        
    }
    return(total);
}

console.log(range(1,10));
console.log(soma(range(1,10)));
