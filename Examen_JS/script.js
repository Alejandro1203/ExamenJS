let table = ''; //DOM de la tabla
const form = document.forms[0]; //DOM del primer formulario
let id = 0; //Numero identificador para cada fila de la tabla
form.querySelector('select').disabled = true; //Desactiva los select

// Recopila los valores en "table"
animals.forEach(animal => {
    table += `<tr id="row${id}">
        <td id="name${id}">${animal.name}</td>
        <td id="species${id}">${animal.species}</td>
        <td id="foodlike${id}">${animal.foods.likes.join(', ')}</td>
        <td id="fooddislike${id}">${animal.foods.dislikes.join(', ')}</td>
        <td><button id="b${id}" class="btn btn-light">Editar</button></td>
        </tr>
        `;
    id++;
}); 
let tbody = document.querySelector('tbody'); //Selecciona el body de la tabla
tbody.innerHTML = table; //Le inserta todos los valores

//Añadir evento (editarAnimal) al boton Editar de cada fila
tbody.querySelectorAll('button').forEach(e => {
    let id = e.getAttribute("id").substring(1);
    e.addEventListener('click',editarAnimal);
})
//Añadir evento (guardarFormulario) al boton Guardar del formulario
form.querySelector('button').addEventListener('click',guardarFormulario);

// Carga los datos de la fila en el formulario 
function editarAnimal() {
    let id = this.getAttribute('id').substring(1); //Recibe el numero ID de la fila
    let especie = tbody.querySelector(`td[id=species${id}]`).innerHTML //Recibe la especie del animal
    let select = form.querySelector('select'); //DOM Select de razas
    let values = []; //Lista de razas, cargadas mas adelante
    //Habilitar
    select.disabled = false;
    
    //Mostar datos en el formulario
    form.querySelector('input[name=nombre]').value = tbody.querySelector(`td[id=name${id}]`).innerText;

    //Buscar raza
    switch (especie) {
        case "dog":
            values.push("Pitbull");
            values.push("Chihuahua");
            values.push("Pastor aleman");
            break;
        case "cat":
            values.push("Ruso azul");
            values.push("Egipcio");
            values.push("Maine coone");
            break;
        default:
            break;
    }
    //Cargar razas
    select.innerHTML = `<option value="">--Raza--</option>`;
    values.forEach(e => {
        select.innerHTML += `<option value="${e}">${e}</option>`;
    });
    //Mostrar JSON
    mostrarDatos(tbody.querySelector(`td[id=name${id}]`).innerHTML);
};

//Carga del animal los datos en el formulario con formato JSON
function mostrarDatos(nombre){
    const animal = animals.find(a => a.name.toLowerCase() === nombre.toLowerCase());
    let component;
    
    if (animal) {
        component = `<pre class="border border-dark">${JSON.stringify(animal, null, 2)}</pre>`;
    } else {
        component = `<pre class="border border-dark">No se encontró el animal con el nombre "${nombre}".</pre>`;
    }
    form.querySelector('#json').innerHTML = component;
}

//⚠️Sin terminar, comprueba si los valores minimos se cumplen
function guardarFormulario(){
    let nombre = form.querySelector('input[name=nombre]').value;
    let raza = form.querySelector('select[name=raza]').value;
    let sexo = form.querySelector('input[name=sexo]').value;
    let peso = form.querySelector('input[name=peso]').value;
    let diagnostico = form.querySelector('textarea[name=diagnostico]').value;
    if (!nombre || !raza || !sexo || !peso || !diagnostico){ //⚠️Este if puede esta mal
        alert(`Dato no introducido`);
    } else {
        //Insertar valores en json (⚠️No finalizado)
    }
}
