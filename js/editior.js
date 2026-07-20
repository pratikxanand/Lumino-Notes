const editor = document.getElementById("editor");

document.getElementById("boldBtn").addEventListener("click", () => {

    editor.focus();
    document.execCommand("bold");

});

document.getElementById("italicBtn").addEventListener("click", () => {

    editor.focus();
    document.execCommand("italic");

});

document.getElementById("underlineBtn").addEventListener("click", () => {

    editor.focus();
    document.execCommand("underline");

});