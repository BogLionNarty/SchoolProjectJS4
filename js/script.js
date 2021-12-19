document.getElementById('sub-btn').addEventListener('click', formSubmit);
document.getElementById('formData').addEventListener('click', editRow);
document.getElementById('formData').addEventListener('click', deleteRow);
document.addEventListener("DOMContentLoaded", getFromLocalStore); 
localStorage.clear();
var forms = [];
var selectedRow = null;
var btn;
let items;
var validationStatus = '';


function formSubmit(e){
    validateForm();
    if(validationStatus == 'pass'){
    let formData = readForm();
    if(selectedRow == null){
        addNewRow(formData);
        forms.push(formData);
        storeLocal(formData); 
    }
    else{
        updateRow();
    }
    }
    e.preventDefault();
    makeSum();
}

function validateForm() {
   var produkt = document.getElementById('produkt');
   var cena = document.getElementById('cena');
   var ilosc = document.getElementById('ilosc');
    checkRequired([produkt, cena, ilosc]); 
}

function checkRequired(inputArr){
    for(i = 0; i < inputArr.length; i++){
        console.log(inputArr[i]);
        if(inputArr[i].value == ''){
            alert(`${inputArr[i].id} jest wymagane`);
            inputArr[i].focus();
            validationStatus = 'fail';
            return false;
        }
        else{
            validationStatus = 'pass';
        }
    }
}

function getFormId(){
    let formId;
    if(forms.length > 0){
        formId = forms[forms.length - 1].id + 1;
    }
    else{
        formId = 0;
    }
    return formId;
}

function getFromLocalStore(){
    let items;
    if(localStorage.getItem('items') === null){
        forms = [];
    }
    else{
        forms = JSON.parse(localStorage.getItem('items'));
        console.log(forms);
        forms.forEach(function(form){
        const tbody = document.getElementById('formData'); 
        var newRow = tbody.insertRow();

        newRow.id = form.id;

        let sno = newRow.insertCell(0);
        sno.innerHTML = getSno();

        let produkt = newRow.insertCell(1);
        produkt.innerHTML = form.produkt;
    
        let cena = newRow.insertCell(2);
        cena.innerHTML = form.cena;

        let ilosc = newRow.insertCell(3);
        ilosc.innerHTML = form.ilosc;

        let razem = newRow.insertCell(4);
        razem.innerHTML = form.razem;

        let edit = newRow.insertCell(5);
        edit.innerHTML = `<a href="#" class="edit"><i class="fas fa-edit"></i></a></td>`;

        let del = newRow.insertCell(6);
        del.innerHTML = `<a href="#" class="delete"><i class="fas fa-trash"></i></a></td>`;
        });
        
    }
    return items;
}

