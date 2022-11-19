//Main Div

const mainDiv = document.createElement('div');

// H1 Element

const h1Ele = document.createElement('h1');
h1Ele.innerText = 'Countries Basic Details';
h1Ele.setAttribute('class', 'cl-h1');

// Dropdown Element

const dropDownEle = document.createElement('select');
dropDownEle.id = 'dropdown';
dropDownEle.setAttribute('class', 'cl-dropdown');

// Submit Element

const searchEle = document.createElement('button');
searchEle.innerText = 'Search';
searchEle.setAttribute('class', 'cl-search');

// Spinner Element

const spinnerEle = document.createElement('i');
spinnerEle.setAttribute('class', 'fa-solid fa-circle-notch fa-spin fa-3x cl-spinner-ele');

// Inner Div

const mainInnerDiv = document.createElement('div');
mainInnerDiv.setAttribute('class', 'cl-maininnerdiv');

mainInnerDiv.append(dropDownEle, searchEle);

//Result Div

const resultDiv = document.createElement('div');
resultDiv.setAttribute('class', 'cl-resultdiv');

mainDiv.append(h1Ele, mainInnerDiv, spinnerEle, resultDiv);

document.body.append(mainDiv);

let countries, choosedOption;


addEventListener('DOMContentLoaded', () => {

    const optionEle = document.createElement('option');
    optionEle.innerText = '--- None ---';
    dropDownEle.append(optionEle);

    // async/await Function to get the countries name from the Restcountries API & make it as the options in a dropdown box
    const getCountriesName = async () => {

        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            countries = await response.json();

            countries.forEach((country) => {
                const optionEle = document.createElement('option');
                optionEle.innerText = country.name.common;

                dropDownEle.append(optionEle);

            })
        }
        catch (error) {
            console.log(error);
        }
    }
    getCountriesName();

})

// Function to get the choosed country basic details such as 'Country Name', 'Official Name', 'Capital', 'Population', 'Continent', 'Region' & 'Subregion'
const getCountryDetails = () => {

    resultDiv.innerHTML = '';

    const description = [, 'Country Name', 'Official Name', 'Capital', 'Population', 'Continent', 'Region', 'Subregion'];

    countries.forEach((country) => {
        try {
            if (choosedOption === country.name.common) {
                const { flags: { png: flag }, name: { common, official }, capital: [capital], population, continents, region, subregion } = country;


                [flag, common, official, capital, population, continents, region, subregion].forEach((value, index) => {

                    const resultInnerDivEle = document.createElement('div');
                    resultInnerDivEle.setAttribute('class', 'cl-resultinnerdiv');

                    if (index === 0) {
                        imgEle = document.createElement('img');
                        imgEle.src = value;
                        imgEle.setAttribute('class', 'cl-img');
                        resultInnerDivEle.append(imgEle);
                    }
                    else {
                        resultInnerDivEle.innerHTML = `<b>${description[index]} :</b> ${value}`;
                        resultInnerDivEle.style.padding = '10px';
                    }
                    resultDiv.append(resultInnerDivEle);

                    spinnerEle.style.display = 'none';
                    resultDiv.style.display = 'block';
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    })

    // Removing Event Listeners for Search button & Window
    searchEle.removeEventListener('click', clickResultFunc);
    removeEventListener('keypress', enterResultFunc);
}

// Click Listener Function for Search button
const clickResultFunc = () => {
    choosedOption = document.getElementById('dropdown').value;
    if (choosedOption == '--- None ---') {
        alert('Please choose any country & try again');
        resultDiv.innerHTML = '';
        resultDiv.style.display = 'none';
    }
    else {
        spinnerEle.style.display = 'inline-block';
        getCountryDetails();
    }
}

// Enter Key Listener Function for Dropdown box
const enterResultFunc = (e) => {
    if (e.key === 'Enter') {
        clickResultFunc();
    }
}

// Event Listeners for Dropdown box --> (Window & Search button)
dropDownEle.addEventListener('change', () => {

    searchEle.addEventListener('click', clickResultFunc);
    addEventListener('keypress', enterResultFunc);

});


