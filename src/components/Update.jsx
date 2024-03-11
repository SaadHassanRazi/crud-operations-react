import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [date,setDate] = useState('')

  const [id, setID] = useState(null);
  let navigate = useNavigate()
  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setFirstName(localStorage.getItem("First Name"));
    setLastName(localStorage.getItem("Last Name"));
    setCheckbox(localStorage.getItem("Checkbox Value"));
    setDate(localStorage.getItem("Date"));
    // const retrievedId = localStorage.getItem("ID");
    // const retrievedFirstName = localStorage.getItem("FirstName");
    // const retrievedLastName = localStorage.getItem("LastName");
    // const retrievedCheckbox = localStorage.getItem("Checkbox Value");

    //     setID(retrievedId || "");
    //     setFirstName(retrievedFirstName || "");
    //     setFirstName(retrievedLastName || "");
    //     setFirstName(retrievedCheckbox || "");
  }, []);

  const updateAPIData = () => {
    axios.put(`https://65eb516543ce16418933af30.mockapi.io/fakeData/${id}`, {
      firstName,
      lastName,
      checkbox,
      date
    }).then(()=>{
        navigate('/read')
    });
  };

  return (
    <>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            checked={checkbox}
            onChange={(e) => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Form.Field>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </Form.Field>
        <Button type="submit" onClick={updateAPIData}>
          Update
        </Button>
      </Form>
    </>
  );
};

export default Update;
