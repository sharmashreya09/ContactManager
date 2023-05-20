
import './App.css';
import AddContact from './AddContact';
import CntctList from './CntctList';
import Header from './Header';
import { useState,useEffect } from 'react';
import { v4 as uuid } from "uuid";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Contactdetail from './Contactdetail';
import EditContact from "./EditContact";
import api from "../api/contacts"

function App() {
  const LOCAL_STORAGE_KEY="contacts"
   const [contacts,setContacts]=useState([])
   const[searchterm,setSearchterm]=useState("")
   const[searchresults,setSearchResults]=useState([])

   const getsearchterm=(searchterm)=>{
        console.log(searchterm)
        setSearchterm(searchterm)
        if(searchterm!=="")
        {
          const results=contacts.filter((contact)=>{
             return Object.values(contact).join("").toLowerCase().includes(searchterm.toLowerCase());
          })
          setSearchResults(results)
        }
        else
        {
          setSearchResults(contacts);
        }
      
        
   }

   const editContactHandler = async (contact) => {
     const response = await api.put(`/contacts/${contact.id}`, contact);
     const { id } = response.data;
     setContacts(
       contacts.map((contact) => {
         return contact.id === id ? { ...response.data } : contact;
       })
     );
   };

   //retrieve contacts

   const retrieveContact= async()=> {
    const response= await api.get("/contacts")
    return response.data;
   }
   const addContactHandler= async(contact)=>{
         
        const request={
          id:uuid(),
          ...contact
        }
        const response= await api.post("/contacts",request)
       
         setContacts([...contacts,response.data])
   }

   const removeContactHandler= async (id)=>{
        await api.delete(`/contacts/${id}`)
       const newContactList = contacts.filter((contact) => {
         return contact.id !== id;
       });

       setContacts(newContactList);
   }
useEffect(() => {
    //const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    //if (retriveContacts) setContacts(retriveContacts);
    const getallcontacts= async()=>{
      const allcontact=await retrieveContact();
      if (allcontact)
      {
        setContacts(allcontact);
      }
    
    }
    getallcontacts();
  }, []);

  useEffect(() => {
   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

     return (
       <div className="ui container">
         <Router>
           <Header />
           <Switch>
             <Route
               path="/"
               exact
               render={(props) => (
                 <CntctList
                   {...props}
                   contacts={searchterm.length<1?contacts:searchresults}
                   getContactid={removeContactHandler}
                   term={searchterm}
                   getsearchterm={getsearchterm}
                 />
               )}
             ></Route>
             <Route
               path="/addcontact"
               render={(props) => (
                 <AddContact {...props} addContactHandler={addContactHandler} />
               )}
             ></Route>
             <Route path="/contact/:id" component={Contactdetail} />
             <Route
               path="/edit"
               render={(props) => (
                 <EditContact {...props} editContactHandler={editContactHandler} />
               )}
             />
           </Switch>
         </Router>
       </div>
     );
}

export default App;
