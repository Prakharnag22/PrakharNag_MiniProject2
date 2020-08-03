import {Contact} from './contact';

export class ContactService{
   phoneBookService:ContactService;
   private  contacts: Contact[];
   private searchContacts: Contact[];
   constructor()
   {   
       this.contacts=[];
       this.searchContacts=[];
       var contact1;
       contact1 = new Contact();
       contact1.firstname ="Prakhar";
       contact1.lastname="Nag";
       contact1.contactno=9874563210;

       this.contacts.push(contact1);
       console.log(contact1);

   }
   addContact(c:Contact)
   {
       this.contacts.push(c);
       return this.contacts;
   }

   viewContact()
   {
       return this.contacts;
   }

   deleteContact(index:number)
   {
       this.contacts.splice(index,1);
   }

   searchContact(contactSearch:string):Contact[]
   {   
       if(contactSearch=="")
       {
           return this.contacts;
       }
       else
       {   this.searchContacts=[];
   
           for(let index=0; index<this.contacts.length;index++)
           {
               if(contactSearch.toLowerCase()==this.contacts[index].firstname.toLowerCase() || contactSearch.toLowerCase()==this.contacts[index].lastname.toLowerCase() ||contactSearch==this.contacts[index].contactno.toString() )
               {
                   this.searchContacts.push(this.contacts[index]);
               }
           }
           return this.searchContacts;
       }
    
   }

   updateContact(uCont:Contact):Contact[]{
       for(let index=0; index<this.contacts.length;index++)
       {
           if(uCont.firstname==this.contacts[index].firstname || uCont.lastname==this.contacts[index].lastname ||uCont.contactno== this.contacts[index].contactno )
          {
            this.contacts[index].firstname=uCont.firstname;
           this.contacts[index].lastname=uCont.lastname;
           this.contacts[index].contactno=uCont.contactno;
           break;
          } 
           else
            {
             this.phoneBookService.addContact(uCont);   
            }
       }
       
    return this.contacts;

   }

   sortContact(sortCon:boolean):Contact[]
   {
        if(sortCon==true)
        {
            this.contacts=this.contacts.sort((con1,con2)=>{
                {
                    if(con1.firstname>con2.firstname)
                    {
                        return -1;
                    }
                    else
                        if(con1.firstname<con2.firstname)
                        {
                            return 1;
                        }
                        else
                            if(con1.firstname==con2.firstname)
                            {
                                if(con1.lastname>con2.lastname)
                                {
                                    return -1;
                                }
                                else
                                    return 1;
                            }
                }
                return 0;
            });
            
        }
        else
        {
            this.contacts=this.contacts.sort((con1,con2)=>{
                if(con1.firstname>con2.firstname)
                    {
                        return 1;
                    }
                    else
                        if(con1.firstname<con2.firstname)
                        {
                            return -1;
                        }
                        else
                            if(con1.firstname==con2.firstname)
                            {
                                if(con1.lastname>con2.lastname)
                                {
                                    return 1;
                                }
                                else
                                    return -1;
                            }
                return 0;
            });
        }
        return this.contacts;
   }

}

