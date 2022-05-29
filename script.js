// Superfluous comments are here so I can come back to this and understand what I did & 
// the thought process behind those decisions.


// Lines 7 through 38 create the first grid that loads in when the user opens the page.

const container = document.querySelector('.container') // Creates a variable corresponding to the first 'container' class div in the document the .js file is attached to.

for(let i = 0; i < 16; i++) { // While i is less than 16 (starting from zero), adding 1 after each loop...
    let row = document.createElement('div'); // Create a div, assign it to the variable row...
    row.classList.add('row'); // Add the class 'row' to that div in the HTML...
    container.appendChild(row); // Add the row to the container created in line 4...
} // Do this 16 times to create 16 rows.


let rows = document.querySelectorAll('.container > div'); // Create a NodeList of all items of class 'row'

rows.forEach(row => { // For every row in the rows NodeList...
    for(let i = 0; i < 16; i++) { //While i is less than 16 (starting from zero), adding 1 after each loop...
        let col = document.createElement('div'); // Create a div, assign it to the variable 'col'...
        col.classList.add('col'); // Add the class 'col' to every col div...
        col.style.opacity = 1;
        col.style.backgroundColor = '#FFFFFF'
        row.appendChild(col); // Add that col to the row div we're currently on...
    } // Do this 16 times per row to create 16 cells in the row.
});

let cells = document.querySelectorAll('.col'); // Create a NodeList of each element with the tag 'col'.

cells.forEach(element => { // For every element in the 'cells' NodeList...
    element.addEventListener('click', function(e) { // Add an event listener that listens for a mouse entering the element...
        if(rainbow.checked) {
                element.style.backgroundColor = randomColor();    // Change the color of that element when mouse the mouse enters the div.
            } else {
                element.style.backgroundColor = color.value;
            }
        if(opacity.checked) {        
            if(element.style.opacity < 1) {
                this.style.opacity = parseFloat(this.style.opacity) + 0.1;
            } else {
            element.style.opacity = 0.1;
        }} else if (!opacity.checked) {
            this.style.opacity = 1;
        }
        if(eraser.checked) {
            element.style.backgroundColor = '#FFFFFF';
        }
    }
)});

const eraser = document.querySelector('#eraser'); // Creates a variable for the eraser box.

const color = document.querySelector('#choice'); // Creates a variable for the color selector.

const opacity = document.querySelector('#opacity'); // Creates a variable for the gradient mode box.

const rainbow = document.querySelector('#rainbow'); // Creates a variable for the rainbow mode box.

const resize = document.querySelector('.resize'); // Creates a variable for the resize button.

const clear = document.querySelector('.clear'); // Creates a variable for the clear button.

const gridlines = document.querySelector('#gridlines') // Creates a variable for the gridlines toggle.


function rowResize(num) { // A copy of the initial for loop that creates rows. Used in resize function.
    for(let i = 0; i < num; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
    }
}

function colResize(rows, num) { // A copy of the initial for loop that creates columns/cells. Used in resize function.
    rows.forEach(row => {
        for(let i = 0; i < num; i++) {
            let col = document.createElement('div');
            col.classList.add('col');
            col.style.opacity = 1;
            col.style.backgroundColor = '#FFFFFF';
            row.appendChild(col);
        }
    });
}

function randomColor() {
    return ('#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6));
}

function reattach(newCells) {
    newCells.forEach(element => { // For every element in the 'cells' NodeList...
        element.addEventListener('click', function(e) { // Add an event listener that listens for a mouse entering the element...
            if(rainbow.checked) {
                element.style.backgroundColor = randomColor();    // Change the color of that element when mouse the mouse enters the div.
            } else {
                element.style.backgroundColor = color.value;
            }            
            if(opacity.checked) {        
                if(element.style.opacity < 1) {
                    this.style.opacity = parseFloat(this.style.opacity) + 0.1;
                } else {
                element.style.opacity = 0.1;
            }} else if (!opacity.checked) {
                this.style.opacity = 1;
            }         
            if(eraser.checked) {
                element.style.backgroundColor = '#FFFFFF';
            }
        }
    )})};

resize.addEventListener('click', function(e) {
    let amount = window.prompt('Please enter an amount to resize by: ');
    if(typeof(parseInt(amount)) == typeof(1) && amount > 0 && amount <= 100) {
        while(container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
        rowResize(amount);
        rows = document.querySelectorAll('.container > div');
        colResize(rows, amount);
        newCells = document.querySelectorAll('.col');
        reattach(newCells);
    } else {
        alert("Error: Canvas can only resize by a number between 1 and 100!")
    }
});

clear.addEventListener('click', function(e) {
    let count = 0;
    while(container.hasChildNodes()) {
        container.removeChild(container.lastChild);
        count += 1;
    }
    console.log(count);
    rowResize(count);
    rows = document.querySelectorAll('.container > div');
    colResize(rows, count);
    newCells = document.querySelectorAll('.col');
    reattach(newCells);
});

gridlines.addEventListener('click', function(e) {
    if(!gridlines.checked) {
        newCells = document.querySelectorAll('.col');
        newCells.forEach(element => {
            element.style.border = '0';
        });
    } else {
        newCells.forEach(element => {
            element.style.border = 'solid black 1px';

    })
    reattach(newCells);
}});