/*
Copilot Prompt:
Create JavaScript logic for Contact Book:
- Store contacts in an array
- Add contact (name, phone, email, category)
- Display contacts in table
- Edit contact functionality
- Delete contact functionality
- Search contact by name
- Save contacts to file using Blob
- Clear input fields after adding
- Use functions:
    addContact()
    displayContacts()
    editContact(index)
    deleteContact(index)
    searchContact()
    saveContacts()
*/
let contacts = [];

document.getElementById("addContactBtn").addEventListener("click", addContact);
document.getElementById("saveContactsBtn").addEventListener("click", saveContacts);
document.getElementById("searchInput").addEventListener("keyup", searchContact);

function addContact(){

let name = document.getElementById("name").value.trim();
let phone = document.getElementById("phone").value.trim();
let email = document.getElementById("email").value.trim();
let category = document.getElementById("category").value;

if(!name || !phone || !email || !category){
alert("Fill all fields");
return;
}

contacts.push({name,phone,email,category});
displayContacts();

document.getElementById("name").value="";
document.getElementById("phone").value="";
document.getElementById("email").value="";
document.getElementById("category").value="";
}

function displayContacts(){

let body = document.getElementById("contactTableBody");
body.innerHTML="";

contacts.forEach((c,index)=>{

body.innerHTML += `
<tr>
<td>${c.name}</td>
<td>${c.phone}</td>
<td>${c.email}</td>
<td>${c.category}</td>
<td>
<button onclick="editContact(${index})">Edit</button>
<button onclick="deleteContact(${index})">Delete</button>
</td>
</tr>
`;
});
}

function editContact(index){

let c = contacts[index];

document.getElementById("name").value = c.name;
document.getElementById("phone").value = c.phone;
document.getElementById("email").value = c.email;
document.getElementById("category").value = c.category;

contacts.splice(index,1);
displayContacts();
}

function deleteContact(index){
contacts.splice(index,1);
displayContacts();
}

function searchContact(){

let search = document.getElementById("searchInput").value.toLowerCase();

let rows = document.querySelectorAll("#contactTableBody tr");

rows.forEach(row=>{
let name = row.children[0].textContent.toLowerCase();
row.style.display = name.includes(search) ? "" : "none";
});
}

function saveContacts(){

let data = JSON.stringify(contacts,null,2);

let blob = new Blob([data],{type:"text/plain"});

let link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "contacts.txt";
link.click();
}