import React from "react";
import { Link } from "react-router-dom";

import UserPanel from "./UserPanel";

import "./NavigationMenu.css";

const NavigationMenu = () => (
  <div className="menu">
    <Link to="/blogs">blogs</Link>
    <Link to="/users">users</Link>

    <div className="user-panel">
      <UserPanel />
    </div>
  </div>
);

export default NavigationMenu;
