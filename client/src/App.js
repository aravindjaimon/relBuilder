import React, { Fragment } from "react";
import { Container } from "reactstrap";
import "./App.css";
import People from "./Components/People.jsx";
import Tags from "./Components/Tags.jsx";
import Relationship from "./Components/Relationships";

function App() {
  return (
    <div className="App">
      <Fragment>
        <Container>
          <h1>Relationship Builder</h1>
          <Tags />
          <People />
          <Relationship />
        </Container>
      </Fragment>
    </div>
  );
}

export default App;
