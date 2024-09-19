let nums = document.querySelectorAll(".num")
let writingSpace = document.querySelector(".input-space")
let clearBtn = document.querySelector(".clear")
let ops = document.querySelectorAll(".operator")
let numInp = ""
let numOrig = 0
let op = ""



// function codeCheck(){
//     console.log(`numInp = ${numInp}`)
//     console.log(`numOrig = ${numOrig}`)
//     console.log(`operator = ${op}`)
// }

function clearOne(textStr) {
    if (textStr.length > 0) {
        return textStr.slice(0, -1); 
    }
    return textStr; 
}

function checkCAC(){
    if (writingSpace.innerText != ""){
        clearBtn.innerText = "C"
    } else if (writingSpace.innerText == ""){
        clearBtn.innerText = "AC"
    }
}

function checkForDot() {
    const pointButton = document.querySelector(".point");
    
    if (writingSpace.innerText.includes(".")) {
        pointButton.disabled = true;
    } else {
        pointButton.disabled = false;
    }
}

function update(){
    writingSpace.innerText = numInp
}

function checkForDone(){
    if (op == "done") {
        numInp = ""
        update()
    }
}


//the code begins here. all the functions used are given above.

//clicking numbers

// Add event listener for keyboard input


document.addEventListener("keydown", (event) => {
    // Check if the pressed key is a number between 0 and 9
    if (event.key >= "0" && event.key <= "9") {
        numInp += String(event.key); // Append the key (number) to the input
        update(); // Update the display
        checkCAC(); // Update the AC/C button state
        checkForDot(); // Check for dot
        //codeCheck(); // Debug log
    } else if (event.key === "Backspace") {
        numInp = clearOne(numInp)
        update()
    } else if (event.key === "Delete") {
        numInp = ""
        update()
        checkCAC()
        checkForDot()
    } else if (event.key === "/") {
        op = "/"
        numOrig = parseFloat(numInp)
        numInp = ""
        update()
    } else if (event.key === "*") {
        op = "*"
        numOrig = parseFloat(numInp)
        numInp = ""
        update()
    } else if (event.key === "+") {
        op = "+"
        numOrig = parseFloat(numInp)
        numInp = ""
        update()
    } else if (event.key === "-") {
        op = "-"
        numOrig = parseFloat(numInp)
        numInp = ""
        update()
    } else if (event.key === "Enter") {
        if (op == "+"){
            numOrig += parseFloat(numInp)
        } else if (op == "-"){
            numOrig -= parseFloat(numInp)
        } else if (op == "/"){
            numOrig /= parseFloat(numInp)
        } else if (op = "*"){
            numOrig *= parseFloat(numInp)
        }
    
    
        numInp = String(numOrig)
        op = "done"
        update()
        numOrig = 0
    } else if (event.key === "%") {
        numOrig = parseFloat(numInp)
        numInp = String(((numOrig)/100))
        //codeCheck()
        update()
        numOrig = 0
    }
});



nums.forEach((num) => {
    num.addEventListener("click", () => {
        if (op === "done") {
            numInp = "";
            op = ""; 
        }
        numInp += num.innerText;
        update();
        checkCAC();
        checkForDot();
        //codeCheck();
    });
});

//C/AC functionality 

clearBtn.addEventListener("click", () => {
    numInp = ""
    update()
    checkCAC()
    checkForDot()
    //codeCheck()
})

//additive-inverse operator

document.querySelector(".add-inv").addEventListener("click", () => {
    numOrig = (parseFloat(numInp))*(-1)
    numInp = String(numOrig)
    console.log("clicked")
    // codeCheck()
    
    update()
    numOrig = 0
})

// const plusMinusButton = document.querySelector(".add-inv");

// if (plusMinusButton) {
//     plusMinusButton.addEventListener("click", () => {
//         console.log("clicked");
//         numOrig = (parseFloat(numInp))*(-1);
//         numInp = String(numOrig);
//         // codeCheck();
//         update();
//         numOrig = 0;
//     });
// } else {
//     console.error("add-inv button not found");
// }

//percentage operator

document.querySelector(".percentage").addEventListener("click", () => {
    numOrig = parseFloat(numInp)
    numInp = String(((numOrig)/100))
    //codeCheck()
    update()
    numOrig = 0
})

//division operator

document.querySelector(".divide").addEventListener("click", () => {
    op = "/"
    numOrig = parseFloat(numInp)
    numInp = ""
    update()
    //codeCheck()
})

//multiply operator

document.querySelector(".multiply").addEventListener("click", () => {
    op = "*"
    numOrig = parseFloat(numInp)
    numInp = ""
    update()
    //codeCheck()
})

//subtraction operator

document.querySelector(".subtract").addEventListener("click", () => {
    op = "-"
    numOrig = parseFloat(numInp)
    numInp = ""
    update()
    //codeCheck()
})

//addition operator

document.querySelector(".add").addEventListener("click", () => {
    op = "+"
    numOrig = parseFloat(numInp)
    numInp = ""
    update()
    //codeCheck()
})

//smooth operator ;)

document.querySelector(".equals").addEventListener("click", () => {


    if (op == "+"){
        numOrig += parseFloat(numInp)
    } else if (op == "-"){
        numOrig -= parseFloat(numInp)
    } else if (op == "/"){
        numOrig /= parseFloat(numInp)
    } else if (op = "*"){
        numOrig *= parseFloat(numInp)
    }


    numInp = String(numOrig)
    op = "done"
    update()
    numOrig = 0
    //codeCheck()
})

function updateInputSpace() {
    const inputSpace = document.querySelector('.input-space');
    inputSpace.textContent = numInp;
    
    // Create a temporary span to measure the text width
    const tempSpan = document.createElement('span');
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.style.fontSize = getComputedStyle(inputSpace).fontSize;
    tempSpan.textContent = numInp;
    document.body.appendChild(tempSpan);
    
    const textWidth = tempSpan.offsetWidth;
    document.body.removeChild(tempSpan);
    
    if (textWidth > inputSpace.offsetWidth) {
        inputSpace.scrollLeft = textWidth - inputSpace.offsetWidth;
    } else {
        inputSpace.scrollLeft = 0;
    }
}

// Replace your existing update function with this
function update() {
    updateInputSpace();
    checkCAC();
    checkForDot();
}

// Add this to ensure the input space updates on window resize
window.addEventListener('resize', updateInputSpace);