// ======================================
// LUMINO NOTES
// PART 1
// ======================================

// ---------- ELEMENTS ----------

const addBtn = document.getElementById("addNoteBtn");
const popup = document.getElementById("popup");
const saveBtn = document.getElementById("saveNote");
const archivePopupBtn = document.getElementById("archivePopupBtn");

const archivePopup = document.getElementById("archivePopup");

const closeArchive = document.getElementById("closeArchive");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const categoryInput = document.getElementById("category");

const recentNotes = document.getElementById("recentNotes");
const searchInput = document.getElementById("searchNotes");

const colorButtons = document.querySelectorAll(".color");

// ---------- VARIABLES ----------

let notes = JSON.parse(localStorage.getItem("notes")) || [];

let editingIndex = null;
let currentFilter = "all";
let selectedColor = "yellow";

// ======================================
// SAVE TO LOCAL STORAGE
// ======================================

function saveToStorage(){

    localStorage.setItem("notes", JSON.stringify(notes));

}

// ======================================
// OPEN POPUP
// ======================================

if(addBtn){

    addBtn.addEventListener("click",()=>{

        editingIndex = null;

        titleInput.value = "";
        contentInput.value = "";

        if(categoryInput){

            categoryInput.selectedIndex = 0;

        }

        selectedColor = "yellow";

        document.querySelector(".color.active")?.classList.remove("active");

        document
            .querySelector('.color[data-color="yellow"]')
            ?.classList.add("active");

        popup.style.display = "flex";

    });

}

// ======================================
// CLOSE POPUP
// ======================================

if(popup){

    popup.addEventListener("click",(e)=>{

        if(e.target===popup){

            popup.style.display="none";

        }

    });

}

// ======================================
// CATEGORY ICON
// ======================================

function getCategoryIcon(category){

    switch(category){

        case "Study": return "📚";

        case "Work": return "💼";

        case "Personal": return "🏠";

        case "Ideas": return "💡";

        default: return "📝";

    }

}

// ======================================
// SAVE NOTE
// ======================================

if(saveBtn){

    saveBtn.addEventListener("click",()=>{

        const title = titleInput.value.trim();
        const content = contentInput.value.trim();

        if(title==="" || content===""){

            alert("Please fill all fields.");
            return;

        }

        const note={

            title,

            content,

            category: categoryInput ? categoryInput.value : "General",

            color: selectedColor,

            date: new Date().toLocaleString(),

            pinned:
                editingIndex!==null
                ? notes[editingIndex].pinned
                : false,

            favorite:
                editingIndex!==null
                ? notes[editingIndex].favorite
                : false,

            archived:
                editingIndex!==null
                ? notes[editingIndex].archived
                : false

        };

        if(editingIndex===null){

            notes.push(note);

        }else{

            notes[editingIndex]=note;
            editingIndex=null;

        }

        saveToStorage();

        popup.style.display="none";

        titleInput.value="";
        contentInput.value="";

        if(categoryInput){

            categoryInput.selectedIndex = 0;

        }

        selectedColor="yellow";

        document.querySelector(".color.active")?.classList.remove("active");

        document
            .querySelector('.color[data-color="yellow"]')
            ?.classList.add("active");

        if(typeof renderNotes==="function"){

            renderNotes(searchInput ? searchInput.value : "");

        }

    });

}
// ======================================
// RENDER NOTES
// ======================================

