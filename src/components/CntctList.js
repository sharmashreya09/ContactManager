import React ,{useRef}from 'react'
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CntctList = (props) => {
   console.log(props);
   const inputel=useRef("")
    const deleteContactHandler = (id) => {
      props.getContactid(id);
    };

   const renderContactList = props.contacts.map((contact) => {
     return (
       <ContactCard contact={contact} clickHander={deleteContactHandler}/>
     );
   });
   const findSearchTerm=()=>{
      props.getsearchterm(inputel.current.value);
   }
  
    return (
      <div className="main">
        <h2>
          Contact List
          <Link to="/addcontact">
            <button
              className="ui button blue right "
              style={{ float: "right" }}
            >
              Add Contact
            </button>
          </Link>
        </h2>
        <div className="ui search">
          <div className="ui icon input" style={{width:"50%"}}>
            <input
            ref={inputel}
              type="text"
              placeholder="Search Contacts"
              className="prompt"
              value={props.term}
              onChange={findSearchTerm}
            />
            <i className="search icon"></i>
          </div>
        </div>

        <div className="ui celled list">{renderContactList}</div>
      </div>
    );

  
}

export default CntctList