let table = ''; //DOM de la tabla
const form = document.forms[0]; //DOM del primer formulario
let id = 0; //Numero identificador para cada fila de la tabla

// Recogida de todos los elementos del form para deshabilitarlos
let elementos =  form.elements;
for(let i = 0; i < elementos.length; i++) {
    elementos[i].disabled = true;
}

// Prohíbe añadir letras al input de peso
form.peso.addEventListener("keydown", e => {
    const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];

    if(keys.indexOf(e.key) == -1) {
        e.preventDefault();
    }
})

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
form.guardar.addEventListener('click', e => {
    e.preventDefault();
    guardarFormulario();
});

// Carga los datos de la fila en el formulario 
function editarAnimal() {

    // Habilita todos los elementos del form
    for(let i = 0; i < elementos.length; i++) {
        elementos[i].disabled = false;
    }

    const filas = document.querySelector("tbody").querySelectorAll("tr"); // Recoge las filas de la tabla

    // Quita el resaltado de las filas
    filas.forEach(f => {
        f.classList.remove("table-success")
    })

    let id = this.getAttribute('id').substring(1); //Recibe el numero ID de la fila
    // Resalta la fila clickada
    filas[id].classList.add("table-success")

    let especie = tbody.querySelector(`td[id=species${id}]`).innerHTML //Recibe la especie del animal
    let select = form.querySelector('select'); //DOM Select de razas
    
    //Mostar datos en el formulario
    form.querySelector('input[name=nombre]').value = tbody.querySelector(`td[id=name${id}]`).innerText;

    //Buscar raza y cargarlas
    switch (especie) {
        case "dog":
            select.innerHTML = `<option>Pitbull</option><option>Chihuahua</option><option>Pastor Alemán</option>`;
            break;
        case "cat":
            select.innerHTML = `<option>Ruso azul</option><option>Egipcio</option><option>Maine Coone</option>`;
            break;
        default:
            break;
    }
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

// Guarda datos en el JSON
function guardarFormulario(){

    // Comprueba si todos los valores están introducidos
    if(form.sexOptions.value == "") {
        return alert("Indique el sexo del animal")
    } else if(form.peso.value == "") {
        return alert("Indique el peso del animal")
    } else if(!form.oidos.checked && !form.nariz.checked && !form.boca_pico.checked && !form.ojos.checked) {
        return alert("Indique una revisión")
    } else if(form.diagnostico.value == "") {
        return alert("Indique un diagnóstico")
    } else { // Si están introducidos los guarda

        // Recogida de datos
        let raza = form.querySelector('select[name=raza]').value;
        let sexo = form.sexOptions.value;
        let peso = form.peso.value;
        let diagnostico = form.diagnostico.value;

        // Búsqueda del animal a editar
        const animalSeleccionado = animals.find(a => a.name == nombre);

        // Introducción de datos al animal
        animalSeleccionado.raza = raza;
        animalSeleccionado.sexo = sexo;
        animalSeleccionado.peso = peso;
        animalSeleccionado.diagnostico = diagnostico;

        mostrarDatos(nombre)
    }
}