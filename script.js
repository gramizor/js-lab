let replacements = new Map();
let comments = new Map();
const commentInput = document.getElementById("new-comment");
const commentOutput = document.getElementById("comment-list");
const replacementInput = document.getElementById("new-replacement");
const replacementOutput = document.getElementById("replacement-list");

//комменты

commentInput.addEventListener('keyup', (e) => { //слушатель энтера в инпуте
    if (e.keyCode === 13) {
        addComment();
    }
});

function addComment() { //добавляет коммментарий
    if (commentInput.value === '') {
        alert("Введите комментарий перед добавлением.");
        return;
    }

    const storedComments = localStorage.getItem('comments');
    let commentsArray = [];
    if (storedComments) {
        commentsArray = JSON.parse(storedComments);
    }

    if (commentsArray.includes(commentInput.value)) {
        alert("Такой комментарий уже существует.");
        commentInput.value = '';
        return;
    }

    let replacedComment = applyReplacements(commentInput.value);

    commentsArray.push(replacedComment);
    localStorage.setItem('comments', JSON.stringify(commentsArray));
    showComment(commentsArray);
    commentInput.value = '';
}

function applyReplacements(comment) { //замены
    const storedReplacements = localStorage.getItem('replacements');
    let replacementsArray = [];
    if (storedReplacements) {
        replacementsArray = JSON.parse(storedReplacements);
    }

    let replacedComment = comment;
    replacementsArray.forEach(replacement => {
        const [from, to] = replacement.split(' ');
        replacedComment = replacedComment.replace(new RegExp(from, 'g'), to);
    });

    return replacedComment;
}

function showComment(commentsArray) { // отображает комментарии
    while (commentOutput.firstChild) {
        commentOutput.removeChild(commentOutput.firstChild);
    }

    const appliedComments = commentsArray.map(comment => applyReplacements(comment));

    appliedComments.forEach((comment, index) => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = "src/delete-icon.png";
        img.alt = "удалить элемент";
        img.id = "delete-img";

        img.addEventListener("click", function () {
            commentsArray = commentsArray.filter((_, i) => i !== index);
            localStorage.setItem('comments', JSON.stringify(commentsArray));
            showComment(commentsArray);
        });

        let textNode = document.createTextNode(comment);
        li.appendChild(textNode);
        li.appendChild(img);
        commentOutput.appendChild(li);
    });
}


const storedComments = localStorage.getItem('comments'); //подгрузка из localstorage после обновления страницы
if (storedComments) {
    const commentsArray = JSON.parse(storedComments);
    showComment(commentsArray);
}

//замены

replacementInput.addEventListener('keyup', (e) => { //обработчик энтера в инпуте
    if (e.keyCode === 13) {
        addReplacement();
    }
});
function applyReplacementsToComments() {
    const storedComments = localStorage.getItem('comments');
    let commentsArray = [];
    if (storedComments) {
        commentsArray = JSON.parse(storedComments);
    }

    const storedReplacements = localStorage.getItem('replacements');
    let replacementsArray = [];
    if (storedReplacements) {
        replacementsArray = JSON.parse(storedReplacements);
    }

    // Применяем все замены к комментариям
    commentsArray = commentsArray.map(comment => applyReplacements(comment, replacementsArray));

    localStorage.setItem('comments', JSON.stringify(commentsArray));
    showComment(commentsArray);
}

function addReplacement() { // добавляет новую замену
    let replacementValue = replacementInput.value.trim();
    const words = replacementValue.split(' ');
    if (replacementInput.value === '') {
        alert("Введите замены перед добавлением.");
        return;
    } else {
        if (words.length !== 2) {
            alert("Введите два слова через пробел для замены.");
            replacementInput.value = '';
            return;
        }
    }
    const storedReplacements = localStorage.getItem('replacements');
    let replacementsArray = [];
    if (storedReplacements) {
        replacementsArray = JSON.parse(storedReplacements);
    }

    replacementsArray.push(replacementValue);
    localStorage.setItem('replacements', JSON.stringify(replacementsArray));

    applyReplacementsToComments(); // Применяем замены к комментариям
    showReplacement(replacementsArray);
    replacementInput.value = '';
}

applyReplacementsToComments();


function showReplacement(replacementsArray) { //отображает замены
    while (replacementOutput.firstChild) {
        replacementOutput.removeChild(replacementOutput.firstChild);
    }

    replacementsArray.forEach(replacementValue => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = "src/delete-icon.png";
        img.alt = "удалить элемент";
        img.id = "delete-img";

        img.addEventListener("click", function () {
            replacementsArray = replacementsArray.filter(replacement => replacement !== replacementValue);
            localStorage.setItem('replacements', JSON.stringify(replacementsArray));
            showReplacement(replacementsArray);
        });

        let textNode = document.createTextNode(replacementValue);
        li.appendChild(textNode);
        li.appendChild(img);
        replacementOutput.appendChild(li);
    });
}

const storedReplacements = localStorage.getItem('replacements'); //подгрузка после обновления страницы
if (storedReplacements) {
    const replacementsArray = JSON.parse(storedReplacements);
    showReplacement(replacementsArray);
}


let contentArea = document.querySelectorAll(".content");

function showCensor() {
    setElementStatus('censor', 'flex');
    setElementStatus('showcase', 'none');
    setElementStatus('spoiler', 'none');
    setElementStatus('todo', 'none');
    setElementStatus('todoServer', 'none');
    setElementStatus('main', 'none');
}

function showCase() {
    setElementStatus('censor', 'none');
    setElementStatus('showcase', 'flex');
    setElementStatus('spoiler', 'none');
    setElementStatus('todo', 'none');
    setElementStatus('todoServer', 'none');
    setElementStatus('main', 'none');
}

function showSpoiler() {
    setElementStatus('censor', 'none');
    setElementStatus('showcase', 'none');
    setElementStatus('spoiler', 'flex');
    setElementStatus('todo', 'none');
    setElementStatus('todoServer', 'none');
    setElementStatus('main', 'none');
}

function showLocalTodo() {
    setElementStatus('censor', 'none');
    setElementStatus('showcase', 'none');
    setElementStatus('spoiler', 'none');
    setElementStatus('todo', 'flex');
    setElementStatus('todoServer', 'none');
    setElementStatus('main', 'none');
}

function showServerTodo() {
    setElementStatus('censor', 'none');
    setElementStatus('showcase', 'none');
    setElementStatus('spoiler', 'none');
    setElementStatus('todo', 'none');
    setElementStatus('todoServer', 'flex');
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