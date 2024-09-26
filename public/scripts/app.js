class App {
    constructor() {
        this.clearButton = document.getElementById("clear-btn");
        this.loadButton = document.getElementById("load-btn");
        this.carContainerElement = document.getElementById("cars-container");
        this.driverType = document.getElementById("driver-type");
        this.dateRent = document.getElementById("date-rent");
        this.timeRent = document.getElementById("time-rent");
        this.passanger = document.getElementById("passanger");
    }

    async init() {
        await this.loadFilter();
        console.log("ok");
        // this.run();
        // this.loadButton.onclick = this.run;
        this.loadButton.onclick = async () => {
            this.clear(); 
            await this.loadFilter();
            this.run();
        };
    }

    run = () => {
        Car.list.forEach((car) => {
            const node = document.createElement("div");
            node.classList.add("col-lg-4");
            node.innerHTML = car.render();
            this.carContainerElement.appendChild(node);
        });
    };

    async load() {
        const cars = await Binar.listCars();
        Car.init(cars);
        console.log(cars)
    }

    async loadFilter() {

        const cars = await Binar.listCars((data) => {

            const dateRentData = new Date(data.availableAt).getTime()
            const dateData = new Date(`${this.dateRent.value} ${this.timeRent.value}`).getTime()
            const checkTime = dateRentData >= dateData
            const availableAt = (this.driverType.value === 'true' && data.available ? true : false)
            const notAvailableAt = (this.driverType.value === 'false' && !data.available ? true : false)
            const passangers = data.capacity >= this.passanger.value

            if (this.driverType.value !== 'default' && this.dateRent.value !== '' && this.timeRent.value !== 'false' && this.passanger.value >= 0) {
                return (availableAt || notAvailableAt) && checkTime && passangers
            }
            else if (this.driverType.value !== 'default' && this.passanger.value > 0) {
                return (availableAt || notAvailableAt) && passangers
            }
            else if (this.dateRent.value !== '' && this.timeRent.value !== 'false' && this.passanger.value > 0) {
                return checkTime && passangers
            }
            else if (this.dateRent.value !== '' && this.timeRent.value !== 'false') {
                return checkTime
            }
            else if (this.driverType.value !== 'default') {
                return (availableAt || notAvailableAt)
            }
            else {
                return passangers
            }

        });
        console.log(cars)
        Car.init(cars);
    }

    clear = () => {
        let child = this.carContainerElement.firstElementChild;

        while (child) {
            child.remove();
            child = this.carContainerElement.firstElementChild;
        }
    };
}
