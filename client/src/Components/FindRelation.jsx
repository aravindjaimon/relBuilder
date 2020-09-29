import React, { useState, useEffect } from "react";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";

const FindRelation = ({ fullData }) => {
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [outputRight, setOutputRight] = useState("");
  const [outputLeft, setOutputLeft] = useState("");
  const [data, setData] = useState([]);

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
  });

  const processData = (e) => {
    setOutputLeft("");
    setOutputRight("");
    e.preventDefault();
    fullData.forEach((element) => {
      if (fname === sname) {
        setOutputRight(`${fname} = ${sname}`);
      } else if (element.fname === fname) {
        if (element.sname === sname) {
          setOutputRight(`${fname} > ${sname}`);
        } else {
          fullData.forEach((elementIn) => {
            if (elementIn.fname === element.sname) {
              if (elementIn.sname === sname) {
                setOutputRight(`${fname} > ${element.sname} > ${sname}`);
              }
            }
          });
        }
      }
    });
    fullData.forEach((element) => {
      if (sname === fname) {
        setOutputLeft(`${sname} = ${fname}`);
      } else if (element.fname === sname) {
        if (element.sname === fname) {
          setOutputLeft(`${fname} < ${sname}`);
        } else {
          fullData.forEach((elementIn) => {
            if (elementIn.fname === element.sname) {
              if (elementIn.sname === fname) {
                setOutputLeft(`${fname} < ${element.sname} < ${sname}`);
              }
            }
          });
        }
      }
    });
  };
  return (
    <div className="item">
      <h2>Degree of Separation</h2>
      <Form onSubmit={processData}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Select First Person</Label>
              <Input
                type="select"
                name="fperson"
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
              >
                <option value="null">Select One</option>
                {data.map((item) => {
                  return (
                    <option key={item.person_id} value={item.person_name}>
                      {item.person_name}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Select Second Person</Label>
              <Input
                value={sname}
                onChange={(e) => {
                  setSname(e.target.value);
                }}
                type="select"
                name="fperson"
              >
                <option value="null">Select One</option>
                {data.map((item) => (
                  <option key={item.person_id} value={item.person_name}>
                    {item.person_name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">
          Find
        </Button>
      </Form>
      <center className="item">
        <h1>{outputLeft.length > 0 ? outputLeft : outputRight}</h1>
      </center>
    </div>
  );
};

export default FindRelation;
