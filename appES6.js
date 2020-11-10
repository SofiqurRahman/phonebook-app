// contact class
class Contact{
  constructor(name,email,phone,birthday) {
    this.name=name;
    this.email=email;
    this.phone=phone;
    this.birthday=birthday;
  }
}

// ui class
class UI{
  // add new contact
  addContactToList(contact){
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

  // show alert
  showAlert(msg,alertType){
    // create div
    const div=document.createElement('div');
    // add class
    div.className=`alert alert-${alertType}`;
    // add text
    div.appendChild(document.createTextNode(msg));
    // get parent
    const card=document.querySelector('.card');
    // get form
    const cardAction=document.querySelector('.card-action');
    // insert alert
    card.insertBefore(div,cardAction);
    // timeout 2 sec for alert dismiss
    setTimeout(function(){
      document.querySelector('.alert').remove();
    },2000);
  }

  // delete contact
  deleteContactFromList(target){
    if(target.classList.contains('delete')){
      if(confirm('Are you sure?')){
        // show progress
        document.querySelector('.progress').style.display='block';
        setTimeout(function(){
          // hide progress
          document.querySelector('.progress').style.display='none';
          target.parentElement.parentElement.remove();
          // remove from localStorage
          Store.removeContact(target.parentElement.parentElement.children[2].textContent);
          const ui=new UI();
          // show message
          ui.showAlert('Contact Removed!','danger');
        },1000);
      }
    }
  }

  // search contact
  searchContact(value){
    const rows=document.querySelectorAll('#contact-list tr');
    rows.forEach(function(row){
      if(row.children[0].textContent.indexOf(value) != -1){
        row.style.display='table-row';
      }else{
        row.style.display='none';
      }
    })
  }

  // clear fields
  clearFields(){
    document.getElementById('name').value='';
    document.getElementById('email').value='';
    document.getElementById('phone').value='';
    document.getElementById('birthday').value='';
  }
}

// local storage
class Store{
  static getContact(){
    let contact;
    if (localStorage.getItem('contacts')===null) {
      contact=[];
    } else {
      contact=JSON.parse(localStorage.getItem('contacts'));
    }
    return contact;
  }
  static displayContact(){
    const contacts=Store.getContact();
    contacts.forEach(function(contact){
      const ui=new UI();
      ui.addContactToList(contact);
    })
  }
  static addContact(contact){
    // book from localStorage
    const contacts=Store.getContact();
    // push new book into book array with previous array
    contacts.push(contact);
    localStorage.setItem('contacts',JSON.stringify(contacts));
  }
  static removeContact(phone){
    const contacts=Store.getContact();
    contacts.forEach((contact,index)=>{
      if(contact.phone===phone){
        contacts.splice(index, 1);
      }
    })
    localStorage.setItem('contacts',JSON.stringify(contacts));
  }
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
    // show progress
    document.querySelector('.progress').style.display='block';
    setTimeout(function(){
      // hide progress
      document.querySelector('.progress').style.display='none';
      // error alert
      ui.showAlert('Please Fill Name & Phone Fields','danger');
    },500);
  }else{
    // show progress
    document.querySelector('.progress').style.display='block';
    setTimeout(function(){
      // hide progress
      document.querySelector('.progress').style.display='none';
      ui.addContactToList(contact);
      Store.addContact(contact);
      ui.clearFields();
      // success alert
      ui.showAlert('New Contact Added','success');
    },1000);
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

// DOM load event
document.addEventListener('DOMContentLoaded',Store.displayContact());