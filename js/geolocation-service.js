import { OPEN_CAGE_API_KEY } from './config.js';
import { lat, long, mapIframe, searchBtn } from './dom-elements.js';
import { translations } from './translations.js';
import { getWeather } from './weather-service.js';

export async function getCityByCoords(lat, long, lang) {
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${OPEN_CAGE_API_KEY}`);

        const result = await response.json();

        if (result.results && result.results.length > 0){
            return result.results[0].components.city || result.results[0].components.town || result.results[0].components.village;
        }

        return null;
    } catch(err) {
        alert(err);
    }
}

export function startDefaultCity() {
    const defaultCity = 'Minsk';
    searchBtn.value = defaultCity;
    getCoord(defaultCity);
    getWeather(defaultCity);
}

export async function getCoord(city, lang) {
    try {
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${OPEN_CAGE_API_KEY}`);

        const result = await response.json();

        console.log(result);

        lat.textContent = translations[lang].latitude + result.results[0].geometry.lat.toFixed(0) + '°'  + String(result.results[0].geometry.lat).slice(3,5) + `′`;
        long.textContent = translations[lang].longitude + result.results[0].geometry.lng.toFixed(0) + '°' + String(result.results[0].geometry.lng).slice(3,5) + `′`;

        updateMap(result.results[0].geometry.lat, result.results[0].geometry.lng, city, lang);

    } catch(err) {
        alert(err);
    }
}

export function updateMap(lat, long, city, lang) {
    let yandexLang = '';
    if (lang === 'ru') yandexLang = 'ru_RU'
    if (lang === 'be') yandexLang = 'be_BY'
    if (lang === 'en') yandexLang = 'en_US'
    mapIframe.src = `https://yandex.by/map-widget/v1/?text=${city}&pt=${long},${lat}&z=12&lang=${yandexLang}`;
}