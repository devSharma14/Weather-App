const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionOutput = document.querySelector(".condition");
const nameOutput = document.querySelector(".name");
const icon = document.querySelector(".icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windOutput = document.querySelector(".wind");
const form = document.querySelector("#locationInput");
const search = document.querySelector(".search");
const btn = document.querySelector(".submit");
const cities = document.querySelectorAll(".city");

let cityInput = "New Delhi";

cities.forEach((city) => {
    city.addEventListener("click", (e) => {
        cityInput = e.target.innerHTML;
        fetchWeatherData();
        app.style.opacity = "1";
    });
});

form.addEventListener("submit", (e) => {
    if (search.value.length == 0) {
        alert("Please type in a city name");
    } else {
        cityInput = search.value;
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "1";
    }
    e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
    const weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const dateObject = new Date(`${day}/${month}/${year}`);
    const dayIndex = dateObject.getDay();
    return weekday[dayIndex];
}

function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=d1de1fb270924a26a67174214242302&q=${cityInput}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            temp.innerHTML = `${data.current.temp_c}°`;
            conditionOutput.innerHTML = data.current.condition.text;

            const date = data.location.localtime;
            const y = parseInt(date.substr(0, 4));
            const m = parseInt(date.substr(5, 2));
            const d = parseInt(date.substr(8, 2));
            const time = date.substr(11);

            dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}/${m}/${y}`;
            timeOutput.innerHTML = time;
            nameOutput.innerHTML = data.location.name;

            icon.src = data.current.condition.icon;

            cloudOutput.innerHTML = `${data.current.cloud}%`;
            humidityOutput.innerHTML = `${data.current.humidity}%`;
            windOutput.innerHTML = `${data.current.wind_kph}km/h`;

            let timeOfDay = "day";
            const code = data.current.condition.code;

            if (data.current.is_day === 0) {
                timeOfDay = "night";
            }

            if (code == 1000) {
                app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
                btn.style.background = "#e5ba92";
                if (timeOfDay == "night") {
                    btn.style.background = "#181e27";
                }
            } else if (code == 1063 ||
              code == 1069){
                app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
                btn.style.background = "#647d75";
                if (timeOfDay == "night") {
                    btn.style.background = "#325c80";
                } else {
                    app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
                    btn.style.background = "#4d72aa";
                    if (timeOfDay == "night") {
                        btn.style.background = "#1b1b1b";
                    }
                }
                app.style.opacity = "1";
            }
        })
        .catch(() => {
            alert("City not found, please try again");
            app.style.opacity = "1";
        });
}

fetchWeatherData();
app.style.opacity = "";