function renderNotes(search=""){

    recentNotes.innerHTML="";

    let filtered=notes.filter(note=>{

        if(note.archived){

            return false;

        }

        const matchesSearch=

            note.title.toLowerCase().includes(search.toLowerCase()) ||

            note.content.toLowerCase().includes(search.toLowerCase());

        if(currentFilter==="all"){

            return matchesSearch;

        }

        if(currentFilter==="favorite"){

            return matchesSearch && note.favorite;

        }

        if(currentFilter==="pinned"){

            return matchesSearch && note.pinned;

        }

        return matchesSearch && note.category===currentFilter;

    });

    filtered.sort((a,b)=>b.pinned-a.pinned);

    if(filtered.length===0){

        recentNotes.innerHTML=`
            <p class="empty">
                No Notes Found
            </p>
        `;

        updateStats();

        return;

    }

    filtered.forEach(note=>{

        const index=notes.indexOf(note);

        recentNotes.innerHTML+=`

        <div class="note ${note.color}">

            <div class="note-header">

                <span class="category">

                    ${getCategoryIcon(note.category)} ${note.category}

                </span>

                <h3>${note.title}</h3>

            </div>

            <div class="note-actions">

                <button class="favorite-btn" data-index="${index}">
                    <i class="fa-${note.favorite ? "solid":"regular"} fa-star"></i>
                </button>

                <button class="pin-btn" data-index="${index}">
                    <i class="fa-solid fa-thumbtack"></i>
                </button>

                <button class="edit-btn" data-index="${index}">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="archive-btn" data-index="${index}">
                    <i class="fa-solid fa-box-archive"></i>
                </button>

                <button class="delete-btn" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

            <p>${note.content}</p>

            <small>${note.date}</small>

        </div>

        `;

    });

    addDeleteEvents();
    addEditEvents();
    addPinEvents();
    addFavoriteEvents();
    addArchiveEvents();

renderArchiveNotes();

renderFavoriteNotes();

updateStats();
}// ======================================
// UPDATE DASHBOARD STATS
// ======================================

function updateStats(){

    const activeNotes = notes.filter(note => !note.archived);

    document.getElementById("notesCount").textContent =
        activeNotes.length;

    document.getElementById("favoriteCount").textContent =
        activeNotes.filter(note => note.favorite).length;

    document.getElementById("pinnedCount").textContent =
        activeNotes.filter(note => note.pinned).length;

    document.getElementById("studyCount").textContent =
        activeNotes.filter(note => note.category==="Study").length;

}
// ======================================
// RENDER FAVORITE NOTES
// ======================================
function renderFavoriteNotes(){

    const favoriteContainer=document.getElementById("favoriteNotes");

    if(!favoriteContainer) return;

    favoriteContainer.innerHTML="";

    const favorites=notes.filter(note=>note.favorite && !note.archived);

    if(favorites.length===0){

        favoriteContainer.innerHTML=`

            <p class="empty">

                No Favorite Notes

            </p>

        `;

        return;

    }

    favorites.forEach(note=>{

        favoriteContainer.innerHTML+=`

            <div class="favorite-card ${note.color}">

                <h4>${note.title}</h4>

                <small>

                    ${getCategoryIcon(note.category)}
                    ${note.category}

                </small>

            </div>

        `;

    });

}
// ======================================
// RENDER ARCHIVED NOTES
// ======================================

function renderArchiveNotes(){

    const archiveContainer = document.getElementById("archiveNotes");

    if(!archiveContainer) return;

    archiveContainer.innerHTML = "";

    const archivedNotes = notes.filter(note => note.archived);

    if(archivedNotes.length === 0){

        archiveContainer.innerHTML = `
            <p class="empty">
                No Archived Notes
            </p>
        `;

        return;

    }

    archivedNotes.forEach(note=>{

        const index = notes.indexOf(note);

        archiveContainer.innerHTML += `

        <div class="note ${note.color}">

          <span class="category">

    ${getCategoryIcon(note.category)}
    ${note.category}

</span>

<h3>${note.title}</h3>

<p>${note.content}</p>
            <small>${note.date}</small>

            <div class="note-actions">

                <button class="restore-btn" data-index="${index}">
                    <i class="fa-solid fa-rotate-left"></i>
                </button>

                <button class="delete-forever-btn" data-index="${index}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>

        </div>

        `;

    });

    addRestoreEvents();

    addDeleteForeverEvents();

}

// ======================================
// RESTORE NOTE
// ======================================

function addRestoreEvents(){

    const restoreButtons = document.querySelectorAll(".restore-btn");

    restoreButtons.forEach(button=>{

        button.onclick = ()=>{

            const index = Number(button.dataset.index);

            notes[index].archived = false;

            saveToStorage();

            renderNotes(searchInput ? searchInput.value : "");

            renderArchiveNotes();

        };

    });

}

// ======================================
// DELETE FOREVER
// ======================================
function addDeleteForeverEvents(){

    const buttons = document.querySelectorAll(".delete-forever-btn");

    buttons.forEach(button=>{

        button.onclick = ()=>{

            const index = Number(button.dataset.index);

            if(!confirm("Delete permanently?")) return;

            notes.splice(index,1);

            saveToStorage();

            renderNotes(searchInput ? searchInput.value : "");

            renderArchiveNotes();

        };

    });

}

