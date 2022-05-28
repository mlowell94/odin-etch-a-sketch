// Superfluous comments are here so I can come back to this and understand what I did & 
// the thought process behind those decisions.

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
        row.appendChild(col); // Add that col to the row div we're currently on...
    } // Do this 16 times per row to create 16 cells in the row.
});

let cells = document.querySelectorAll('.col'); // Create a NodeList of each element with the tag 'col'.

cells.forEach(element => { // For every element in the 'cells' NodeList...
    element.addEventListener('mouseenter', function(e) { // Add an event listener that listens for a mouse entering the element...
        element.style.backgroundColor = 'black';    // Change the color of that element when mouse the mouse enters the div.
    }
)});

const resize = document.querySelector('.resize')

function rowResize(num) { // A copy of the initial for loop that creates rows.
    for(let i = 0; i < num; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        container.appendChild(row);
    }
}

function colResize(rows, num) {
    rows.forEach(row => {
        for(let i = 0; i < num; i++) {
            console.log('running...')
            let col = document.createElement('div');
            col.classList.add('col');
            row.appendChild(col);
        }
    });
}

function reattach(newCells) {
    newCells.forEach(element => { // For every element in the 'cells' NodeList...
        element.addEventListener('mouseenter', function(e) { // Add an event listener that listens for a mouse entering the element...
            element.style.backgroundColor = 'black';    // Change the color of that element when mouse the mouse enters the div.
        }
    )});
}

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