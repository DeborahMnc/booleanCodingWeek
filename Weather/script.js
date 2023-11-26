const htmlElement = document.documentElement
const weatherIcon = document.querySelector('.weather-icon')
const weatherLocation = document.querySelector('.weather-location')
const weatherTemperature = document.querySelector('.weather-temperature')
const descriptionElement = document.querySelector('.description')

navigator.geolocation.getCurrentPosition(onSuccess, onError)

function onSuccess (data) {
    console.log(data)

    const lon = data.coords.longitude
    const lat = data.coords.latitude

    const endpoint = 'https://api.openweathermap.org/data/2.5/weather'
    const appid = '45d4dd609436892f7599b5470daff3c7'
    const units = 'metric'
    const lang = 'en'
    const url = `${endpoint}?appid=${appid}&lon=${lon}&lat=${lat}&units=${units}`

    console.log(url)
    fetch(url)
        .then(function(res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)

            const iconCode = data.weather[0].icon
            const description = data.weather[0].description
            const temp = Math.floor(data.main.temp)

            weatherIcon.src = `images/${iconCode}.png`
            weatherIcon.alt = description 

            weatherLocation.innerText = data.name

            weatherTemperature.innerText = `${temp}°`
            descriptionElement.innerText = getDescription(iconCode)

            htmlElement.classList.remove('js-loading')
        })

}

function onError (error) {
    console.error(error)
}

const descriptions = {
    '01d': 'Remember to apply suncream!',
    '01n': 'Good night!',
    '02d': 'Variable...',
    '02n': 'Beware werewolves...',
    '03d': 'Perfect lighting for photos!',
    '03n': 'Sleep well :)',
    '04d': 'Today: a case of the classic British overcast sky :)',
    '04n': 'So cloudy, you won\'t even see the moon!',
    '09d': 'You might need a brolly.',
    '09n': 'Cover up well today',
    '10d': 'You\'ll need two umbrellas',
    '10n': 'Don\'t expose bare skin to the sun!',
    '11d': 'Wear rubber boots!',
    '11n': 'Might be one or two sparks in the sky',
    '13d': 'Weather for snow-men and snow-angels.',
    '13n': 'Perfect night to be under the stars outside!',
    '50d': 'Fog lights should be on!',
    '50n': 'Drive carefully!',
}

function getDescription(iconCode) {
    return descriptions[iconCode]
}