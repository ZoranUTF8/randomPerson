import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage =
  "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-600w-373243873.jpg";

function App() {
  //! hooks
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  //! custom functions
  //? get data from API
  const fetchUser = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const person = data.results[0];
    const { phone, email } = person;
    //? different ways for destructuring nested objects
    const { large: image } = person.picture;
    const {
      login: { password },
    } = person;
    const { first, last } = person.name;
    const {
      dob: { age },
    } = person;
    const {
      street: { number, name },
    } = person.location;

    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    };
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  //? fetch user when app renders only
  useEffect(() => {
    fetchUser(url);
  }, []);

  //? change value on hover over element
  const handleValue = (e) => {
    //? check if the hovered button has the class of icon
    if (e.target.classList.contains("icon")) {
      //? get the data value of the hovered button
      const newValue = e.target.dataset.label;
      setValue(person[newValue])
      setTitle(newValue)
    }
  };

  //! main return
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          {/* if person image not available than display default image */}
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />

          <p className="user-title"> My {title} is:</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            {/* data label that helps us know which value are we hovering over and which value to change to */}
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={fetchUser}>
            {loading ? "loading..." : "Random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
