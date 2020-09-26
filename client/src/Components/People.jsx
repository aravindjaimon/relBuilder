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

const ListPeople = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  return (
    <div className="item">
      <Row>
        <Col>
          <h2>List of People</h2>
        </Col>
        <Col style={{ margin: "5px" }} className="right">
          <Button onClick={toggle} className="button" color="success">
            Add a Person
          </Button>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader>Add a Person</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Name</Label>
                  <Input type="text"></Input>
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
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Aravind Jaimon</td>
            <td>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ListPeople;
