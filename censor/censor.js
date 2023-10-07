// Основное задание
function censor() {
    const substitutions = {}; //переменная где хранятся замены
    function newChange(censoredWord, changeTo) {
        substitutions[censoredWord] = changeTo; //создание ключа-значения
    }
    function replaceWords(text) {
        const words = text.split(' '); //создается массив words, разделяя слова по пробелу
        const changedWords = words.map(word => substitutions[word] || word); //замена слов
        const changedText = changedWords.join(' '); //совмещение замен с текстом
        return changedText;
    }
    return { newChange, replaceWords };
}

const changeScene = censor();
changeScene.newChange('PHP', 'JS');
changeScene.newChange('backend', 'frontend');

console.log(changeScene.replaceWords('1) PHP is the most popular programming language for backend web-development'));