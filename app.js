//Variable declarations
const myGrid = document.getElementById('myGrid'),
    my$Grid = $('#myGrid'),
    reset = document.getElementById('reset'),
    form1 = document.querySelector('.form-1'),
    resultWrapper = document.querySelector('.result-wrapper'),
    form22 = $('.form-2-2'),
    checkbox = $('.eraser-checkbox'),
    resetStyleBtn = $('#reset-style-btn'),
    eraseAllBordersBtn = $('.erase-all-borders-btn'),
    topBrd = $('#top-brdr'),
    leftBrd = $('#left-brdr'),
    rightBrd = $('#right-brdr'),
    btmBrd = $('#bottom-brdr'),
    colorChoice1 = $('#colorChoice'),
    colorChoice2 = $('#colorChoice2'),
    recentColors1 = $('.recent-colors-1'),
    recentColors2 = $('.recent-colors-2'),
    save = $('#save');
let color = document.getElementById('colorChoice').value,
    color2 = document.getElementById('colorChoice2').value,
    gridheight = document.getElementById('gridheight').value,
    gridwidth = document.getElementById('gridwidth').value,
    eraserIsActive = false,
    canvasIsOn = false,
    topBrdIsClicked = false,
    leftBrdIsClicked = false,
    rightBrdIsClicked = false,
    btmBrdIsClicked = false,
    newColor = '';


//"Delete Canvas" function
function deleteCanvas() {
    while (myGrid.firstChild) {
        myGrid.removeChild(myGrid.firstChild);
    }
}

// "Delete previous canvas & create new" function
function makeGrid(width, length) {
    let row, cell, i, j;

    deleteCanvas();

    // open loop to insert table row
    for (i = 0; i < length; i++) {
        // append table row and set row attribute
        row = myGrid.insertRow(myGrid.rows.length);
        row.setAttribute('id', 'myTr');
        // open loop to insert table cells to the new row and set cell attribute
        for (j = 0; j < width; j++) {
            cell = row.insertCell(j);
            cell.setAttribute('id', 'myTd');
            cell.classList.add('bottom-border');
            cell.classList.add('right-border');
        }
    }
}

// on submit -- get the user's inputs, inform him about the width & height of the canvas he has chosen and create canvas
form1.addEventListener('submit', function (e) {
    let gridheight = document.getElementById('gridheight').value;
    let gridwidth = document.getElementById('gridwidth').value;

    //reveal result section
    resultWrapper.classList.remove('hidden');

    if (gridheight >= 1 && gridwidth >= 1) {
        result.textContent = 'The Canvas you have chosen is: ' + gridheight + " x " + gridwidth + " !";
    } else {
        result.textContent = 'Please give a value to Grid Height & Grid Width to design your Canvas!'
    }
    e.preventDefault();
    //Create Canvas
    makeGrid(gridwidth, gridheight);
    //Canvas exists so reset style btn works
    canvasIsOn = true;
});

// Reset-btn -- Everything resets and starts from the beginning
reset.addEventListener('click', function () {
    const confirm1 = confirm('Are you sure you want to delete everything?!');
    //confirm before deleting
    if (confirm1) {
        //if confirmed do:
        // empty the input fields
        gridheight = "";
        gridwidth = "";
        // add class "hidden" so that resetBtn so result wont show anymore
        resultWrapper.classList.add('hidden');
        // reset colorpicker
        color = '#f6caf9';
        color2 = '#360441';
        // delete canvas
        deleteCanvas();
        //uncheck eraser
        checkbox.prop('checked', false);
        eraserIsActive = false;
        //Canvas doesn't exist so reset style doesn't function
        canvasIsOn = false;
    } else {
        return false;
    }
});

// Color Canvas on mousedown - mousemove
function mouseMoveColor(e) {
    let color = eraserIsActive ? '' : document.getElementById('colorChoice').value;
    if (e.target !== e.currentTarget) {
        e.target.style.backgroundColor = color;
    }
    e.stopPropagation();
}
//On mousedown add mousemove event
myGrid.addEventListener('mousedown', function (e) {
    this.addEventListener('mousemove', mouseMoveColor);
    e.preventDefault();
});
//On mouseup remove mousemove event
myGrid.addEventListener('mouseup', function (e) {
    this.removeEventListener('mousemove', mouseMoveColor);
}); //Color Canvas on mousedown - mousemove -- End

//Eraser on/off
checkbox.on('click', function () {
    eraserIsActive = !eraserIsActive;
});

