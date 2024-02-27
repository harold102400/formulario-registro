const zodialSigns = [];
let users = [];
let edit = false;
const obj = {
    id: "",
    name: "",
    lastname: "",
    phone: "",
    email: "",
    badge: "",
    dob: ""
}

const form = document.getElementById('form');
const formName = document.getElementById('name');
const formLastname = document.getElementById('lastname');
const phone = document.getElementById('phone');
const email = document.getElementById('email');
const badge = document.getElementById('badge');
const dob = document.getElementById('dob');

///Generate random ID function///
function randomId()
{
    return Math.floor(Math.random() * 1000000000);
}