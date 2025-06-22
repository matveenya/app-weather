import { DEGREES_ARR, LANGUAGE_ARR } from './config.js';
import { translations } from './translations.js';
import { getWeather, getCityTime, updateCityTime } from './weather-service.js';
import { getCoord, updateMap, getCityByCoords, startDefaultCity } from './geolocation-service.js';
import {
    card,
    searchField,
    searchBtn,
    degrees,
    degreesForDays,
    dateForDays,
    town,
    humidity,
    wind,
    perceivedTemperature,
    weatherDescription,
    icon,
    iconForDays,
    date,
    lat,
    long,
    mapIframe,
    switcherDegrees,
    fahrenheitDegrees,
    celsiusDegrees,
    dropdownLanguage,
    list
} from './dom-elements.js';

import { updateTranslations } from './ui-helpers.js';
import { changeBackgroundButton, backgrounds } from './change-background.js';

let temperature = DEGREES_ARR[0];
let lang = LANGUAGE_ARR[0];
let timeUpdateInterval = null;

function updateCiteWeatherAndCoord(){
    const currentCity = town.textContent.split(',')[0].trim();
    getCoord(currentCity, lang);
    getWeather(currentCity, temperature, lang);
}

searchBtn.addEventListener('click', () => {
    getCoord(searchField.value, lang);
    getWeather(searchField.value, temperature, lang);
});

searchField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        getCoord(searchField.value, lang);
        getWeather(searchField.value, temperature, lang);
    }
})

switcherDegrees.addEventListener('click', (event) => {
    const isFahrenheit = event.target.classList.contains('fahrenheit');
    const isCelsius = event.target.classList.contains('celsius');
    
    celsiusDegrees.classList.toggle('button_passive', isFahrenheit);
    fahrenheitDegrees.classList.toggle('button_passive', isCelsius);
    
    temperature = DEGREES_ARR[isFahrenheit ? 1 : 0];

    if (town.textContent && town.textContent !== '') {
        updateCiteWeatherAndCoord()
    }
});

dropdownLanguage.addEventListener('click', (event) => {
    if (event.target.classList.contains('control-block__dropdown-language') || 
        event.target.classList.contains('control-block__item-language_active')) {
            list.hidden = !list.hidden;
            return;
    }

    if (event.target.tagName === 'A') {
        lang = event.target.textContent.toLowerCase();
        document.querySelector('.control-block__item-language_active').textContent = lang.toUpperCase();
            
        updateTranslations(lang);
            
        if (town.textContent) {
            updateCiteWeatherAndCoord()
        }
            
        list.hidden = true;

    }
});

document.addEventListener('DOMContentLoaded', (event) => {

     if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition( async (position) => {
                const city = await getCityByCoords(position.coords.latitude, position.coords.longitude, lang);
                if (city) {
                    searchField.value = city;
                    getCoord(city, lang);
                    getWeather(city, temperature, lang);
                } else {
                    startDefaultCity();
                }
            }, (error) => {
                console.log('Пользователь отказал в доступе или ошибка геолокации:', error);
                startDefaultCity();
            },
            { timeout: 1000 }
        );
    } else {
        startDefaultCity();
    }
});

let indexBackgroundChange = 0;

changeBackgroundButton.addEventListener('click', (event) => {
    indexBackgroundChange = (indexBackgroundChange + 1) % backgrounds.length;
    document.body.style.setProperty('--current-background',`url(${backgrounds[indexBackgroundChange]})`);
}) 