//Right click resets independent cell color and prevents right click menu
my$Grid.contextmenu(function (e) {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
        e.target.style.backgroundColor = '';
    }
    e.stopPropagation();
});

//Add/Delete all borders
eraseAllBordersBtn.click(function () {
    let td = $('TD');
    td.addClass('bottom-border');
    td.addClass('right-border');
});

eraseAllBordersBtn.dblclick(function () {
    let td = $('TD');
    td.removeClass('bottom-border');
    td.removeClass('right-border');
});

//Select border color
form22.submit(function (e) {
    let borderColor = $('#colorChoice2').val();
    let td = $('TD');
    td.css('border-color', borderColor);
    e.preventDefault();
});

//Reset canvas style 
resetStyleBtn.click(function () {
    //don't do the confirmation if there is no canvas designed
    if (canvasIsOn) {
        const confirm2 = confirm('Are you sure you want to reset the canvas style?');
        //confirm before reseting style
        if (confirm2) {
            const td = $('TD');
            //if confirmed do:
            td.css('border-color', '#360441');
            td.css('background-color', '');
            td.addClass('right-border');
            td.addClass('bottom-border');
            document.getElementById('colorChoice').value = '#f6caf9';
            document.getElementById('colorChoice2').value = '#360441';
            checkbox.prop('checked', false);
            eraserIsActive = false;
        } else {
            return false;
        }
    }
});

//Start -- Add/Delete Single Border
function addBottomBorder() {
    btmBrdIsClicked = true;
    my$Grid.on('mousedown', 'td', function () {
        if (btmBrdIsClicked === true) {
            $(this).addClass('bottom-border');
        }
    });
    my$Grid.on('mouseup', function () {
        btmBrdIsClicked = false;
    });
};

function addRightBorder() {
    rightBrdIsClicked = true;
    my$Grid.on('mousedown', 'td', function () {
        if (rightBrdIsClicked === true) {
            $(this).addClass('right-border');
        }
    });
    my$Grid.on('mouseup', function () {
        rightBrdIsClicked = false;
    });
};

function removeBottomBorder() {
    btmBrdIsClicked = true;
    my$Grid.on('mousedown', 'td', function () {
        if (btmBrdIsClicked === true) {
            $(this).removeClass('bottom-border');
        }
    });
    my$Grid.on('mouseup', function () {
        btmBrdIsClicked = false;
    });
};

function removeRightBorder() {
    rightBrdIsClicked = true;
    my$Grid.on('mousedown', 'td', function () {
        if (rightBrdIsClicked === true) {
            $(this).removeClass('right-border');
        }
    });
    my$Grid.on('mouseup', function () {
        rightBrdIsClicked = false;
    });
};

rightBrd.on('click', addRightBorder);
btmBrd.on('click', addBottomBorder);
rightBrd.on('dblclick', removeRightBorder);
btmBrd.on('dblclick', removeBottomBorder);
//Add/Delete Single Border -- End


// Recent color list pen color
colorChoice1.on('change', function () {
    let color = document.getElementById('colorChoice').value;
    //top recent colors number=3
    if (recentColors1.children().length < 3) {
        //add a div with the selected color
        recentColors1.append('<div class="r-c" style="background-color:' + color + '"></div>');
    } else {
        //if more than 3 colors are recently selected, remove first and add new at the end
        recentColors1.children().first().remove();
        recentColors1.append('<div class="r-c" style="background-color:' + color + '"></div>');
    }
});

// Recent color list border color
colorChoice2.on('change', function () {
    let color = document.getElementById('colorChoice2').value;
    //top recent colors number=3
    if (recentColors2.children().length < 3) {
        //add a div with the selected color
        recentColors2.append('<div class="r-c" style="background-color:' + color + '"></div>');
    } else {
        //if more than 3 colors are recently selected, remove first and add new at the end
        recentColors2.children().first().remove();
        recentColors2.append('<div class="r-c" style="background-color:' + color + '"></div>');
    }
});

//Color from RGB to HEX
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (let i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    newColor = '#' + parts.join('');

    return newColor;
}

//Recent color on click -- becomes the basic pen color
recentColors1.on('click', 'div', function () {
    let hexcolor = $(this).css('backgroundColor');
    $('#colorChoice').val(hexc(hexcolor));
});

//Recent color on click -- becomes the basic border color
recentColors2.on('click', 'div', function () {
    let hexcolor = $(this).css('backgroundColor');
    $('#colorChoice2').val(hexc(hexcolor));
});

save.click(function() {
    window.print();
});
