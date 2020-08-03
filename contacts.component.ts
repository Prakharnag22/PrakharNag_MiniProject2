import { Component, OnInit } from '@angular/core';
import {Contact} from './contact';
import {ContactService} from './contactService'; 
import { FormGroup,FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
contact:Contact;
contacts:Contact[];
contactSearch:string;
sorting:boolean;
// phoneBookService:ContactService;

myForm:FormGroup;

  constructor(private phoneBookService:ContactService)
  {
   this.contact = new Contact();
   this.contacts=[];
   this.sorting=false;
   this.contacts= this.phoneBookService.viewContact();
  

    this.myForm=new FormGroup({
      firstname:new FormControl(null,Validators.required),
      lastname:new FormControl(null,Validators.required),
      contactno:new FormControl(null,Validators.required)

    })

    

  }
  public get firstname()
  {
    return this.myForm.get('firstname');
  }

  public get lastname()
  {
    return this.myForm.get('lastname');
  }

  public get contactno()
  {
    return this.myForm.get('contactno');
  }

  dialogBox(modal)
  {
    modal.style.display="block";

  }
  add()
  {
    
    if(this.myForm.valid)
    {
      this.contact.firstname=this.firstname.value;
      this.contact.lastname=this.lastname.value;
      this.contact.contactno=this.contactno.value;
      console.log("in add function : "+this.contact);
      this.phoneBookService.addContact(this.contact);
      this.myForm.reset();
      this.contacts= this.phoneBookService.viewContact();
      this.contact = new Contact();
    }
  }

    delete(addeditem)
    {
      var index = this.contacts.indexOf(addeditem);
      this.phoneBookService.deleteContact(index);
    }

    search(contactSearch)
    {
      if(this.contactSearch!="")
      {
       this.contacts=this.phoneBookService.searchContact(this.contactSearch);
      }
      else
      {
        this.contacts=this.phoneBookService.viewContact();
      }
     
    }
    update(cont,modal)
    {
      modal.style.display="block";
      this.contact.firstname=cont.firstname;
      this.contact.lastname=cont.lastname;
      this.contact.contactno=cont.contactno;
    }
    updateContacts(f_name,l_name,cont_no)
    { if(cont_no.value!="")
    {
      this.contact = new Contact();
      this.contact.firstname=f_name.value;
      this.contact.lastname=l_name.value;
      this.contact.contactno=cont_no.value;
      this.contacts=this.phoneBookService.updateContact(this.contact);
      console.log("Hello in update "+f_name.value);
    }
        
    }

    sort()
    {
      this.sorting!=this.sorting;
      this.contacts=this.phoneBookService.sortContact(this.sorting);

    }
  close(modal)
  {
    modal.style.display="none";
  }

  ngOnInit(): void {
  }

}
