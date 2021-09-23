const main = document.querySelector(".main");
const bodyBg = document.querySelectorAll(".body-bg");
const cityInput = document.querySelector("#city-input");
const searchInput = document.querySelector("#search-input");
const cityText = document.querySelector(".result");

document.querySelector("#search-input").addEventListener("click", () => {
    const cityVal = cityInput.value.replace(/\s+/g, " ");
    if(cityVal !== ""){
        console.log(cityVal);
        fetchData(cityVal);
    }
})


window.addEventListener("load", () => {
    const date = new Date();
    const time = date.getHours()
    const dayTime = formatTime(time);
    changeTime(dayTime);
})


const fetchData = async (city) => {
    try{
        const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5fb906308c44bcdc995e80c630f9a901`)
        const fullTime = new Date((new Date().getTime()+res.data.timezone*1000))
        const timezoneText = fullTime.toISOString().slice(11,19);
        cityText.innerHTML = timezoneText;
        const timezoneNum = Number(timezoneText.slice(0,2))
        changeTime(formatTime(timezoneNum));
    }
    catch(err){
        console.log(err);
        cityText.innerHTML = "Service Not Available";
    }
}


function formatTime(time){
    if(time > 6 && time < 18){
        return "day";
    }else if(time >= 18 && time <= 20){
        return "dusk";
    }else{
        return "night";
    }
}

function changeTime(dayTime){
    switchClasses(dayTime);
    
}
function switchClasses(dayTime){
    switch(dayTime){
        case "day":
            main.classList.remove("main-dusk");
            main.classList.remove("main-night");
            main.classList.add("main-day");
            bodyBg[0].classList.remove("body-fadeout");
            bodyBg[1].classList.add("body-fadeout");
            bodyBg[2].classList.add("body-fadeout");
            break;
        case "dusk":
            main.classList.remove("main-day");
            main.classList.remove("main-night");
            main.classList.add("main-dusk");
            bodyBg[0].classList.add("body-fadeout");
            bodyBg[1].classList.remove("body-fadeout");
            bodyBg[2].classList.add("body-fadeout");
            break;
        case "night":
            main.classList.remove("main-day");
            main.classList.remove("main-dusk");
            main.classList.add("main-night");
            bodyBg[0].classList.add("body-fadeout");
            bodyBg[1].classList.add("body-fadeout");
            bodyBg[2].classList.remove("body-fadeout");
            break;
        default:
            break;
    }
}