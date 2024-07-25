document.addEventListener('DOMContentLoaded', () => {
    const addTodoButton = document.getElementById('add-todo');
    const newTodoInput = document.getElementById('new-todo');
    const todoList = document.getElementById('todo-list');
    const dingSound = document.getElementById('ding');

    addTodoButton.addEventListener('click', () => {
        const todoText = newTodoInput.value.trim();
        if (todoText) {
            const todoItem = createTodoItem(todoText);
            todoList.appendChild(todoItem);
            newTodoInput.value = '';
        }
    });

    function createTodoItem(text) {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                li.classList.add('completed');
                dingSound.play();
                todoList.appendChild(li);
                updatePrice(2); // Example: Increase price by $2
            } else {
                li.classList.remove('completed');
                updatePrice(-2); // Example: Decrease price by $2
            }
        });

        const todoText = document.createElement('span');
        todoText.textContent = text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.classList.add('fade-out');
            li.addEventListener('animationend', () => {
                todoList.removeChild(li);
                updatePrice(-2); // Example: Decrease price by $2
            });
        });

        li.appendChild(checkbox);
        li.appendChild(todoText);
        li.appendChild(deleteButton);

        return li;
    }

    function updatePrice(amount) {
        const priceElement = document.getElementById('price');
        let currentPrice = parseFloat(priceElement.textContent);
        currentPrice += amount;
        priceElement.textContent = currentPrice.toFixed(2);
    }
});
