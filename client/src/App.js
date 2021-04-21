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

// <NavLink className="nav-link" exact to="/test">
// Test
// </NavLink>

function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                {/* <Route path="/posts/new" component={PostFormPage} /> */}
                {/* <Route path="/posts/:id" component={ShowPostPage} /> */}
                {/* <Route path="/about-us" component={AboutUsPage} /> */}
                <Route path="/stocks/:ticker" component={StockPage} />
                <Route path="/" component={HomePage} />
            </Switch>
        </Router>
    );
}

export default App;
