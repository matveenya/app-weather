const card = document.querySelector('.card');
const searchField = document.querySelector('.control-block__search-input');
const searchBtn = document.querySelector('.control-block__search-button');
const degrees = document.querySelector('.card-main__degrees_big');
const degreesForDays = document.querySelectorAll('.card-main__degrees_small');
const dateForDays = document.querySelectorAll('.card-main__title_small');
const town = document.querySelector('.card-header__title');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const perceivedTemperature = document.querySelector('.perceived-temperature');
const weatherDescription = document.querySelector('.weather-description');
const icon = document.querySelector('.card-main__icon_big');
const iconForDays = document.querySelectorAll('.card-main__icon_small');
const date = document.querySelector('.card-header__date');
const lat = document.querySelector('.location__latitude');
const long = document.querySelector('.location__longtitude');
const mapIframe = document.querySelector('.location__map iframe');
const switcherDegrees = document.querySelector('.control-block__switcher-degrees');
const fahrenheitDegrees = document.querySelector('.fahrenheit');
const celsiusDegrees = document.querySelector('.celsius');
const dropdownLanguage = document.querySelector('.control-block__dropdown-language');
const list = document.querySelector('.control-block__list-language');

export { card, searchField, searchBtn, degrees, degreesForDays,
    dateForDays, town, humidity, wind, perceivedTemperature, weatherDescription, icon,
    iconForDays, date, lat, long, mapIframe, switcherDegrees, fahrenheitDegrees, celsiusDegrees,
    dropdownLanguage, list
}