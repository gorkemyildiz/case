import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

//Components
import CountryList from "./components/CountryList";
import Header from "./components/Header";

// Pages
import CountryDetail from "./pages/CountryDetail";

//CSS
import './style.scss';

const App = () => {
  return (
    <Router> 
        <Header />
        <Switch>
        <Route path="/" exact component={CountryList} />
        <Route path="/country/:cca3" component={CountryDetail} />
      </Switch>
    </Router>
  );
};

export default App;
