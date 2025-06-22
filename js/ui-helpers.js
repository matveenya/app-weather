import { translations } from './translations.js';
import {
    humidity,
    wind,
    perceivedTemperature,
    lat,
    long
} from './dom-elements.js';

export function updateTranslations(lang) {  
    if (humidity.textContent.includes('HUMIDITY') || 
        humidity.textContent.includes('ВЛАЖНОСТЬ') || 
        humidity.textContent.includes('ВІЛЬГОТНАСЦЬ')) {
        const value = humidity.textContent.split(':')[1];
        humidity.textContent = translations[lang].humidity + value;
    }
    
    if (wind.textContent.includes('WIND') || 
        wind.textContent.includes('ВЕТЕР') || 
        wind.textContent.includes('ВЕЦЕР')) {
        const value = wind.textContent.split(':')[1];
        wind.textContent = translations[lang].wind + value;
    }
    
    if (perceivedTemperature.textContent.includes('FEELS LIKE') || 
        perceivedTemperature.textContent.includes('ОЩУЩАЕТСЯ КАК') || 
        perceivedTemperature.textContent.includes('АДЧУВАЕЦЦА ЯК')) {
        const value = perceivedTemperature.textContent.split(':')[1];
        perceivedTemperature.textContent = translations[lang].feelsLike + value;
    }
    
    if (lat.textContent.includes('Latitude') || 
        lat.textContent.includes('Широта') || 
        lat.textContent.includes('Шырата')) {
        const value = lat.textContent.split(':')[1];
        lat.textContent = translations[lang].latitude + value;
    }
    
    if (long.textContent.includes('Longtitude') || 
        long.textContent.includes('Долгота') || 
        long.textContent.includes('Даўгата')) {
        const value = long.textContent.split(':')[1];
        long.textContent = translations[lang].longitude + value;
    }
}