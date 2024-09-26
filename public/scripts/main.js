/*
 * Contoh kode untuk membaca query parameter,
 * Siapa tau relevan! :)
 * */

let driverType = document.getElementById("driver-type");
let dateRent = document.getElementById("date-rent");
let timeRent = document.getElementById("time-rent");
let loadButton = document.getElementById("load-btn");

// driverType.addEventListener("change",driverType = driverType)
// console.log(driverType.value);
// console.log(dateRent.value);
// console.log(timeRent.value);

function checkInput(){
    if (driverType.value !== 'default' && dateRent.value !== '' && timeRent.value !== 'false') {
        console.log("non disabled")
        loadButton.disabled = false;  
    } 
    else {
        console.log("disabled")
        loadButton.disabled = true;   
    }
}

checkInput();

driverType.addEventListener("change", () => {
    checkInput();
});

dateRent.addEventListener("change", () => {
    checkInput();
});

document.getElementById("time-rent").addEventListener("change", () => {
    checkInput();
});

const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

// Coba olah data ini hehe :)
console.log(params);

/*
 * Contoh penggunaan DOM di dalam class
 * */
const app = new App();

app.loadButton.addEventListener('click', () => {
    app.clear()
    app.loadFilter().then(app.run());
})

app.init()