function storeLocal(form){
    //czy jest w local???
    if(localStorage.getItem('items') === null){
        items = [];

        items.push(form);
        //wrzuc do local    
        localStorage.setItem('items', JSON.stringify(items));
    }
    else{
        items = JSON.parse(localStorage.getItem('items')); 

        items.push(form);

        //znow
        localStorage.setItem('items', JSON.stringify(items));
    }
}
function onlyNumberKey(evt) {
          
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
    return true;
}
function updateLocalStorage(id, data){

    items = JSON.parse(localStorage.getItem('items'));
    console.log(id)
    items.forEach(function(item, index){
        if(item.id == id){
            console.log(`${item.id} i ${id}`)
            item.id = data.id;
            item.produkt = data.produkt;
            item.cena = data.cena;
            item.ilosc = data.ilosc;
            item.razem = data.razem;
            items.splice(index, 1, data);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLocalStorage(id){
    items = JSON.parse(localStorage.getItem('items'));
    items.forEach(function(item, index){
        if(item.id == id){
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function readForm(){
    var formData = {};
    formData['id'] = getFormId();
    formData['produkt'] = document.getElementById('produkt').value;
    formData['cena'] = document.getElementById('cena').value;
    formData['ilosc'] = document.getElementById('ilosc').value;
    formData['razem'] = document.getElementById('ilosc').value * document.getElementById('cena').value;
    return formData;
}

var serialNum = 0;
function getSno(){
    serialNum++;
    return serialNum;
}

function addNewRow(form){
    
    //id
    const tbody = document.getElementById('formData');  //mojelement

    // wrzuc do tbody
    var newRow = tbody.insertRow();
    newRow.id = form.id;

    let sno = newRow.insertCell(0);
    sno.innerHTML = getSno();

    let produkt = newRow.insertCell(1);
    produkt.innerHTML = form.produkt;
    
    let cena = newRow.insertCell(2);
    cena.innerHTML = form.cena;

    let ilosc = newRow.insertCell(3);
    ilosc.innerHTML = form.ilosc;

    let razem = newRow.insertCell(4);
    razem.innerHTML = form.razem;

    let edit = newRow.insertCell(5);
    edit.innerHTML = `<a href="#" class="edit"><i class="fas fa-edit"></i></a></td>`;

    let del = newRow.insertCell(6);
    del.innerHTML = `<a href="#" class="delete"><i class="fas fa-trash"></i></a></td>`;

    toastNotify('Dodano');
    resetForm();
}

function toastNotify(txt) {
    var toastDiv = document.getElementById('toast');
    toastDiv.classList.add('show');
    toastDiv.innerText = txt;
    setTimeout(function(){
        toastDiv.classList.remove("show");
      },5000);
}

function editRow(e){
    if(e.target.parentElement.classList.contains('edit')){
        selectedRow = e.target.parentElement.parentElement.parentElement;
        console.log(e.target.parentElement.parentElement.parentElement);
        forms.forEach(function(form){
            if(form.id == selectedRow.id){
                document.getElementById('produkt').value = form.produkt;
                document.getElementById('cena').value  = form.cena;
                document.getElementById('ilosc').value  = form.ilosc;
                document.getElementById('razem').value  = form.razem;
                console.log(form.id);
            }
        });
        btn = document.getElementById('sub-btn');
    }
}

function updateRow(){
  forms.forEach(function(form){
    if(form.id == selectedRow.id){
        // strukktura
        form.produkt = document.getElementById('produkt').value;
        form.cena = document.getElementById('cena').value;
        form.ilosc = document.getElementById('ilosc').value;
        form.razem = document.getElementById('ilosc').value * document.getElementById('cena').value;

        // zmiana html
        selectedRow.cells[1].textContent = document.getElementById('produkt').value;
        selectedRow.cells[2].textContent = document.getElementById('cena').value;
        selectedRow.cells[3].textContent = document.getElementById('ilosc').value;
        selectedRow.cells[4].textContent = document.getElementById('ilosc').value * document.getElementById('cena').value;

        a = {'id': form.id, 'produkt':form.produkt, 'cena': form.cena, 'ilosc': form.ilosc, 'razem':form.razem};
        updateLocalStorage(selectedRow.id, a);
    }
    btn = document.getElementById('sub-btn');
    btn.innerHTML = `Dodaj`;
  });
  resetForm();
  makeSum();
}

var sumaOgolna = 0
function makeSum()
{
    var suma = 0;
    var set = localStorage.setItem('items', JSON.stringify(items));
    var get = JSON.parse(localStorage.getItem('items'));
    for(let i = 0; i<items.length; i++)
    {
        suma += get[i].razem;
    }
    var sumaHTML = document.querySelector("#razem");
    sumaHTML.innerHTML = suma;
    console.log(suma);
}

function deleteRow(e){
    if(e.target.parentElement.classList.contains('delete')){
        selectedRow = e.target.parentElement.parentElement.parentElement;
        serialNum--;
        
        forms.forEach(function(form, index){
            if(form.id == selectedRow.id){
                selectedRow.remove();
                forms.splice(index, 1);
                toastNotify('Usunięto');
                deleteItemFromLocalStorage(form.id);
            }
        });
        
        var tb = document.getElementById('formData');
        var tempSerial = 1;
        for(i = 0; i < tb.rows.length; i++){
            var d = tb.rows[i].cells[0];
            d.textContent = tempSerial++;
            console.log(i);
        }
        resetForm();
        makeSum();
    }
}

function resetForm(){
    document.getElementById('produkt').value = '';
    document.getElementById('cena').value = '';
    document.getElementById('ilosc').value = '';
    selectedRow = null;
}
