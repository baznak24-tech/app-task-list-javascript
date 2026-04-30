# 📝 Вебзастосування "Список завдань"


Простий та інтуїтивно зрозумілий менеджер завдань, який працює безпосередньо у вашому браузері. У вебзастосуванні реалізовано можливість добавлення нових завдань, видалення непотрібних та редагування поточних, збереження напрацьованого списку завдань при оновленні сторінки, після закриття вкладки або перезавантаження комп'ютера за рахунок його збереження у LocalStorage Цей проєкт створений для демонстрації навичок роботи зі статичними вебтехнологіями.

## 🌐 Демо-версія

Переглянути вебзастосування можна за посиланням:

👉 **https://baznak24-tech.github.io/app-task-list-javascript/**

## 🚀 Технології


Проєкт побудований з використанням наступних технологій:


* ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) — структура сторінки;
* ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) — стилізація та анімації;
* ![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black) — логіка роботи та маніпуляції з DOM;
* ![GitHub Actions](https://img.shields.io/badge/github%20actions-%232088FF.svg?style=for-the-badge&logo=githubactions&logoColor=white) — автоматизація публікації.


## 🛠️ Локальний запуск

Для локального перегляду проекту необхідно виконати наступні кроки:

1.  **Клонувати репозиторій:**
    ```bash
    git clone [https://github.com/baznak24-tech/app-task-list-javascript.git](https://github.com/baznak24-tech/app-task-list-javascript.git)
    ```

2.  **Перейти у папку:**
    ```bash
    cd app-task-list-javascript
    ```

3.  **Відкрити файл у браузері:**
    ```bash
    start index.html    
    ```

## 📦 Розгортання (CI/CD)

Проєкт використовує **GitHub Actions** для автоматичного розгортання оновленої версії вебзастосування на GitHub Pages.
Кожен `push` у гілку `main` ініціює робочий процес, який оновлює версію застосунку на GitHub Pages.
Конфігурація знаходиться у файлі: `.github/workflows/deploy.yml`.

---
*Розроблено як навчальний проєкт.*