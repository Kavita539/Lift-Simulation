const liftGenerator = document.querySelector(".lift-generator");
const inputFloor = document.querySelector("#floor-input");
const inputLift = document.querySelector("#lift-input");
const inputs = document.querySelectorAll(".inputs");
const generateBtn = document.querySelector(".generate-btn");
const error = document.querySelector(".error");
const sectionContainer = document.querySelector(".lift-game-section");
const lifts = document.createElement("div");

inputs.forEach((input) => {
    input.addEventListener("keyup", () => {
        let exceedingValuesLimit = inputFloor.value <= 15 && inputLift.value <= 20;
        let valuesGreaterThanZero = inputFloor.value > 0 && inputLift.value > 0;
        if (valuesGreaterThanZero && exceedingValuesLimit) {
            generateBtn.disabled = false;
        } else {
            generateBtn.disabled = true;
        }
    });
});


const generateLiftsAndFloors = (e) => {
    console.log(":::hello");
    e.preventDefault();
    if (inputFloor.value !== "" && inputLift.value !== "") {
        liftGenerator.style.display = "none";
        generateFloors();
        generateLifts();
    } else {
        alert("Please enter the values");
    }
};

const generateLifts = () => {
    let totalLift = Number(inputLift.value);
    for (let i = 0; i < totalLift; i++) {
        const liftsBoxEl = document.createElement("div");
        liftsBoxEl.classList.add("lift");
        liftsBoxEl.setAttribute("data-status", "free");
        liftsBoxEl.setAttribute("data-current", "0");
        //lift-doors
        const liftLeftDoor = document.createElement("div");
        liftLeftDoor.classList.add("left-door");
        const liftRightDoor = document.createElement("div");
        liftRightDoor.classList.add("right-door");
        liftsBoxEl.appendChild(liftLeftDoor);
        liftsBoxEl.appendChild(liftRightDoor);
        
        const lifts = document.querySelector("#floor-0");
        lifts.append(liftsBoxEl);
    }
};

const generateFloors = () => {
    let totalFloor = Number(inputFloor.value);
    for (let i = totalFloor - 1; i >= 0; i--) {
        const divEl = document.createElement("div");
        divEl.classList.add("floor");
        
        const divFlexSides = document.createElement("div");
        divFlexSides.classList.add("flex-sides");
        divEl.appendChild(divFlexSides);
        
        const divElBtns = document.createElement("div");
        divElBtns.classList.add("btns");
        const btnUp = document.createElement("button");
        btnUp.setAttribute("class", `btn btn-up bttns-up-${i}`);
        btnUp.innerHTML = `<i class="fa-sharp fa-solid fa-caret-up"></i>`;
        btnUp.addEventListener("click", () => {
            handleLifts(i);
        });
        
        const btnDown = document.createElement("button");
        btnDown.setAttribute("class", `btn btn-down bttns-down-${i}`);
        btnDown.innerHTML = `<i class="fa-sharp fa-solid fa-caret-down"></i>`;
        btnDown.addEventListener("click", () => {
            handleLifts(i);
        });
        
        divElBtns.appendChild(btnUp);
        divElBtns.appendChild(btnDown);
        divFlexSides.appendChild(divElBtns);
        
        const floorNumber = document.createElement("h3");
        floorNumber.classList.add("floor-number");
        floorNumber.innerText = `Floor ${i}`;
        divFlexSides.appendChild(floorNumber);
        
        //lift-container
        const lifts = document.createElement("div");
        lifts.setAttribute("class", "lifts-section");
        lifts.setAttribute("id", `floor-${i}`);
        divEl.appendChild(lifts);
        sectionContainer.appendChild(divEl);
    }
};

generateBtn.addEventListener("click", generateLiftsAndFloors);