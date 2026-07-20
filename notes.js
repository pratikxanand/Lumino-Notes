const recentNotes=document.getElementById("recentNotes");

const notes=JSON.parse(localStorage.getItem("notes")) || [];

if(notes.length===0){

recentNotes.innerHTML=`

<div class="note">

<h3>No Notes Yet</h3>

<p>Create your first note.</p>

</div>

`;

}

else{

notes.slice(-3).reverse().forEach(note=>{

recentNotes.innerHTML+=`

<div class="note">

<h3>${note.title}</h3>

<p>${note.content.substring(0,60)}...</p>

</div>

`;

});

}

//header


