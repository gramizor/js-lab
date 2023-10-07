let contentArea = document.querySelectorAll(".content");

function showCensor() {
    setElementStatus('censor', 'flex');
    setElementStatus('showcase', 'none');
    setElementStatus('spoiler', 'none');
    setElementStatus('todo', 'none');
    setElementStatus('main', 'none');
}

function showCase() {
    setElementStatus('censor', 'none');
    setElementStatus('showcase', 'flex');
    setElementStatus('spoiler', 'none');
    setElementStatus('todo', 'none');
    setElementStatus('main', 'none');
}

function showSpoiler() {
    setElementStatus('censor', 'none');
    setElementStatus('showcase', 'none');
    setElementStatus('spoiler', 'flex');
    setElementStatus('todo', 'none');
    setElementStatus('main', 'none');
}

function showTodo() {
    setElementStatus('censor', 'none');
    setElementStatus('showcase', 'none');
    setElementStatus('spoiler', 'none');
    setElementStatus('todo', 'flex');
    setElementStatus('main', 'none');
}

// Функция для установки статуса в sessionStorage
function setElementStatus(elementId, status) {
    sessionStorage.setItem(elementId, status);
    applyElementStatus();
}

// Функция для применения статуса к элементам
function applyElementStatus() {
    for (let i = 0; i < contentArea.length; i++) {
        const elementId = contentArea[i].id;
        const status = sessionStorage.getItem(elementId);
        if (status) {
            contentArea[i].style.display = status;
        }
    }
}

applyElementStatus();