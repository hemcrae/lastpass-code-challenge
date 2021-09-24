import React from "react";
import "./App.scss";
import { Login } from "./pages/Login/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { PrivateRoute } from "./pages/PrivateRoute/PrivateRoute";

const App: React.FC = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/login" render={() => <Login />} />
          <PrivateRoute render={() => <Dashboard />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
