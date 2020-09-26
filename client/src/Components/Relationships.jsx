import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

const Relationship = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className="item">
      <Row>
        <Col>
          <h2>List of Relationship</h2>
        </Col>
        <Col style={{ margin: "5px" }} className="right">
          <Button onClick={toggle} className="button" color="success">
            Add a Relationship
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Add a Relation</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Select First Person</Label>
                  <Input type="select"></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Select a Tag</Label>
                  <Input type="select"></Input>
                </FormGroup>
                <FormGroup>
                  <Label>Select Second Person</Label>
                  <Input type="select"></Input>
                </FormGroup>
                <Button>Add</Button>
              </Form>
            </ModalBody>
          </Modal>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Person</th>
            <th>Relation</th>
            <th>Second Person</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Aravind Jaimon</td>
            <td>Brother</td>
            <td>Ashwin Jaimon</td>
            <td>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Relationship;
