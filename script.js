// Отримуємо посилання на елементи DOM
const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');
 
// Функція для додавання до списку завдань нового завдання
function addTask() {
    const taskText = taskInput.value.trim();
 
    if (taskText === "") {
        alert("Будь ласка, введіть текст нового завдання!");
        return;
    }
 
    // Створюємо елемент завдання (наш контейнер label)
    const label = document.createElement('label');
    label.className = 'task-list-item';
 
    // Наповнюємо його структурними елементами
    label.innerHTML = `
        <input type="checkbox">
        <span class="task-checkmark"></span>
        <span class="task-text">${taskText}</span>
    `;
 
    // Додаємо нове завдання в список
    taskList.appendChild(label);
 
    // Очищаємо поле введення нових завдань
    taskInput.value = "";
    taskInput.focus();
}
 
// Додаємо слухач кліку для кнопки додавання нових завдань
taskAddBtn.addEventListener('click', addTask);
 
// Дозволяємо додавати завдання натисканням клавіші Enter
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
