// contact constructor
function Contact(name, email, phone, birthday){
  this.name=name;
  this.email=email;
  this.phone=phone;
  this.birthday=birthday;
}
// ui constructor
function UI(){}
// add new contact
UI.prototype.addContactToList=function(contact){
  // console.log(contact);
  const list=document.getElementById('contact-list');
  // create tr element
  const row=document.createElement('tr');
  // insert column
  row.innerHTML=`
    <td>${contact.name}</td>
    <td>${contact.email}</td>
    <td>${contact.phone}</td>
    <td>${contact.birthday}</td>
    <td><a class='btn btn-floating delete'>x</a></td>
  `;
  list.appendChild(row);
}
// delete contact
UI.prototype.deleteContactFromList=function(target){
  // console.log(target);
  if(target.classList.contains('delete')){
    if(confirm('Are you sure?')){
      target.parentElement.parentElement.remove();
    }
  }
}
// search contact
UI.prototype.searchContact=function(value){
  const rows=document.querySelectorAll('#contact-list tr');
  rows.forEach(function(row){
    if(row.children[0].textContent.indexOf(value) != -1){
      row.style.display='table-row';
    }else{
      row.style.display='none';
    }
  })
}
// show alert
UI.prototype.showAlert=function(){}
// clear fields
UI.prototype.clearFields=function(){
  document.getElementById('name').value='';
  document.getElementById('email').value='';
  document.getElementById('phone').value='';
  document.getElementById('birthday').value='';
}
// submit event
document.getElementById('contact-form').addEventListener('submit',function(e){
  e.preventDefault();

  const name=document.getElementById('name').value,
        email=document.getElementById('email').value,
        phone=document.getElementById('phone').value,
        birthday=document.getElementById('birthday').value;
  // instantiate contact
  const contact=new Contact(name,email,phone,birthday);
  // instantiate UI
  const ui=new UI();

  if(name === '' || phone === ''){
    // error or alert
    // console.log('Error')
  }else{
    ui.addContactToList(contact);
    ui.clearFields();
  }
})

// delete event
document.getElementById('contact-list').addEventListener('click',function(e){
  // instantiate ui
  const ui=new UI();
  ui.deleteContactFromList(e.target);
})

// search event
document.getElementById('search').addEventListener('keyup',function(e){
  // instantiate ui
  const ui=new UI();
  ui.searchContact(e.target.value);
})