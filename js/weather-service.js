import { apiKey } from './config.js';
import {  date, icon, town, humidity, wind, 
    perceivedTemperature, weatherDescription, 
    degrees, degreesForDays, iconForDays, dateForDays } from './dom-elements.js';
import { translations } from './translations.js';

let timeUpdateInterval = null;

export async function getCityTime(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        const result = await response.json();
        return result.timezone;
    } catch(err) {
        alert(err);
    }
}

export function updateCityTime(timezoneOffset, lang) {
    if(timeUpdateInterval) clearTimeout(timeUpdateInterval);

    const nowDate = new Date();
    const utc = nowDate.getTime() + (nowDate.getTimezoneOffset() * 60000);
    const cityTime = new Date(utc + (timezoneOffset * 1000));

    date.textContent = cityTime.toLocaleString(lang, {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    timeUpdateInterval = setTimeout(() => updateCityTime(timezoneOffset, lang), 1000);
}

export async function getWeather(city, temp, lang) {
    if(!city) return;

    try {
        const timezoneOffset = await getCityTime(city);
        if(timezoneOffset === undefined) throw new Error("Failed to get time zone");

        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${temp}&lang=${lang}`);

        if(!response.ok) throw new Error(translations[lang].cityNotFound);

        const result = await response.json(); 

        updateCityTime(timezoneOffset, lang);

        console.log(result);

        const iconUrl = `https://openweathermap.org/img/wn/${result.list[0].weather[0].icon}.png`;
        icon.src = iconUrl;

        town.textContent = result.city.name + ',' + ' ' + result.city.country;
        humidity.textContent = translations[lang].humidity + result.list[0].main.humidity.toFixed(0) + '%';
        wind.textContent = translations[lang].wind + result.list[0].wind.speed + 'm/s';
        perceivedTemperature.textContent = translations[lang].feelsLike + result.list[0].main.feels_like.toFixed(0) + '°';
        weatherDescription.textContent = result.list[0].weather[0].description.toUpperCase();
        degrees.textContent = result.list[0].main.temp.toFixed(0) + '°';

        let index = 0;
        let posDay = 6;
        while(posDay <= 22){
            degreesForDays[index].textContent = result.list[posDay].main.temp.toFixed(0) + '°';
            iconForDays[index].src = `https://openweathermap.org/img/wn/${result.list[posDay].weather[0].icon}.png`;
            if(lang === 'be'){
                dateForDays[index].textContent = translations[lang].days[new Date((result.list[posDay].dt + timezoneOffset) * 1000).getDay()]
            } else {
                dateForDays[index].textContent = new Date((result.list[posDay].dt + timezoneOffset) * 1000).toLocaleDateString(lang, {weekday: 'long'});
            }
            index++;
            posDay += 8; 
        }

    } catch(err) {
        alert(err);
    }
}