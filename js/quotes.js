
const quotes=[

"Stay focused and keep writing.",

"Small progress is still progress.",

"Discipline beats motivation.",

"Write your ideas before they disappear.",

"Dream big. Work bigger.",

"Every note matters.",

"Success starts with consistency.",

"Learning never stops."

];


const quote=document.getElementById("quote");

const today=new Date().getDate();

quote.textContent=quotes[today%quotes.length];
