import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ResourcePage from "./pages/Resources";
import StockPage from "./pages/StockPage/StockPage";

import "./App.css";

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                {/* <Route path="/history" component={} /> */}
                <Route path="/resources" component={ResourcePage} />
                <Route path="/stocks/:ticker" component={StockPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;
