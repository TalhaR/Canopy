import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import StockPage from "./pages/StockPage/StockPage";

import "./App.css";
import Login from "./pages/Auth/Login";

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                {/* <Route path="/history" component={} /> */}
                <Route path="/stocks/:ticker" component={StockPage} />
                <Route path="/" component={HomePage} />
                <Route path="/auth/login" component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
