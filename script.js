document.addEventListener("DOMContentLoaded", () => {


    //Vars

    const changeScheme = document.querySelector(".calculator__top__clrScheme"),
    changeSchemeActive = document.querySelector(".calculator__top__clrScheme-active"),
    sunIcon = document.querySelector("#sun"),
    moonIcon = document.querySelector("#moon"),
    history = document.querySelector(".calculator__top_hist"),

    equation = document.querySelector(".calculator__top__result__equation"),
    result = document.querySelector(".calculator__top__res"),
    keyboard = document.querySelector(".calculator__bottom__keyboard");

    let counter = 0;
    let darkMode;

    //Setting Color scheme from Local Storage

    if (localStorage.getItem("colorScheme")) {
        if (localStorage.getItem("colorScheme") === "true") {
            darkMode = true;
        } else {
            darkMode = false;
        }
    } else {
        darkMode = false;
    }

    changeColorScheme(darkMode, changeSchemeActive, sunIcon, moonIcon, history);

    localStorage.clear();

    if (darkMode) {
        localStorage.setItem("colorScheme", false)
    } else {
        localStorage.setItem("colorScheme", true)
    }


    // Changing color scheme by user click

    changeScheme.addEventListener("click", () => {

        changeColorScheme(darkMode, changeSchemeActive, sunIcon, moonIcon, history);

    })


    // Saving Result of equation to Local Storage

    function saveResult(lastEquation, lastResult) {
        counter++;
        localStorage.setItem(`Equation: ${counter}`, lastEquation);
        localStorage.setItem(`Result: ${counter}`, lastResult);
    }


    // Get previous equation and result from Local Storage

    history.addEventListener("click", () => {
        if (counter - 1 !== 0 ) {
            equation.textContent = localStorage.getItem(`Equation: ${counter - 1}`)
            result.textContent = localStorage.getItem(`Result: ${counter - 1}`);

            localStorage.removeItem(`Equation: ${counter}`);
            localStorage.removeItem(`Result: ${counter}`);

            console.log(counter)

            counter--;
        }

        
    })


    // Add values to equation from keyboard

    keyboard.addEventListener("click", e => {

        if (e.target.tagName === "BUTTON") {
            updateEqution(e.target.id)
        }

    })


    // Equation Line logic
    function updateEqution (arg) {

        // Allow to add only number and signs to equation line
        if (arg !== "AC" && arg !== "+/-" && arg !== "=") {
            equation.textContent += arg;
        }

        // Clear equation line
        if (arg === "AC") {
            equation.textContent = "";
        }

        // Change last equation number sign to oposite
        if (arg === "+/-" ){
            sign = "-";

            let arr = equation.outerText.split(" ").reverse();

            let lastNum = arr.find(Number);

            if (lastNum[0] !== "-") {
                console.log(lastNum)
            
                arr[arr.indexOf(lastNum)] = `${sign}${lastNum}`;
            } else {

                arr[arr.indexOf(lastNum)] = `${lastNum.slice(1)}`;
            }
            
            equation.textContent = arr.reverse().join(" ");
        }


        // Calculates equation 
        if (arg === "=") {

            let res = eval(equation.outerText.split("").map(x => {
                if (x === "×") {
                    return "*"
                } else if (x === "÷") {
                    return "/"
                } else {
                    return x
                }
            }).join(""));


            // Checks if result is with floating point
            if (!Number.isInteger(res)) {
                result.textContent = res.toFixed(2);
            }

            result.textContent = res;

            saveResult(equation.outerText, res);
        }
        
    }


    // Color scheme changing logic

    function changeColorScheme (isChecked, active, sunIcon, moonIcon, history) {

        if (isChecked) {
            active.style.transform = "translateX(54px)";
            darkMode = false;

            sunIcon.src = "img/sun_unactive.png";
            moonIcon.src = "img/moon_active.png";
            history.src = "img/History_light.png";

            localStorage.setItem("colorScheme", true);

            document.querySelector("body").classList.add("dark-mode");
        } else {
            active.style.transform = "translateX(0px)";
            darkMode = true;

            sunIcon.src = "img/sun_active.png"
            moonIcon.src = "img/moon_unactive.png";
            history.src = "img/History_gray.png";

            localStorage.setItem("colorScheme", false);

            document.querySelector("body").classList.remove("dark-mode");
        }

    }

})