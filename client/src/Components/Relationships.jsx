import React, { useEffect, useState } from "react";
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
  const [people, setPeople] = useState([]);
  const [tag, setTag] = useState([]);
  var [update, setUpdate] = useState(0);
  const toggle = () => {
    setModal(!modal);
    setUpdate(update + 1);
  };
  const getPeople = async () => {
    try {
      const res = await fetch("http://localhost:5000/person");
      const jsonData = await res.json();
      setPeople(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  const getTag = async () => {
    try {
      const res = await fetch("http://localhost:5000/tags");
      const jsonData = await res.json();
      setTag(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    console.log("yes");
    getPeople();
    getTag();
  }, [update]);

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
                  <Input type="select">
                    <option value="null">Choose One</option>
                    {people.map((item) => (
                      <option
                        value={item.person_id}
                        id={`${item.person_id}people`}
                      >
                        {item.person_name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Select a Tag</Label>
                  <Input type="select">
                    <option value="null">Choose One</option>
                    {tag.map((item) => (
                      <option value={item.tag_id} id={`${item.tag_id}tag`}>
                        {item.tag_name}
                      </option>
                    ))}
                  </Input>
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
