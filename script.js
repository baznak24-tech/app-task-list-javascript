// 1. Отримуємо посилання на елементи DOM
const taskInput = document.getElementById('task-input');
const taskAddBtn = document.getElementById('task-add-btn');
const taskList = document.getElementById('task-list');

// Відтворюємо список завдань з LocalStorage при завантаженні сторінки
document.addEventListener('DOMContentLoaded', loadTaskList);

// 2. Функція для додавання до списку завдань нового завдання
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

    label.innerHTML = `
        <input type="checkbox" ${isCompleted ? 'checked' : ''}>
        <span class="task-checkmark"></span>
        <span class="task-text" contenteditable="true" spellcheck="false">${taskText}</span>
        <button class="task-delete-btn" title="Видалити завдання">✕</button>
    `;

    const textSpan = label.querySelector('.task-text');

    // --- НОВЕ (Пункт 72) ---
    // Запобігаємо спрацюванню події для label при кліку на тексті завданні
    textSpan.addEventListener('click', (e) => {
        e.preventDefault();
    });
    // -----------------------

    // Зберігаємо зміни після редагування (втрата фокусу)
    textSpan.addEventListener('blur', () => {
        if (textSpan.innerText.trim() === "") {
            textSpan.innerText = "Введіть нове завдання";
        }
        saveTaskList();
    });

    // Завершення редагування при натисканні Enter
    textSpan.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            textSpan.blur();
        }
    });

    // Подія для чекбокса
    const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList();
    });

    // Подія для кнопки видалення
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    taskDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Запобігаємо спрацюванню label
        label.remove();
        saveTaskList();
    });

    taskList.appendChild(label);
}

// 4. Функція для збереження всіх завдань у LocalStorage
function saveTaskList() {
    const myTaskList = [];
    document.querySelectorAll('.task-list-item').forEach(item => {
        const textElement = item.querySelector('.task-text');
        const checkboxElement = item.querySelector('input');
        
        if (textElement && checkboxElement) {
            myTaskList.push({
                text: textElement.innerText,
                completed: checkboxElement.checked
            });
        }
    });
    localStorage.setItem('myTaskList', JSON.stringify(myTaskList));
}

// 5. Функція для завантаження списку завдань
function loadTaskList() {
    const staticTaskList = document.querySelectorAll('.task-list-item');
    staticTaskList.forEach(item => {
        item.remove();
    });

    const savedTaskList = localStorage.getItem('myTaskList');
    if (savedTaskList) {
        const myTasks = JSON.parse(savedTaskList);
        myTasks.forEach(task => {
            createTaskListElement(task.text, task.completed);
        });
    }
}

// 6. Слухачі подій для інтерфейсу
taskAddBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Функція для "оживлення" статичних елементів
function attachTaskListEvents(label) {
    const textSpan = label.querySelector('.task-text');
    if (textSpan) {
        // --- НОВЕ (Пункт 72) ---
        // Запобігаємо спрацюванню події для label при кліку на тексті завданні
        textSpan.addEventListener('click', (e) => {
            e.preventDefault();
        });
        // -----------------------

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
    }

    const checkbox = label.querySelector('input');
    if (checkbox) checkbox.addEventListener('change', () => saveTaskList());

    const delBtn = label.querySelector('.task-delete-btn');
    if (delBtn) {
        delBtn.addEventListener('click', (e) => {
            e.preventDefault();
            label.remove();
            saveTaskList();
        });
    }
}

document.querySelectorAll('#task-list .task-list-item').forEach(attachTaskListEvents);