const units = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K',
};

let currentInputUnit = 'celsius';
let currentOutputUnit = 'fahrenheit';

const convertCelsiusToFahrenheit = (value) => (value * (9/5)) + 32;

const convertCelsiusToKelvin = (value) => value + 273.15;

const convertFahrenheitToCelsius = (value) => (value - 32) * 5/9;

const convertFahrenheitToKelvin = (value) => ((value - 32) * 5/9) + 273.15;

const convertKelvinToFahrenheit = (value) => ((value - 273.15) * 9/5) + 32;

const convertKelvinToCelsius = (value) => value - 273.15;

const convert = {
    celsiustofahrenheit: convertCelsiusToFahrenheit,
    celsiustokelvin: convertCelsiusToKelvin,
    fahrenheittocelsius: convertFahrenheitToCelsius,
    fahrenheittokelvin: convertFahrenheitToKelvin,
    kelvintofahrenheit: convertKelvinToFahrenheit,
    kelvintocelsius: convertKelvinToCelsius,
};

const validateInput = (value, callback) => {
    if (!isNaN(value)) {
        return callback(parseFloat(value, 10));
    }

    return 'valor incorreto';
}

const removeClearValues = (array) => array.filter((value) => value !== '');

const responseFactory = (inputArray, outputArray) => {
    return inputArray.map((item, index) => ({
        input: inputArray[index],
        output: outputArray[index],
    }));
}

const createResponseItem = (response) => {
    const div = document.createElement('div');
    div.className = 'response';

    if (!isNaN(response.output)) {
        const value1 = document.createElement('span');
        const unit1 = document.createElement('b');
        const value2 = document.createElement('span');
        const unit2 = document.createElement('b');

        value1.innerText = `${response.input} `;
        unit1.innerText = `${units[currentInputUnit]} `;
        value2.innerText = `= ${response.output} `;
        unit2.innerText = `${units[currentOutputUnit]}`;

        div.appendChild(value1);
        div.appendChild(unit1);
        div.appendChild(value2);
        div.appendChild(unit2);

        return div;
    }

    const value = document.createElement('span');
    value.innerText = response.output;
    div.appendChild(value);

    return div;
}

const showOutput = (inputArray, outputArray) => {
    const responseArray = responseFactory(inputArray, outputArray);

    output.innerHTML = '';

    responseArray.forEach((item) => {
        output.appendChild(createResponseItem(item));
    });
}

const startConvertion = () => {
    const inputValue = input.value;

    const inputUnitOfMeasure = inputOptions.value;
    const outputUnitOfMeasure = outputOptions.value;

    const cells = inputValue.split(' ');
    const temperatures = removeClearValues(cells);

    const convertTo = convert[`${inputUnitOfMeasure}to${outputUnitOfMeasure}`];

    if (!convertTo) {
        showOutput(temperatures, temperatures);
        return;
    }

    const outputArray = temperatures.map((value) => validateInput(value, convertTo));

    showOutput(temperatures, outputArray);
}

run.addEventListener('click', startConvertion);

// Garante que os estados que guardem as unidades de
// temperatura estejam sempre atualizados
inputOptions.addEventListener('change', ({ target }) => {
    currentInputUnit = target.value;
});

outputOptions.addEventListener('change', ({ target }) => {
    currentOutputUnit = target.value;
});
