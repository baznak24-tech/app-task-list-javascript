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

    // Створюємо елемент (false означає, що нове завдання не виконане)
    createTaskListElement(taskText, false);
    saveTaskList(); // Зберігаємо актуальний список у LocalStorage

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
        <span class="task-text">${taskText}</span>
        <button class="task-delete-btn" title="Видалити завдання">✖</button>
    `;

    // Подія для чекбокса: зберігаємо зміни стану (виконано/не виконано)
    const checkbox = label.querySelector('input');
    checkbox.addEventListener('change', () => {
        saveTaskList();
    });

    // Подія для кнопки видалення: видаляємо елемент та оновлюємо сховище
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    taskDeleteBtn.addEventListener('click', () => {
        label.remove();
        saveTaskList();
    });

    taskList.appendChild(label);
}

// 4. Функція для збереження всіх завдань у LocalStorage (JSON формат)
function saveTaskList() {
    const myTaskList = [];
    document.querySelectorAll('.task-list-item').forEach(item => {
        myTaskList.push({
            text: item.querySelector('.task-text').innerText,
            completed: item.querySelector('input').checked
        });
    });
    // Серіалізація: перетворюємо масив об'єктів у рядок
    localStorage.setItem('myTaskList', JSON.stringify(myTaskList));
}

// 5. Функція для зчитування даних при завантаженні застосунку
function loadTaskList() {
    // Спочатку видаляємо статичні завдання, які прописані в HTML
    const staticTaskList = document.querySelectorAll('.task-list-item');
    staticTaskList.forEach(item => {
        item.remove();
    });

    // Отримуємо рядок із сховища
    const savedTaskList = localStorage.getItem('myTaskList');
    if (savedTaskList) {
        // Десеріалізація: перетворюємо рядок назад у масив об'єктів
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

// Додатковий обробник для статичних елементів (якщо вони раптом залишаться)
function attachTaskListEvents(label) {
    const taskDeleteBtn = label.querySelector('.task-delete-btn');
    if (taskDeleteBtn) {
        taskDeleteBtn.addEventListener('click', () => {
            label.remove();
            saveTaskList();
        });
    }

    const checkbox = label.querySelector('input');
    if (checkbox) {
        checkbox.addEventListener('change', () => {
            saveTaskList();
        });
    }
}

document.querySelectorAll('#task-list label').forEach(attachTaskListEvents);