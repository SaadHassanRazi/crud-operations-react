import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Create = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  let navigate = useNavigate();
  const postData = () => {
    axios
      .post(`https://65eb516543ce16418933af30.mockapi.io/fakeData`, {
        firstName,
        lastName,
        checkbox,
      })
      .then(() => {
        navigate("/read");
      });
  };
  return (
    <>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="First Name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="I agree to the Terms and Conditions"
            onChange={(e) => setCheckbox(!checkbox)}
          />
        </Form.Field>
        <Button type="submit" onClick={postData}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Create;
