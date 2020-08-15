let long; let lat;
let temperatureDegree = document.querySelector('.temperature-degree')
let temperatureDescription = document.querySelector('.temperature-description')
let imgLink = "https://openweathermap.org/img/wn/02d@2x.png"
const proxy = 'http://cors-anywhere.herokuapp.com/';

function fetchData(api){
    fetch(api)
        .then(response => response.json())
        .then(data => {
            // console.log(data)
            const { temp } = data.main;
            const { name } = data;
            const { main, icon } = data.weather[0]

            let imgLink = `https://openweathermap.org/img/wn/${icon}@2x.png`


            // console.log(temp, name, main, imgLink)

            document.querySelector('#temp').innerHTML = Math.round(temp - 273.15);
            document.querySelector('#main').innerHTML = main
            document.querySelector('#name').innerHTML = name
            document.getElementById('icon').setAttribute('src', imgLink)
        })
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d5c36499bdb208018abbae3b33746db6`
        fetchData(api);
    })
}

document.getElementById('search').addEventListener('click', function (event) {
    event.preventDefault()
    const cityName = document.getElementById('cityName').value;
    const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=d5c36499bdb208018abbae3b33746db6`
    // console.log(api);
    fetchData(api);
    document.getElementById('cityName').value = ''  ;
})
