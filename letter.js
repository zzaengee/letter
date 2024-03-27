const $toDoForm = document.getElementById("todo-form");
const $toDoInput = document.querySelector("#todo-form input");
const $toDoList = document.getElementById("todo-list");

let savedToDo = [];
let preToDo = JSON.parse(localStorage.getItem("toDo"));

function saveToDo() {
  localStorage.setItem("toDo", JSON.stringify(savedToDo));
}

function deleteList(event) {
  const removeLi = event.target.parentElement;
  removeLi.remove();
  savedToDo = savedToDo.filter(
    (savedToDo) => savedToDo.id !== parseInt(removeLi.id)
  );
  saveToDo();
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  li.id = newToDo.id;
  const div = document.createElement("div");
  div.innerText = newToDo.toDo;
  const btn = document.createElement("button");
  btn.innerText = "삭제";
  btn.className = "btn-delete";
  btn.addEventListener("click", deleteList);
  li.appendChild(div);
  li.appendChild(btn);
  li.className = "toDos";
  $toDoList.appendChild(li);
}

function btnSubmit(event) {
  event.preventDefault();
  const newToDo = $toDoInput.value;
  $toDoInput.value = "";
  const newToDoObject = {
    toDo: newToDo,
    id: new Date().getTime(),
  };
  savedToDo.push(newToDoObject);
  paintToDo(newToDoObject);
  saveToDo();
}
$toDoForm.addEventListener("submit", btnSubmit);

if (preToDo !== null) {
  for (let i = 0; i < preToDo.length; i++) {
    savedToDo.push(preToDo[i]);
  }
  for (let i = 0; i < savedToDo.length; i++) {
    paintToDo(savedToDo[i]);
  }
}
