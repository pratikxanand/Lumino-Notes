// ======================================
// LUMINO LOGIN
// PART 1
// ======================================

// ---------- LOGIN ELEMENTS ----------

const loginPopup = document.getElementById("loginPopup");
const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const togglePassword = document.getElementById("togglePassword");

const loginNow = document.getElementById("loginNow");

// ---------- REGISTER ELEMENTS ----------

const registerPopup = document.getElementById("registerPopup");

const registerBtn = document.getElementById("registerBtn");

const closeRegister = document.getElementById("closeRegister");

const backToLogin = document.getElementById("backToLogin");

// ======================================
// OPEN LOGIN
// ======================================

if(openLogin){

    openLogin.addEventListener("click",()=>{

        loginPopup.style.display="flex";

    });

}

// ======================================
// CLOSE LOGIN
// ======================================

if(closeLogin){

    closeLogin.addEventListener("click",()=>{

        loginPopup.style.display="none";

    });

}

// ======================================
// CLOSE BY CLICKING OUTSIDE
// ======================================

if(loginPopup){

    loginPopup.addEventListener("click",(e)=>{

        if(e.target===loginPopup){

            loginPopup.style.display="none";

        }

    });

}

// ======================================
// ESC KEY
// ======================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        if(loginPopup){

            loginPopup.style.display="none";

        }

        if(registerPopup){

            registerPopup.style.display="none";

        }

    }

});

// ======================================
// SHOW / HIDE PASSWORD
// ======================================

if(togglePassword){

    togglePassword.addEventListener("click",()=>{

        if(loginPassword.type==="password"){

            loginPassword.type="text";

            togglePassword.classList.replace("fa-eye","fa-eye-slash");

        }else{

            loginPassword.type="password";

            togglePassword.classList.replace("fa-eye-slash","fa-eye");

        }

    });

}

// ======================================
// LOGIN
// ======================================

if(loginNow){

loginNow.addEventListener("click",()=>{

    const email = loginEmail.value.trim();

    const password = loginPassword.value.trim();

    if(email==="" || password===""){

        alert("Please fill all fields.");

        return;

    }

    // Load all users

    const users = JSON.parse(localStorage.getItem("luminoUsers")) || [];

    // Find matching account

    const user = users.find(u=>

        u.email===email &&

        u.password===password

    );

    if(!user){

        alert("Invalid Email or Password");

        return;

    }

    // Save logged in user

    localStorage.setItem("currentUser",user.email);

    // Login Animation

    loginNow.innerHTML=`
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        Logging In...
    `;

    loginNow.disabled=true;

    setTimeout(()=>{

        loginPopup.style.display="none";

        loginNow.disabled=false;

        loginNow.innerHTML="Login";

        const welcome=document.getElementById("welcomeUser");

        if(welcome){

            welcome.textContent=` ${user.name} `;

        }

    },1000);

});

}
// ======================================
// REGISTER POPUP
// ======================================

if(registerBtn){

    registerBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        loginPopup.style.display="none";

        registerPopup.style.display="flex";

    });

}

// ======================================
// CLOSE REGISTER
// ======================================

if(closeRegister){

    closeRegister.addEventListener("click",()=>{

        registerPopup.style.display="none";

    });

}

// ======================================
// BACK TO LOGIN
// ======================================

if(backToLogin){

    backToLogin.addEventListener("click",(e)=>{

        e.preventDefault();

        registerPopup.style.display="none";

        loginPopup.style.display="flex";

    });

}

// ======================================
// CLICK OUTSIDE REGISTER
// ======================================

if(registerPopup){

    registerPopup.addEventListener("click",(e)=>{

        if(e.target===registerPopup){

            registerPopup.style.display="none";

        }

    });

}

// ======================================
// CREATE ACCOUNT
// ======================================

const createAccount = document.getElementById("createAccount");

if(createAccount){

createAccount.addEventListener("click",()=>{

    const name = document.getElementById("registerName").value.trim();

    const email = document.getElementById("registerEmail").value.trim();

    const password = document.getElementById("registerPassword").value.trim();

    if(name==="" || email==="" || password===""){

        alert("Please fill all fields.");

        return;

    }

    // Load existing users

    let users = JSON.parse(localStorage.getItem("luminoUsers")) || [];

    // Check duplicate email

    const alreadyExists = users.some(user=>user.email===email);

    if(alreadyExists){

        alert("This email is already registered.");

        return;

    }

    // Create new user

    users.push({

        name:name,

        email:email,

        password:password

    });

    // Save all users

    localStorage.setItem(

        "luminoUsers",

        JSON.stringify(users)

    );

    alert("🎉 Account Created Successfully");

    // Clear fields

    document.getElementById("registerName").value="";

    document.getElementById("registerEmail").value="";

    document.getElementById("registerPassword").value="";

    // Open Login

    registerPopup.style.display="none";

    loginPopup.style.display="flex";

});

}

// ======================================
// AUTO LOGIN
// ======================================

window.addEventListener("DOMContentLoaded", () => {

    const currentUser = localStorage.getItem("currentUser");

    if(!currentUser) return;

    const users = JSON.parse(localStorage.getItem("luminoUsers")) || [];

    const user = users.find(u => u.email === currentUser);

    if(!user) return;

    const welcome = document.getElementById("welcomeUser");

    if(welcome){

        welcome.textContent = ` ${user.name}`;

    }

});

// ======================================
// LOGOUT
// ======================================

const logoutBtn = document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",()=>{

        if(confirm("Logout from Lumino?")){

            localStorage.removeItem("currentUser");

            location.reload();

        }

    });

}