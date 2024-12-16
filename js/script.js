const d = new Date();
let searchInput= document.querySelector("#search");

index=d.getDay();
console.log(index);

j=d.getMonth();
k = d.getDate();

let nextDay=index+1;
let afterNextDay=index+2;
if((index==5) ){
    afterNextDay=0;
}
if((index==6)){
    nextDay=0;
    afterNextDay=1;
}
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december"
];



const apiKey = "e13cd8d2dff349cfbda63005241612";

async function apiWeather() {
    let response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=e13cd8d2dff349cfbda63005241612&q=London&days=3&aqi=no&alerts=no', {
        method: "GET",
    })
    let data = await response.json()
  
    displayWeather(data)
}
apiWeather()


async function search(){
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=e13cd8d2dff349cfbda63005241612&q=${searchInput.value}&days=3`)
    let dataSearch = await response.json()
    displayWeather(dataSearch)

}
searchInput.addEventListener("input",search)


function displayWeather(data) {
    let cartona = `         <div class="row ">
                    <!-- Weather Forecast -->
                    <div class="col-md-4">
                        <div class="weather-forecast">
                            <div class="weather-header d-flex justify-content-between p-2">
                                <div class="day">${weekDays[index]}</div>
                                <div class="date">${k +" " +months[j]}</div>
                            </div>
                            <div class="weather-content p-4">
                                <div class="city fs-2">${data.location.name}</div>
                                <div class="degree-num display-1 fw-bold ">
                                    
                                  ${data.current.temp_c}&deg;C
                                    <div class="weather-img">
                                        <img src="${data.current.condition.icon}" alt="Partly cloudy sky">
                                    </div>
                                </div>
                                <div class="weather-status mb-2 py-3">${data.current.condition.text}</div>
                                <span class="px-2"><i class="fa-solid fa-umbrella"></i> 20%</span>
                                <span class="px-2"><i class="fa-solid fa-wind"></i> 18 km/h</span>
                                <span class="px-2"><i class="fa-solid fa-compass"></i> East</span>
                            </div>
                        </div>
                    </div>
                    <!-- Next Days -->
                    <div class="col-md-4">
                        <div class="next-days">
                            <div class="next-days-header p-2">
                                <div class="day">${weekDays[nextDay]}</div>
                            </div>
                            <div class="next-days-content">
                                <div class="days-img py-4">
                                    <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="Partly cloudy">
                                </div>
                                <div class="days-degree fs-3 fw-bold">${data.forecast.forecastday[1].day.maxtemp_c}&deg;C</div>
                                <span class="fs-4 opacity-75">${data.forecast.forecastday[1].day.mintemp_c}&deg;C</span>
                                <div class="weather-status mb-2 mt-5">${data.current.condition.text}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="next-days" id="third-card">
                            <div class="next-days-header p-2">
                                <div class="day">${weekDays[afterNextDay]}</div>
                            </div>
                            <div class="next-days-content">
                                <div class="days-img py-4">
                                    <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="Cloudy">
                                </div>
                                <div class="days-degree fs-3 fw-bold">${data.forecast.forecastday[2].day.maxtemp_c}&deg;C</div>
                                <span class="fs-4 opacity-75">${data.forecast.forecastday[2].day.mintemp_c}&deg;C</span>
                                <div class="weather-status mb-2 mt-5">Cloudy</div>
                            </div>
                        </div>
                    </div>
                </div>`

    document.querySelector('.forecast').innerHTML = cartona
}
