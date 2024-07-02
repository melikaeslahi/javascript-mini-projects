let $ = document;

const inputElem = $.querySelector('#input-field');
const btnSaveElem = $.querySelector('#btn-save');
const btnDeleteElem = $.querySelector('#btn-delete');
const colorsBox = $.querySelectorAll('.color-box');
const noteContainer = $.querySelector('#listed');

colorsBox.forEach(function (colorBox) {
    colorBox.addEventListener('click' , function (event) {
        let selectedColor = event.target.style.backgroundColor;
         inputElem.style.backgroundColor = selectedColor;
    })
})

function remove(event) {
    console.log(event);
event.target.parentElement.remove();
}

function generateNewNote() {
     
    let newDivElem = $.createElement('div');
    newDivElem.className = 'card shadow-sm rounded'
    let inputBg = inputElem.style.backgroundColor;
    newDivElem.style.backgroundColor = inputBg;
    newDivElem.addEventListener('click' , remove);

    let newPElem = $.createElement('p');
    newPElem.className = 'card-text p-3';
    newPElem.innerHTML = inputElem.value;

    newDivElem.append(newPElem);

    noteContainer.append(newDivElem);
     
    
    inputElem.value = ''
    inputElem.style.backgroundColor = '#fff'
}

btnDeleteElem.addEventListener('click' , function(){
    inputElem.value = '';
    inputElem.style.backgroundColor = '#fff'
})

inputElem.addEventListener('keydown' , function (event) {
    event.keyCode === 13 && inputElem.value !== ' ' && inputElem.value !== '' ?  generateNewNote() : null
     
     
});
 
btnSaveElem.addEventListener('click' , generateNewNote);



