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
import FindRelation from "./FindRelation";

const Relationship = () => {
  const [modal, setModal] = useState(false);
  const [people, setPeople] = useState([]);
  const [tag, setTag] = useState([]);
  var [update, setUpdate] = useState(0);
  const [fid, setFid] = useState("");
  const [tagid, setTagid] = useState("");
  const [sid, setSid] = useState("");
  const [relations, setRelations] = useState([]);
  const [data, setData] = useState([]);

  const deleteRelation = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/relations/${id}`, {
      method: "DELETE",
    });
    setUpdate(update + 1);
  };

  const getFullData = (people, tag, relation) => {
    var relationData = [];
    relation.forEach((element) => {
      var item = {};
      people.forEach((person) => {
        if (element.first_person_id === person.person_id) {
          item.fname = person.person_name;
          item.id = element.relation_id;
        }
        if (element.second_person_id === person.person_id) {
          item.sname = person.person_name;
        }
      });
      tag.forEach((rel) => {
        if (element.tag_id === rel.tag_id) {
          item.tag = rel.tag_name;
        }
      });
      if (item.fname !== undefined) relationData.push(item);
    });
    setData(relationData);
  };

  const toggle = () => {
    setUpdate(update + 1);
    setModal(!modal);
  };

  const getPeople = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/person`);
      const jsonData = await res.json();
      setPeople(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getTag = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tags`);
      const jsonData = await res.json();
      setTag(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getRelation = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/relations`);
      const jsonData = await res.json();
      setRelations(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onSubmitCreate = async (e) => {
    e.preventDefault();
    try {
      const body = { person1: fid, tag: tagid, person2: sid };
      await fetch(`${process.env.REACT_APP_API_URL}/relations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      toggle();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPeople();
    getTag();
    getRelation();
  }, [update]);

  useEffect(() => {
    getFullData(people, tag, relations);
  }, [people, tag, relations]);

  return (
    <>
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
                <Form onSubmit={onSubmitCreate}>
                  <FormGroup>
                    <Label>Select First Person</Label>
                    <Input
                      value={fid}
                      onChange={(e) => setFid(e.target.value)}
                      name="fperson"
                      type="select"
                    >
                      <option value="null">Choose One</option>
                      {people.map((item) => (
                        <option value={item.person_id} key={item.person_id}>
                          {item.person_name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Select a Tag</Label>
                    <Input
                      value={tagid}
                      onChange={(e) => setTagid(e.target.value)}
                      name="tag"
                      type="select"
                    >
                      <option value="null">Choose One</option>
                      {tag.map((item) => (
                        <option
                          key={item.tag_id}
                          value={item.tag_id}
                          id={`${item.tag_id}tag`}
                        >
                          {item.tag_name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Select Second Person</Label>
                    <Input
                      value={sid}
                      onChange={(e) => setSid(e.target.value)}
                      name="sperson"
                      type="select"
                    >
                      <option value="null">Choose One</option>
                      {people.map((item) => (
                        <option
                          key={item.person_id}
                          value={item.person_id}
                          id={`${item.person_id}people`}
                        >
                          {item.person_name}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <Button type="submit">Add</Button>
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
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fname}</td>
                  <td>{item.tag}</td>
                  <td>{item.sname}</td>
                  <td>
                    <Button
                      onClick={() => {
                        deleteRelation(item.id);
                      }}
                      color="danger"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      <FindRelation fullData={data} />
    </>
  );
};
export default Relationship;
