import React from 'react'
import user from "../images/user.png";
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const ContactCard = (props) => {
    const {id,name,email}=props.contact
  return (
    <div>
      <div className="item">
        <img className="ui avatar image" src={user} alt="user" />
        <div className="content">
          <Link
            to={{
              pathname: `contact/${id}`,
              state: { contact: props.contact },
            }}
          >
            <div
              className="header"
              style={{ color: "black", fontWeight: "bold" }}
            >
              {name}
            </div>
            <div style={{ color: "black" }}>{email}</div>
          </Link>
        </div>
        <i
          className="trash alternate outline icon"
          style={{ color: "red", marginLeft: "10px" }}
          onClick={() => props.clickHander(id)}
          key={id}
        ></i>
        <Link
          to={{
            pathname: `/edit`,
            state: { contact: props.contact },
          }}
        >
          <i
            className="edit alternate outline icon"
            style={{ color: "blue" }}
            key={id}
          ></i>
        </Link>
      </div>
    </div>
  );
}

export default ContactCard