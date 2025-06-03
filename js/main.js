import { degreesArr, languageArr } from './config.js';
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
import { changeBackground, backgrounds } from './change-background.js';

let temp = degreesArr[0];
let lang = languageArr[0];
let timeUpdateInterval = null;

searchBtn.addEventListener('click', (event) => {
    getCoord(searchField.value, lang);
    getWeather(searchField.value, temp, lang);
});

searchField.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        getCoord(searchField.value, lang);
        getWeather(searchField.value, temp, lang);
    }
})

switcherDegrees.addEventListener('click', (event) => {
    const isFahrenheit = event.target.classList.contains('fahrenheit');
    const isCelsius = event.target.classList.contains('celsius');
    
    celsiusDegrees.classList.toggle('button_passive', isFahrenheit);
    fahrenheitDegrees.classList.toggle('button_passive', isCelsius);
    
    temp = degreesArr[isFahrenheit ? 1 : 0];

    if (town.textContent && town.textContent !== '') {
        const currentCity = town.textContent.split(',')[0].trim();
        getCoord(currentCity, lang);
        getWeather(currentCity, temp, lang);
    }
});

dropdownLanguage.addEventListener('click', (event) => {
    
    if (event.target.classList.contains('control-block__dropdown-language') || 
        event.target.classList.contains('control-block__item-language_active')) {
            list.hidden = !list.hidden;
            return;
    }

    if (event.target.tagName === 'A') {
        const selectedLang = event.target.textContent.toLowerCase();
        lang = selectedLang;
        document.querySelector('.control-block__item-language_active').textContent = lang.toUpperCase();
            
        updateTranslations(lang);
            
        if (town.textContent && town.textContent !== '') {
            const currentCity = town.textContent.split(',')[0].trim();
            getCoord(currentCity, lang);
            getWeather(currentCity, temp, lang);
        }
            
        list.hidden = true;

    }
});

document.addEventListener('DOMContentLoaded', (event) => {
     if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const city = await getCityByCoords(position.coords.latitude, position.coords.longitude, lang);
                if (city) {
                    searchField.value = city;
                    getCoord(city, lang);
                    getWeather(city, temp, lang);
                } else {
                    startDefaultCity();
                }
            },
            (error) => {
                console.log("Пользователь отказал в доступе или ошибка геолокации:", error);
                startDefaultCity();
            },
            { timeout: 1000 }
        );
    } else {
        startDefaultCity();
    }
});

let index = 0;

changeBackground.addEventListener('click', (event) => {
    index = (index + 1) % backgrounds.length;
    document.body.style.setProperty('--current-background',`${backgrounds[index]}`);
}) 