// ======================================
// ARCHIVE NOTE
// ======================================
function addArchiveEvents(){

    const archiveButtons=document.querySelectorAll(".archive-btn");

    archiveButtons.forEach(button=>{

        button.onclick=()=>{

            const index=Number(button.dataset.index);

            console.log("Archive clicked", index);

            notes[index].archived=true;

            localStorage.setItem("notes",JSON.stringify(notes));

            console.log(notes);

            renderNotes(searchInput ? searchInput.value : "");

        };

    });

}

// ======================================
// DELETE NOTE
// ======================================

function addDeleteEvents(){

    const deleteButtons=document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button=>{

        button.onclick=()=>{

            const index=Number(button.dataset.index);

            if(!confirm("Delete this note?")) return;

            notes.splice(index,1);

            localStorage.setItem("notes",JSON.stringify(notes));

            renderNotes(searchInput ? searchInput.value : "");

            renderFavoriteNotes();

        };

    });

}

// ======================================
// EDIT NOTE
// ======================================

function addEditEvents(){

    const editButtons=document.querySelectorAll(".edit-btn");

    editButtons.forEach(button=>{

        button.onclick=()=>{

            const index=Number(button.dataset.index);

            editingIndex=index;

            titleInput.value=notes[index].title;
            contentInput.value=notes[index].content;

            if(categoryInput){

                categoryInput.value=notes[index].category;

            }

            selectedColor=notes[index].color;

            document.querySelector(".color.active")?.classList.remove("active");

            document.querySelector(`.color[data-color="${selectedColor}"]`)?.classList.add("active");

            popup.style.display="flex";

        };

    });

}

// ======================================
// PIN NOTE
// ======================================

function addPinEvents(){

    const pinButtons=document.querySelectorAll(".pin-btn");

    pinButtons.forEach(button=>{

        button.onclick=()=>{

            const index=Number(button.dataset.index);

            notes[index].pinned=!notes[index].pinned;

            localStorage.setItem("notes",JSON.stringify(notes));

            renderNotes(searchInput ? searchInput.value : "");

        };

    });

}

// ======================================
// FAVORITE NOTE
// ======================================

function addFavoriteEvents(){

    const favoriteButtons=document.querySelectorAll(".favorite-btn");

    favoriteButtons.forEach(button=>{

        button.onclick=()=>{

            const index=Number(button.dataset.index);

            notes[index].favorite=!notes[index].favorite;

            localStorage.setItem("notes",JSON.stringify(notes));

            renderNotes(searchInput ? searchInput.value : "");

            renderFavoriteNotes();

        };

    });

}

// ======================================
// OPEN ARCHIVE POPUP
// ======================================

if(archivePopupBtn){

    archivePopupBtn.addEventListener("click",()=>{

        renderArchiveNotes();

        archivePopup.style.display="flex";

    });

}

// ======================================
// CLOSE ARCHIVE POPUP
// ======================================

if(closeArchive){

    closeArchive.addEventListener("click",()=>{

        archivePopup.style.display="none";

    });

}

if(archivePopup){

    archivePopup.addEventListener("click",(e)=>{

        if(e.target===archivePopup){

            archivePopup.style.display="none";

        }

    });

}

// ======================================
// SEARCH
// ======================================

if(searchInput){

    searchInput.addEventListener("input",()=>{

        renderNotes(searchInput.value);

    });

}

// ======================================
// COLOR PICKER
// ======================================

colorButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelector(".color.active")?.classList.remove("active");

        button.classList.add("active");

        selectedColor=button.dataset.color;

    });

});

// ======================================
// SMART FILTERS
// ======================================

const filterButtons=document.querySelectorAll(".filter-btn");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        document.querySelector(".filter-btn.active")?.classList.remove("active");

        button.classList.add("active");

        currentFilter=button.dataset.filter;

        renderNotes(searchInput ? searchInput.value : "");

    });

});

// ======================================
// INITIAL LOAD
// ======================================

renderNotes(searchInput ? searchInput.value : "");

renderFavoriteNotes();

updateStats();