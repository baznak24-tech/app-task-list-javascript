// Отримуємо посилання на елементи DOM
const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');

// 39. Функція для додавання до списку завдань нового завдання
// з добавленням кнопки видалення
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Будь ласка, введіть текст завдання!");
        return;
    }

    // Створюємо елемент завдання (контейнер label)
    const label = document.createElement('label');
    label.className = 'task-list-item';

    // Наповнюємо його структурними елементами (додано кнопку ✖)
    label.innerHTML = `
        <input type="checkbox">
        <span class="task-checkmark"></span>
        <span class="task-text">${taskText}</span>
        <button class="task-delete-btn" title="Видалити завдання">✖</button>
    `;

    // Додаємо подію для кнопки видалення завдання
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    taskDeleteBtn.addEventListener('click', () => {
        label.remove(); // Видаляємо завдання
    });

    // Додаємо нове завдання в список
    taskList.appendChild(label);

    // Очищаємо поле вводу
    taskInput.value = "";
    taskInput.focus();
}

// Функція для обробки подій на статичних елементах списку
function attachTaskEvents(label) {
    // Додаємо подію для кнопки видалення завдання
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    if (taskDeleteBtn) {
        taskDeleteBtn.addEventListener('click', () => {
            label.remove(); // Видаляємо завдання
        });
    }
}

// Навішуємо функцію обробки подій на статичні елементи списку
document.querySelectorAll('#task-list label').forEach(attachTaskEvents);

// Слухачі подій для інтерфейсу
taskAddBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});