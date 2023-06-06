const URL_BASE = "http://localhost:3300";
// pages
const homepage = document.getElementById('homepage');
const loginpage = document.getElementById('loginpage');
const regpage = document.getElementById('register');

// button
const unamebtn = document.getElementById('uname');
const loginbtn = document.getElementById('login');
const logoutbtn = document.getElementById('logout');
const refreshbtn = document.getElementById('save');
const savebtn = document.getElementById('refresh');

// input elements
let loginuid = document.getElementById('loginuid');
let loginpwd = document.getElementById('loginpwd');
let reguid = document.getElementById('reguid');
let regpwd = document.getElementById('regpwd');
let regcpwd = document.getElementById('regcpwd');

let errmsg = document.getElementById('loginmsg');
let regmsg = document.getElementById('regmsg');
const inputText = document.getElementById('task');
const list = document.getElementById('list');


function addTodo() {
    let text = inputText.value;
    if (text == '') return;

    let li = document.createElement('li');
    li.classList.add(['list-items']);
    let span = document.createElement('span');
    li.innerHTML = text;

    li.onclick = toggleTick;
    span.onclick = removeitem;
    li.appendChild(span);
    list.appendChild(li);

    inputText.value = "";
    saveData();


}

function toggleTick(e) {
    e.target.classList.toggle("checked");
    saveData();
}

function removeitem(e) {
    e.target.parentElement.remove();
    saveData();
}

function saveData() {
    let data = { todo: [] };
    let todo = [];
    listitem = document.getElementsByClassName('list-items')
    for (let i = 0; i < listitem.length; i++) {
        li = {
            value: listitem[i].innerText,
            class: listitem[i].className
        }
        todo.push(li);
    }
    data.todo = todo;
    data = JSON.stringify(data);
    localStorage.setItem("data", data);

}

function processData() {
    list.innerHTML = ""
    data = localStorage.getItem("data");
    if (!data) return;
    data = JSON.parse(data);
    let todo = data.todo;
    for (let i = 0; i < todo.length; i++) {
        let li = document.createElement('li');
        li.className = todo[i].class;
        let span = document.createElement('span');
        li.innerHTML = todo[i].value;
        li.onclick = toggleTick;
        span.onclick = removeitem;
        li.appendChild(span);
        list.appendChild(li);
    }
}

function main() {
    processData();
    showHomepage();
}
main();

// show page ---------------------------------------------------

function showHomepage() {
    // page
    homepage.classList.remove(['hidden']);
    regpage.classList.add(['hidden']);
    loginpage.classList.add(['hidden']);

    // button
    let isLoggedin = localStorage.getItem("isLoggedin");
    let uid = localStorage.getItem("uid");
    if (isLoggedin) {
        loginbtn.classList.add(['hidden']);
        logoutbtn.classList.remove(['hidden']);
        unamebtn.classList.remove(['hidden']);
        unamebtn.innerText = uid;
        refreshbtn.classList.remove(['hidden']);
        savebtn.classList.remove(['hidden']);
    } else {
        loginbtn.classList.remove(['hidden']);
        logoutbtn.classList.add(['hidden']);
        unamebtn.classList.add(['hidden']);
        refreshbtn.classList.add(['hidden']);
        savebtn.classList.add(['hidden']);
    }

}
function showRegpage() {
    // page
    homepage.classList.add(['hidden']);
    regpage.classList.remove(['hidden']);
    loginpage.classList.add(['hidden']);

    // button
    loginbtn.classList.add(['hidden']);
    logoutbtn.classList.add(['hidden']);
    unamebtn.classList.add(['hidden']);
    refreshbtn.classList.add(['hidden']);
    savebtn.classList.add(['hidden']);
}

function showLoginpage() {
    // page
    homepage.classList.add(['hidden']);
    regpage.classList.add(['hidden']);
    loginpage.classList.remove(['hidden']);

    // button
    loginbtn.classList.add(['hidden']);
    logoutbtn.classList.add(['hidden']);
    unamebtn.classList.add(['hidden']);
    refreshbtn.classList.add(['hidden']);
    savebtn.classList.add(['hidden']);

}

// api call----------------------------------------------
async function call(route, method, data) {
    let URL = URL_BASE + route;
    let res = await fetch(URL, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    res = await res.json();
    return res;

}
function clearAll() {
    localStorage.clear();
}

function notify(msg) {
    console.log(msg)
}
function loginHelper(data) {
    console.log(data);
    if (!data.status) {
        errmsg.innerText = data.msg;
        return;
    }
    localStorage.setItem("auth", data.auth);
    localStorage.setItem("data", data.data);
    localStorage.setItem("isLoggedin", true);
    localStorage.setItem("uid", data.uid);
    errmsg.innerText = '';
    processData();
    showHomepage();
}
function putHelper(data) {
    if (!data.status) {
        showLoginpage();
        clearAll();
    } else {
        notify("Saved !");
    }
}

function getHelper(data) {
    console.log(data);
    if (!data.status) {
        showLoginpage();
        clearAll();
        return;
    }
    notify("Data Fetched");
    localStorage.setItem("data", data.data);
    processData();
}

function regHelper(data) {
    console.log(data);
    if (!data.status) {
        regmsg.innerText = data.msg;
        return;
    }
    localStorage.setItem("auth", data.auth);
    localStorage.setItem("isLoggedin", true);
    localStorage.setItem("uid", data.uid);
    errmsg.innerText = '';
    showHomepage();
}
function login() {
    let data = { uid: loginuid.value, pwd: loginpwd.value };
    call("/login", "POST", data)
        .then(loginHelper)
        .catch(err => console.log(err))
}

function putData() {
    let auth = localStorage.getItem("auth");
    let localData = localStorage.getItem("data");
    localData = JSON.parse(localData);

    call("/data", "PUT", { auth, data: localData })
        .then(putHelper)
        .catch(err => console.log(err))
}

function getData() {
    let auth = localStorage.getItem("auth");

    call("/data", "POST", { auth })
        .then(getHelper)
        .catch(err => console.log(err))
}

function logout() {
    let auth = localStorage.getItem("auth");

    call("/logout", "POST", { auth })
        .then(() => {
            clearAll();
            processData();
            showHomepage();
        })
        .catch(err => console.log(err))
}

function reg() {
    let data = {
        uid: reguid.value,
        pwd: regpwd.value,
        cpwd: regcpwd.value
    }

    call('/reg', "POST", data)
        .then(regHelper)
        .catch(err => console.log(err))
}