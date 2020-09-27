import React, { useState, useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Row, Table } from "reactstrap";
import EditPerson from "./EditPerson.jsx";

const ListPeople = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  var [update, setUpdate] = useState(0);

  const onSubmitName = async (e) => {
    e.preventDefault();
    try {
      const body = { name };
      await fetch(`${process.env.REACT_APP_API_URL}/person`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setUpdate(update + 1);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deletePerson = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/person/${id}`, {
      method: "DELETE",
    });
    setUpdate(update + 1);
  };
  const getPeople = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/person`);
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getPeople();
  }, [update]);
  return (
    <div className="item">
      <Row>
        <Col>
          <h2>List of People</h2>
        </Col>
        <Col style={{ margin: "5px" }} className="right">
          <Form className="d-flex" onSubmit={onSubmitName}>
            <FormGroup>
              <Input
                required
                placeholder="Add New Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                style={{ marginLeft: "10px" }}
                color="success"
              >
                Add a Person
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.person_id}>
                <td>{item.person_id}</td>
                <td>{item.person_name}</td>
                <td>
                  <Button
                    onClick={() => {
                      deletePerson(item.person_id);
                    }}
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <EditPerson
                    update={() => setUpdate(update + 1)}
                    item={item}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default ListPeople;
