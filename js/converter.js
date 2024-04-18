const types = [
    {nom: "Celsius", ratio: 1, constante: 0, symbole: "°C"},
    {nom: "Fahrenheit", ratio: 1.8, constante: 32, symbole: "°F"},
    {nom: "Kelvin", ratio: 1, constante: 273.15, symbole: "K"}
];

function convertir(temperature, from, to) {
    const fromType = types.find(type => type.nom === from);
    const toType = types.find(type => type.nom === to);
    // Ramene le from en Celcius
    const celcius = (temperature - fromType.constante) / fromType.ratio;
    // Converti le nouveau celcius dans la forme souhaitée
    const result = (celcius * toType.ratio) + toType.constante;
    return result.toFixed(1) + toType.symbole;
}

onChange = (event) => {
    event.preventDefault();
    const temperature = document.getElementById("temperature").value;
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    document.getElementById("result").textContent = convertir(temperature, from, to);
}   

// Event listeners
document.getElementById("from").addEventListener("change", onChange);
document.getElementById("to").addEventListener("change", onChange);
document.getElementById("temperature").addEventListener("change", onChange);
document.getElementById("temperature").addEventListener("keyup", onChange);