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

const EditTag = ({ item, update }) => {
  const [tag, setTag] = useState(item.tag_name);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const updateTag = async (e) => {
    e.preventDefault();
    try {
      const body = { tag };
      await fetch(`${process.env.REACT_APP_API_URL}/tags/${item.tag_id}`, {
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
        <ModalHeader toggle={toggle}>Edit Tag</ModalHeader>
        <Form onSubmit={updateTag}>
          <ModalBody>
            <FormGroup>
              <Label>Enter New Name</Label>
              <Input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
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

export default EditTag;
