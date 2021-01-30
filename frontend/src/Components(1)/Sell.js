import React from "react";
import MiniItemRow from "./MiniItemRow.js";
import MiniItem from "./MiniItem.js";
import "./CSS_FILES/MiniItem.css";
import { Row, Col, Divider } from "antd";
import { Button } from "antd";

const style = { background: "#0092ff", padding: "8px 0" };

class Sell extends React.Component {
  render() {
    return (
      <>
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Unsold Items
        </Divider>
        <MiniItemRow />
        <Divider
          orientation="left"
          style={{ color: "#333", fontWeight: "normal" }}
        >
          Sold Items
        </Divider>
        <MiniItemRow />
        <Button type="primary" block>
          Add Item
        </Button>
      </>
    );
  }
}
export default Sell;