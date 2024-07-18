let quantEl = document.getElementById("quantity-select")


//---------------- Change the drop down menus for each quantity ----------------//
let unitIn = document.getElementById("unit-in")
let unitOut = document.getElementById("unit-out")

quantEl.addEventListener('change', () => {
    if (quantEl.value === "length") {
        unitIn.innerHTML = unitOut.innerHTML = `<option value="metre">Metre (m)</option>
                                                <option value="kilometre">Kilometre (km)</option>
                                                <option value="centimetre">Centimetre (cm)</option>
                                                <option value="millimetre">Millimetre (mm)</option>
                                                <option value="micrometre">Micrometre (μm)</option>
                                                <option value="nanometre">Nanometre (nm)</option>
                                                <option value="foot">Foot (ft)</option>
                                                <option value="inch">Inch (″)</option>
                                                <option value="yard">Yard (yd)</option>`
    } else if (quantEl.value === "volume") {
        unitIn.innerHTML = unitOut.innerHTML = `<option value="litre">Litre (L)</option>
                                                <option value="millilitre">Millilitre (mL)</option>
                                                <option value="gallon">Gallon (gal)</option>
                                                <option value="pint">Pint (pt)</option>
                                                <option value="cubic metre">Cubic Metre (m&sup3;)</option>
                                                <option value="cubic centimetre">Cubic Centimetre (cm&sup3;)</option>
                                                <option value="cubic millimetre">Cubic Millimetre (mm&sup3;)</option>`
    } else if (quantEl.value === "mass") {
        unitIn.innerHTML = unitOut.innerHTML = `<option value="kilogram">Kilogram (kg)</option>
                                                <option value="gram">Gram (g)</option>
                                                <option value="milligram">Milligram (mg)</option>
                                                <option value="tonne">Tonne (t)</option>
                                                <option value="pound">Pound (lb)</option>
                                                <option value="ounce">Ounce (oz)</option>
                                                <option value="stone">Stone (st.)</option>`
    } else if (quantEl.value === "time") {
        unitIn.innerHTML = unitOut.innerHTML = `<option value="second">Second (s)</option>
                                                <option value="minute">Minute (min)</option>
                                                <option value="hour">Hour (Hr)</option>
                                                <option value="day">Day (d)</option>
                                                <option value="week">Week</option>
                                                <option value="month">Month</option>
                                                <option value="year">Year</option>`
    } else if (quantEl.value === "temperature") {
        unitIn.innerHTML = unitOut.innerHTML = `<option value="celsius">Celsius (°C)</option>
                                                <option value="fahrenheit">Fahrenheit (°F)</option>
                                                <option value="kelvin">Kelvin (K)</option>`
    }
    updateBackgroundGradient()
    performConversion()
})

quantEl.dispatchEvent(new Event('change'))


//---------------- Unit Conversions ---------------- //

// Create an object for each conversion
const conversionFactors = {
    length: {
        metre: 1,
        kilometre: 1e-3,
        centimetre: 1e2,
        millimetre: 1e3,
        micrometre: 1e6,
        nanometre: 1e9,
        foot: 3.28084,
        inch: 39.3701,
        yard: 1.09361
    },
    volume: {
        litre: 1,
        millilitre: 1e3,
        gallon: 0.264172,
        pint: 2.11338,
        "cubic metre": 1e-3,
        "cubic centimetre": 1e3,
        "cubic millimetre": 1e6
    },
    mass: {
        kilogram: 1,
        gram: 1e3,
        milligram: 1e6,
        tonne: 1e-3,
        pound: 2.20462,
        ounce: 35.274,
        stone: 0.157473
    },
    time: {
        second: 1,
        minute: 1/60,
        hour: 1/3600,
        day: 1/86400,
        week: 1/604800,
        month: 1/2.628e6,
        year: 1/3.154e7
    },
    temperature: {
        celsius: {
            fahrenheit: (value) => (value * 9/5) + 32,
            kelvin: (value) => value + 273.15
        },
        fahrenheit: {
            celsius: (value) => (value - 32) * 5/9,
            kelvin: (value) => (value - 32) * 5/9 + 273.15
        },
        kelvin: {
            celsius: (value) => value - 273.15,
            fahrenheit: (value) => (value - 273.15) * 9/5 + 32
        }
    }
};

  // function to convert from one unit to another
  function convert(quantity, fromUnit, toUnit, value) {
    if (quantity === "temperature") {
        return conversionFactors[quantity][fromUnit][toUnit](value);
    } else {
        const baseValue = value / conversionFactors[quantity][fromUnit];
        return (baseValue * conversionFactors[quantity][toUnit]);
    }
}

let inputEl = document.getElementById("num-input") // Left Number
let outputEl = document.getElementById("num-output") // Right Number

// Function to display the converted unit
function performConversion() {
    const quantity = quantEl.value;
    const fromUnit = unitIn.value;
    const toUnit = unitOut.value;
    const value = parseFloat(inputEl.value);
    const convertedValue = convert(quantity, fromUnit, toUnit, value);

    try {
        const convertedValue = convert(quantity, fromUnit, toUnit, value);
        outputEl.value = convertedValue;
    } catch (error) {
        outputEl.value = 'Error';
    }
}

// Converts units in real time
inputEl.addEventListener('input', performConversion);
unitIn.addEventListener('change', performConversion);
unitOut.addEventListener('change', performConversion);

// Update background depending on quantity selected
let mainEl = document.querySelector(".main")

function updateBackgroundGradient() {
    mainEl.classList.remove("gradient-length", "gradient-volume", "gradient-mass", "gradient-time", "gradient-temperature");
    
    if (quantEl.value === "length") {
        mainEl.classList.add("gradient-length");
    } else if (quantEl.value === "volume") {
        mainEl.classList.add("gradient-volume");
    } else if (quantEl.value === "mass") {
        mainEl.classList.add("gradient-mass");
    } else if (quantEl.value === "time") {
        mainEl.classList.add("gradient-time");
    } else if (quantEl.value === "temperature") {
        mainEl.classList.add("gradient-temperature");
    }
}