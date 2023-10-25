let todos = [];
let users = [];
const todoList = document.querySelector("#todo-list");
const userSelect = document.getElementById("user-todo");
const form = document.querySelector("form");

document.addEventListener("DOMContentLoaded", initApp);
form.addEventListener("submit", handleSubmit);

function getUserName(userId) {
    const user = users.find((user) => user.id === userId);
    return user.name;
}

function printTodo({ id, userId, title, completed }) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.dataset.id = id;
    li.innerHTML = `<span class="todo-text">${title} <i>by</i> <b>${getUserName(
        userId
    )}</b></span>`;

    const status = document.createElement("input");
    status.type = "checkbox";
    status.checked = completed;

    status.addEventListener("change", handleTodoChange);

    const close = document.createElement("span");
    close.innerHTML = "&times;";
    close.className = "close";

    close.addEventListener("click", handleClose);

    li.prepend(status);
    li.append(close);

    todoList.prepend(li);
}

function createUserOption(user) {
    const option = document.createElement("option");
    option.value = user.id;
    option.innerText = user.name;

    userSelect.append(option);
}

function removeTodo(todoId) {
    todos = todos.filter((todo) => todo.id !== todoId);

    const todoItem = todoList.querySelector(`[data-id="${todoId}"]`);
    todoItem
        .querySelector("input")
        .removeEventListener("change", handleTodoChange);
    todoItem.querySelector(".close").removeEventListener("click", handleClose);

    todoItem.remove();
}

function alertError(error) {
    alert(error.message);
}

function initApp() {
    Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
        [todos, users] = values;

        todos.forEach((todo) => printTodo(todo));
        users.forEach((user) => createUserOption(user));
    });
}

function handleSubmit(event) {
    event.preventDefault();

    if (form.todo.value !== "" && form.user.value !== "select user") {
        createTodo({
            userId: Number(form.user.value),
            title: form.todo.value,
            completed: false,
        });
    }
}

function handleTodoChange() {
    const todoId = this.parentElement.dataset.id;
    const completed = this.checked;

    toggleTodoComplete(todoId, completed);
}

function handleClose() {
    const todoId = Number(this.parentElement.dataset.id);

    deleteTodo(todoId);
}

async function getAllTodos() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos"
        );
        const todos = await response.json();

        return todos;
    } catch (error) {
        alertError(error);
    }
}

async function getAllUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        const users = await response.json();

        return users;
    } catch (error) {
        alertError(error);
    }
}

async function createTodo(todo) {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/todos",
            {
                method: "POST",
                body: JSON.stringify(todo),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const resTodo = await response.json();

        printTodo(resTodo);
    } catch (error) {
        alertError(error);
    }
}

async function toggleTodoComplete(todoId, completed) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${todoId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ completed }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error("Failed to connect with the server. Please try later.");
        }
    } catch (error) {
        alertError(error);
    }
}

async function deleteTodo(todoId) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/todos/${todoId}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            removeTodo(todoId);
        } else {
            throw new Error("Failed to connect with the server. Please try later.");
        }
    } catch (error) {
        alertError(error);
    }
}