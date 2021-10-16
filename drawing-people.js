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
    alertTitle.innerText = "Type a name or a number!"

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

function updateListItems() {
    names = [];

    let allItems = document.querySelectorAll("li");
    allItems.forEach((item) => {
        names.push(item.innerText);
    });
}

btnAdd.addEventListener("click", () => {
    const inputValue = document.querySelector("input").value;

    if(inputValue == "") {
        showMessage();
    }
    else {
        // add item to the list
        const listItem = document.createElement("li");
        ulContainer.appendChild(listItem);

        // create the text for each list item
        const listItemText = document.createElement("span");
        listItemText.classList.add("item");
        listItemText.innerText = `${inputValue}`;
        listItem.appendChild(listItemText);

        // create edit icon for each list item
        const editIcon = document.createElement("i");
        editIcon.setAttribute("class", "fas fa-edit");
        listItem.appendChild(editIcon);

        // create remove icon for each list item
        const removeIcon = document.createElement("i");
        removeIcon.setAttribute("class", "fas fa-times-circle");
        listItem.appendChild(removeIcon);

        // create input for each list item
        const inputItem = document.createElement("input");
        inputItem.setAttribute("type", "text");
        listItem.appendChild(inputItem);
        inputItem.style.display = "none";

        // add item to the names array
        names.push(inputValue);
    }

    // clear input value and set input to focus state
    document.querySelector("input").value = "";
    document.querySelector("input").focus();

    // console.log(names);

    // select all removeIcons of the list
    let removeIcons = document.querySelectorAll("i.fa-times-circle");
});

ulContainer.addEventListener("click", (e) => {
    if(e.target.classList[1] == "fa-edit") {
        let parentItem = e.target.parentElement;
        let inputItem = parentItem.lastElementChild;
        console.log(parentItem);
 
        if(inputItem.style.display == "inline-block") {
            inputItem.style.display = "none";
            parentItem.firstElementChild.style.display = "block";
        }
        else {
            inputItem.style.display = "inline-block";
            inputItem.value = parentItem.firstElementChild.textContent;
            parentItem.firstElementChild.style.display = "none";
        }
        inputItem.focus();

        updateListItems();

        inputItem.addEventListener("keypress", (e) => {
            if(e.keyCode === 13) {

                if(inputItem.value !== '') {
                    parentItem.firstElementChild.textContent = inputItem.value;
                    parentItem.firstElementChild.style.display = "block";
                    inputItem.style.display = 'none';
                } 
                else {
                    var li = inputItem.parentNode;
                    li.parentNode.removeChild(li);
                }
            }

            updateListItems();
        });
    }
    else if(e.target.classList[1] == "fa-times-circle") {
        let parentIcon = e.target.parentElement;
            parentIcon.remove();

            updateListItems();
    }
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
                    setTimeout(() => clearMessage.classList.add("show-message"), 1000);
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