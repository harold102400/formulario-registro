const zodialSigns = ["Acuario", "Piscis", "Aries", "Tauro", "Géminis","Cáncer","Leo", "Virgo", "Libra", "Escorpio", "Sagitario","Capricornio"];
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

form.addEventListener('submit', validate);

function validate(){}

///Generate random ID function///
function randomId()
{
    return Math.floor(Math.random() * 1000000000);
}

////Local storage functions////
function saveOnLocalStorage(users)
{
    localStorage.setItem('users', JSON.stringify(users));
}

function getLocalStorage()
{
    users = JSON.parse(localStorage.getItem('users'));
    showUsers();
}

/////Crud functions/////

function addNewUser()
{
    users.push({...obj});
    saveOnLocalStorage(users);
    getLocalStorage();
    resetFields();
    form.reset();
}

function selectUser(user)
{
    obj.id = user.id;
    formName.value = user.name;
    formLastname.value = user.lastname;
    phone.value = user.phone;
    email.value = user.email;
    badge.value = user.badge;
    dob.value = user.dob;

    form.querySelector('button[type="submit"]').textContent = "Editando Usuario";
    edit=true;
}

function editUser()
{
    obj.name = formName.value
    obj.lastname = formLastname.value
    obj.phone = phone.value
    obj.email = email.value
    obj.badge = badge.value
    obj.dob = dob.value

    users.forEach(user => {
        if(user.id === obj.id){
            user.name = obj.name;
            user.lastname = obj.lastname;
            user.phone = obj.phone;
            user.email = obj.email;
            user.badge = obj.badge;
            user.dob = obj.dob;
        }
    })

    saveOnLocalStorage(users);
    getLocalStorage();
    resetFields();
    form.reset();
    form.querySelector('button[type="submit"]').textContent = "Agregar usuario";
}

function deleteUser(id)
{
    users = users.filter(user => user.id !== id);
    saveOnLocalStorage(users);
    getLocalStorage();
}

/////Show users on the HTML from javascript///////


function showUsers()
{
    const tbody = document.querySelector('#tbody');
    tbody.innerHTML = "";
    ///es posible destructurar el obj user pero no lo voy hacer////
    users.forEach(user => {
        const tr = document.createElement('tr');
        const tdActions = document.createElement('td');

        const thId = document.createElement('th');
        thId.textContent = `${user.id}`
   

        const tdName = document.createElement('td');
        tdName.textContent = `${user.name}`

        const tdLastname = document.createElement('td');
        tdLastname.textContent = `${user.lastname}`

        const tdPhone = document.createElement('td');
        tdPhone.textContent = `${user.phone}`

        const tdEmail = document.createElement('td');
        tdEmail.textContent = `${user.email}`

        const tdBadge = document.createElement('td');
        tdBadge.textContent = `${user.badge}`

        const tdDob = document.createElement('td');
        tdDob.textContent = `${user.dob}`
        console.log(user.dob);

        let zodialSignTxt = zodialSign(user.dob);
        const tdZodialSign = document.createElement('td');
        tdZodialSign.textContent = `Tu Zigno del Sodiaco es: ${zodialSignTxt}`;

        const editBtn = document.createElement('button');
        editBtn.textContent = "Editar";
        editBtn.onclick = () => selectUser(user);
        editBtn.classList.add("btn", "btn-warning", "ml-1")

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Eliminar";
        removeBtn.onclick = () => deleteUser(user.id);
        removeBtn.classList.add("btn", "btn-danger")

        tdActions.append(editBtn, removeBtn);
        tr.append(thId, tdName, tdLastname, tdPhone, tdEmail, tdBadge, tdDob, tdActions, tdZodialSign);
        tbody.append(tr);
    })
}

function zodialSign(month)
{
    const d = new Date(month);
    return zodialSigns[d.getMonth()];
}