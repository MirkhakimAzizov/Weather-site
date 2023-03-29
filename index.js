"use strict";

const API_KEY = 'https://api.openweathermap.org/data/2.5/';
const ACCESS_KEY = 'a112f5b170614cf805801cefd3628436';
let region;

let data = [];
let fragment = new DocumentFragment;

let elList = document.querySelector(".list");
let elForm = document.querySelector("#form");

function dataBase(region) {

    fetch(`${API_KEY}weather?q=${region}&units=metric&APPID=${ACCESS_KEY}`).then(res => {
        return res.json();
    }).then((database) => {
        data = database;
        renderUi(data);
    });

}


function renderUi(obj) {

    let elItem = document.createElement("li");
    elItem.setAttribute("class", "card w-100 text-light bg-info")

    elItem.innerHTML = `

        <h2 class="card-title ps-3 pt-2">${obj.name}</h2>
        <div class="card-body p-3 d-flex justify-content-between align-items-center">
            <span class="text-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-cloud" viewBox="0 0 16 16">
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                </svg>
                <p>${obj.weather[0].main}</p>
            </span>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <h3 class="title">${obj.main.temp}°C</h3>
            </div>
            <div>
                <span class="card-text">Humidity: ${obj.main.humidity}</span>
                <span class="card-text">Pressure: ${obj.main.pressure}</span>
                <span class="card-text">Wind: ${obj.wind.speed}</span>
            </div>
        </div>

    `
    fragment.append(elItem);
    elList.append(fragment);
}

let arrRegion = ['Andijan', 'Ferghana', 'Namangan', 'Tashkent', 'Samarkand', 'Bukhara', 'Jizzakh', 'Navai'];

arrRegion.sort((a, b) => {

    if (a > b) {
        return 1;
    } else if (a < b) {
        return -1;
    } else {
        return 0;
    }

});

arrRegion.forEach((item) => {

    region = item;
    dataBase(region);

});

elForm.addEventListener("submit", (evt) => {

    evt.preventDefault();

    let value = evt.target.mainSearch.value.trim();
    if (value && value != "") {

        elList.innerHTML = '';
        region = value;
        console.log(region);
        dataBase(region);

    } else {

        arrRegion.forEach((item) => {

            region = item;
            dataBase(region);

        });

    }


});