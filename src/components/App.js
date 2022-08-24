import React, { Component } from 'react';
import './App.css';
import {Container} from "semantic-ui-react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Tokens from "./Tokens";
import Loteria from "./Loteria";
import Premios from "./Premios";
import Header from "./Header";
import "semantic-ui-css/semantic.min.css";


class App extends Component {


  render() {
    return(
      <BrowserRouter>
        <Container>
          <Header />
            <main>
              <Switch>
                <Route exact path="/" component={Tokens}/>
                <Route exact path="/Loteria" component={Loteria}/>
                <Route exact path="/Premios" component={Premios}/>
              </Switch>
            </main>
          
        </Container>
      </BrowserRouter>

      

      


    );
  }
}

export default App;
