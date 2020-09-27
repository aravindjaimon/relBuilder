import React, { useState, Fragment } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";

const EditPerson = ({ item, update }) => {
  const [person, setPerson] = useState(item.person_name);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const updatePerson = async (e) => {
    e.preventDefault();
    try {
      const body = { name: person };
      await fetch(`http://localhost:5000/person/${item.person_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      update();
    } catch (error) {
      console.error(error.message);
    }
    toggle();
  };
  return (
    <Fragment>
      <Button
        onClick={() => {
          toggle();
        }}
        color="warning"
      >
        Edit
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Person</ModalHeader>
        <Form onSubmit={updatePerson}>
          <ModalBody>
            <FormGroup>
              <Label>Enter New Name</Label>
              <Input
                value={person}
                onChange={(e) => setPerson(e.target.value)}
                type="text"
                name="name"
              ></Input>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="warning">
              Edit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default EditPerson;
