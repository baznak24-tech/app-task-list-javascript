// 1. Отримуємо посилання на елементи DOM
const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');

// Відтворюємо список при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadTaskList);

// 2. Функція для додавання нового завдання
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTaskListElement(taskText, false);
    saveTaskList(); // Зберігаємо після додавання

    taskInput.value = "";
    taskInput.focus();
}

// 3. Універсальна функція для створення елементів списку
function createTaskListElement(taskText, isCompleted) {
    const label = document.createElement('label');
    label.className = 'task-list-item';

    // Наповнюємо структурними елементами (додано кнопку ✔)
    label.innerHTML = `
        <input type="checkbox" ${isCompleted ? 'checked' : ''} >
        <span class="task-checkmark"></span>
        <span class="task-text" contenteditable="true" spellcheck="false">${taskText}</span>
        <button class="task-done-btn" title="Змінити відмітку виконання завдання">✔</button>
        <button class="task-task-delete-btn" title="Видалити завдання">✖</button>
    `;

    const textSpan = label.querySelector('.task-text');
    const checkbox = label.querySelector('input');

    // Зберігаємо зміни при втраті фокусу
    textSpan.addEventListener('blur', () => {
        if (textSpan.innerText.trim() === "") {
            textSpan.innerText = "Введіть нове завдання";
        }
        saveTaskList();
    });

    // Зберігаємо зміни при натисканні Enter
    textSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textSpan.blur();
        }
    });

    // Запобігаємо перемиканню чекбокса при кліку на текст
    textSpan.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // Подія для чекбокса
    checkbox.addEventListener('change', () => {
        saveTaskList();
    });

    // Подія для видалення
    const taskDeleteBtn = label.querySelector('.task-task-delete-btn');
    taskDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        label.remove();
        saveTaskList();
    });

    // Крок 85: Подія для нової кнопки виконання (✔)
    const taskDoneBtn = label.querySelector('.task-done-btn');
    taskDoneBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Запобігаємо спрацюванню label
        checkbox.checked = !checkbox.checked; // Змінюємо стан чекбокса
        saveTaskList(); // Зберігаємо оновлений стан
    });

    taskList.appendChild(label);
}

// 4. Функція збереження всіх завдань у LocalStorage
function saveTaskList() {
    const myTaskList = [];
    document.querySelectorAll('.task-list-item').forEach(item => {
        myTaskList.push({
            text: item.querySelector('.task-text').innerText,
            completed: item.querySelector('input').checked
        });
    });
    localStorage.setItem('myTaskList', JSON.stringify(myTaskList));
}

// 5. Функція завантаження списку
function loadTaskList() {
    // Очищаємо статичні елементи
    const staticTaskList = document.querySelectorAll('.task-list-item');
    staticTaskList.forEach(item => item.remove());

    const savedTaskList = localStorage.getItem('myTaskList');
    if (savedTaskList) {
        const myTasks = JSON.parse(savedTaskList);
        myTasks.forEach(task => {
            createTaskListElement(task.text, task.completed);
        });
    }
}

// 6. Функція для обробки подій на статичних елементах (якщо вони є)
function attachTaskListEvents(label) {
    const textSpan = label.querySelector('.task-text');
    const checkbox = label.querySelector('input');

    textSpan.addEventListener('blur', () => {
        if (textSpan.innerText.trim() === "") {
            textSpan.innerText = "Введіть нове завдання";
        }
        saveTaskList();
    });

    textSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textSpan.blur();
        }
    });

    textSpan.addEventListener('click', (e) => e.preventDefault());

    checkbox.addEventListener('change', () => saveTaskList());

    const taskDeleteBtn = label.querySelector('.task-task-delete-btn');
    taskDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        label.remove();
        saveTaskList();
    });

    const taskDoneBtn = label.querySelector('.task-done-btn');
    if (taskDoneBtn) {
        taskDoneBtn.onclick = (e) => {
            e.preventDefault();
            checkbox.checked = !checkbox.checked;
            saveTaskList();
        };
    }
}

// 7. Глобальні слухачі подій
taskAddBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Навішуємо події на початкові завдання (якщо вони не видалені)
document.querySelectorAll('#task-list label').forEach(attachTaskListEvents);