const spoiler = document.getElementById("spoilerBlock");
const myBtn = document.getElementById("myBtn");

let isOpen = false;

myBtn.addEventListener("click", () => {
    if (isOpen) {
        spoiler.style.display = "none";
        isOpen = false;
    } else {
        spoiler.style.display = "block";
        isOpen = true;
    }
});

document.addEventListener("keydown", (event) => {
    if (isOpen && event.key === "Escape") {
        spoiler.style.display = "none";
        isOpen = false;
    }
});