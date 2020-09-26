import React, { useState, useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Row, Table } from "reactstrap";
import EditTag from "./EditTag.jsx";

const Tags = () => {
  const [tag, setTag] = useState("");
  const [data, setData] = useState([]);

  const onSubmitTag = async (e) => {
    e.preventDefault();
    try {
      const body = { tag };
      await fetch("http://localhost:5000/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteTag = async (id) => {
    await fetch(`http://localhost:5000/tags/${id}`, {
      method: "DELETE",
    });
  };
  const getTags = async () => {
    try {
      const res = await fetch("http://localhost:5000/tags");
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    getTags();
  });
  return (
    <div className="item">
      <Row>
        <Col>
          <h2>List of Tags</h2>
        </Col>
        <Col style={{ margin: "5px" }} className="right">
          <Form className="d-flex" onSubmit={onSubmitTag}>
            <FormGroup>
              <Input
                required
                placeholder="Add New Tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                type="text"
              ></Input>
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                style={{ marginLeft: "10px" }}
                color="success"
              >
                Add a Tag
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tag</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr key={item.tag_id}>
                <td>{item.tag_id}</td>
                <td>{item.tag_name}</td>
                <td>
                  <Button
                    onClick={() => {
                      deleteTag(item.tag_id);
                    }}
                    color="danger"
                  >
                    Delete
                  </Button>
                </td>
                <td>
                  <EditTag item={item} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Tags;
