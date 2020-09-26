import React from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const FindRelation = () => {
  return (
    <div className="item">
      <h2>Degree of Separation</h2>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Select First Person</Label>
              <Input type="select" name="fperson"></Input>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label>Select First Person</Label>
              <Input type="select" name="fperson"></Input>
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Find</Button>
      </Form>
      <center className="item">
        <h1>First Person>Second Person</h1>
      </center>
    </div>
  );
};

export default FindRelation;
