

let valorActual = 0;
let buffer = "0";

let operadorAnterior = null;

const historialOperaciones = []

const pantalla = document.querySelector(".calc-numbers");
const listaOperaciones = document.getElementById("historial")
const calcular = document.getElementById('calcular')
console.log('ψ(._. )>', calcular)

document.querySelector('.calculator-buttons').addEventListener("click", function (event) {
    buttonClick(event.target.innerHTML);
});

calcular.addEventListener("dblclick", function () {
    alert('Solo necesitas un click!... Refresca(AC) y vuelve a probar')
})

const buttonClick = (value) => {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    refrescarPantalla();
}

const handleSymbol = (value) => {
    switch (value) {
        case "AC":
            buffer = "0";
            valorActual = 0;
            operadorAnterior = null;
            historialOperaciones.length = 0;
            calcular.disabled = false;
            refrescarHistorial()
            break;
        case "=":
            if (operadorAnterior === null) {
                return;
            }
            operacionContinua(parseInt(buffer));
            buffer = "" + valorActual;
            operadorAnterior = "=";
            valorActual = 0;
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";
            }
            else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        default:
            handleMath(value);
            break;
    }
}

const handleNumber = (value) => {
    console.log('😎😎',operadorAnterior);
    if (operadorAnterior === '=') {
        buffer = ""
        operadorAnterior = null
    }
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;
    }
}

const handleMath = (value) => {
    const internalBuffer = parseInt(buffer);

    if (valorActual === 0) {
        valorActual = internalBuffer;
    } else {
        operacionContinua(internalBuffer);
    }

    operadorAnterior = value;

    buffer = "0";
}

const operacionContinua = (bufferInterno) => {
    const valorAnterior = valorActual
    if (operadorAnterior === "+") {
        valorActual += bufferInterno;
    } else if (operadorAnterior === "-") {
        valorActual -= bufferInterno;
    } else if (operadorAnterior === "x") {
        valorActual *= bufferInterno;
    } else {
        valorActual /= bufferInterno;
    }
    if (operadorAnterior) {
        historialOperaciones.push(`${valorAnterior} ${operadorAnterior} ${bufferInterno} = ${valorActual}`)
        refrescarHistorial()
    }
}

const refrescarPantalla = () => {
    pantalla.value = buffer;

}

const refrescarHistorial = () => {
    listaOperaciones.innerHTML = historialOperaciones.map(operacion => `<li>${operacion}</li>`).join('')
}