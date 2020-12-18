import React from "react";
import MiniItemRow from "./MiniItemRow.js";
import MiniItem from "./MiniItem.js";
import "./CSS_FILES/MiniItem.css";
import { Row, Col, Divider } from "antd";
import { Button } from "antd";
import { Pagination } from "antd";

function onChange(pageNumber) {
  console.log("Page: ", pageNumber);
}

const style = { background: "#0092ff", padding: "8px 0" };

class PreviousOrders extends React.Component {
  render() {
    return (
      <div>
        <Divider orientation="left" style={{ color: "#333", fontWeight: "normal" }}>
          Previous Orders
        </Divider>
        <MiniItemRow />
        <Pagination defaultCurrent={1} total={200} onChange={onChange} />
      </div>
    );
  }
}
export default PreviousOrders;
