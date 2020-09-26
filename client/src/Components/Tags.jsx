import React, { useState } from "react";
import { Button, Col, Form, FormGroup, Input, Row, Table } from "reactstrap";

const Tags = () => {
  const [tag, setTag] = useState("");
  const onSubmitName = async () => {
    try {
      const body = { tag };
      const res = await fetch("http://localhost:5000/tag", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="item">
      <Row>
        <Col>
          <h2>List of Tags</h2>
        </Col>
        <Col style={{ margin: "5px" }} className="right">
          <Form className="d-flex" onSubmit={onSubmitName}>
            <FormGroup>
              <Input
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
                Add Tag
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Brother</td>
            <td>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default Tags;
