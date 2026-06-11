let n = [1, 2, 3, 4, 5];

const reverter = (n) => {
    let reverso = [];
    for(let i = n.length - 1; i >= 0; i--){
        reverso.push(n[i]);
    }
    return(reverso);
}

console.log(`Array: ${n}\nArray reversa: ${reverter(n)}`);

