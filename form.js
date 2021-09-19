//pegar o formulário
const form = document.querySelector("form");

//criar e povoar o array com elementos do localstorage
const itemArr = JSON.parse(localStorage.getItem("items")) || [];

//função para apresentar os items da lista na tela
function showItems (clearItems = false) {

    const addItem = document.querySelector("#add");

    if (clearItems) {
        addItem.innerHTML = '';
      }

    if (itemArr.length > 0 ) {
        itemArr.forEach((catchItem) => {
            addItem.innerHTML= addItem.innerHTML + `<li><input type="checkbox" id="tasks" name="tasks" class="checkBox"><label for="tasks" class"itemOfList">${catchItem.item}</label> <button onclick="remove('${catchItem.item}')" id="${catchItem.item}" class="button">x</button></li>`;
        }
        )}

    else {
        addItem.innerHTML = 'Você não tem nenhuma tarefa adicionada. Comece agora mesmo a criar sua lista de tarefas.';
    };
};

//função para remover elementos
function remove (id) {
    for( let i =0; i < itemArr.length; i++){
        if(itemArr[i].item == id){
            itemArr.splice(i,1) 
            saveItemsLocalstorage();
            showItems(true);
            }
    }
}

//evento para receber dados do formulário e guardar no localstorage
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let catchItem = {};
    catchItem.item = form.elements["itemPlace"].value
    itemArr.push(catchItem);
    saveItemsLocalstorage();
    showItems(true);
    form.reset();
});

//função para apresentar os elementos salvos no local storage ao carregar a pagina
window.onload =  () => {
    showItems();
};

//função para salvar items no local storage
const saveItemsLocalstorage = () => {
    localStorage.setItem("items", JSON.stringify(itemArr))
};