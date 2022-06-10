const sum = (a, b) => {
    if (a && b) {
        return a + b;
    }

    throw new Error('invalid argument');
}

try { console.log(sum(5)) }
catch (error) {
    console.log("sdxsds")
}
