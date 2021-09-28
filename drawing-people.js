const btnAdd = document.querySelector("button.add");
const ulContainer = document.querySelector("ul.container-list");
const clearMessage = document.querySelector("p.draws__message");
const counterResult = document.querySelector("h2.result-counter");
const drawNames = document.querySelector("button.draw");
const clearResult = document.querySelector("button.clear");
const alertMessage = document.querySelector(".alert-message");
const alertTitle = document.querySelector("h3.alert-title");
const closeBtn = document.querySelector(".alert-message i");
const result = document.querySelector("h2.show-result");

let names = [];

function showMessage() {
    document.body.classList.add("show-bg");
    alertMessage.classList.add("show");
    alertTitle.innerText = "Type a name!"

    let timeMessage = setTimeout(() => {
        document.body.classList.remove("show-bg");
        alertMessage.classList.remove("show");
    }, 2500);    

    closeBtn.addEventListener("click", () => {
        document.body.classList.remove("show-bg");
        alertMessage.classList.remove("show");
        clearTimeout(timeMessage);
    });
}

btnAdd.addEventListener("click", () => {
    const inputValue = document.querySelector("input").value;

    if(inputValue == "") {
        showMessage();
    }
    else {
        // add item to the list
        let listItem = document.createElement("li");
        listItem.innerText = `${inputValue}`;
        ulContainer.appendChild(listItem);

        // create icon for each list item
        let removeIcon = document.createElement("i");
        removeIcon.setAttribute("class", "fas fa-times-circle");
        listItem.appendChild(removeIcon);
        
        // add item to the names array
        names.push(inputValue);
    }

    // clear input value and set input to focus state
    document.querySelector("input").value = "";
    document.querySelector("input").focus();

    console.log(names);

    // select all icons of the list
    let removeIcons = document.querySelectorAll("i.fa-times-circle");

    // remove selected item
    removeIcons.forEach((icon) => {
        icon.addEventListener("click", (e) => {
            let parentIcon = e.target.parentElement;
            parentIcon.remove();

            names = [];
            // result.innerHTML = "";

            let allItems = document.querySelectorAll("li");
            allItems.forEach((item) => {
                names.push(item.innerText);
            });
            console.log(names);
        });
    });
});

let counter = 4;
let clicked = 0;

drawNames.addEventListener("click", () => {
    if(names.length == 0) {
        showMessage();
        alertTitle.innerText = "List is empty!";
    }
    else {
        let randomNames = Math.floor(Math.random() * names.length);
        // result.innerHTML = `The winner is <span class="name-result">${names[randomNames]}</span>`;

        clicked++;
        if(clicked < 2) {
            let showCounting = setInterval(countdown, 880);

            function countdown() {                
                counterResult.innerHTML = counter;
                counter--;
                if(counter < 0) {
                    clearInterval(showCounting);                    
                    result.innerHTML = `The winner is <span class="name-result">${names[randomNames]}</span>`;  
                    counterResult.innerHTML = "";
                    setTimeout(() => clearMessage.classList.add("show-message") = "block", 1000);
                }
            }
        }        
    }
});

clearResult.addEventListener("click", () => {
    counter = 4;
    clicked = 0;
    clearMessage.classList.remove("show-message");
    counterResult.innerHTML = "";
    result.innerHTML = "";
});