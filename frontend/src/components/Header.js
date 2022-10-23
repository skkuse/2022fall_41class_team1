import React, { FunctionComponent } from "react";
import styles from "./Header.css";

function Header() {
  return (
  <div class="Header_wrapper">
        <img
          src="https://logrocket-assets.io/img/logo.png"
          width="30"
          className="img-thumbnail"
          style={{ marginTop: "20px" }}
        />
        <h5>
          <i>presents</i>
        </h5>
        <h1>Problem1</h1>
      </div>
  );
};

export default Header;