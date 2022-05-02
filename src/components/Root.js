import React from "react";
import FileBrowser from "react-keyed-file-browser";
import "react-keyed-file-browser/dist/react-keyed-file-browser.css";
import Moment from "moment";
import { useLocation } from "react-router-dom";

const Root = (props) => {

	const {state} = useLocation();
  console.log("🚀 ~ file: Root.js state", state)
	
  return (
    <div className="fullPage">
      <div>
        <h1><b>{props.title}</b></h1>
      </div>
      <FileBrowser
        files={[
          {
            key: "cat.png",
            modified: +Moment().subtract(1, "hours"),
            size: 1.5 * 1024 * 1024,
          },
          {
            key: "kitten.png",
            modified: +Moment().subtract(3, "days"),
            size: 545 * 1024,
          },
          {
            key: "elephant.png",
            modified: +Moment().subtract(3, "days"),
            size: 52 * 1024,
          },
        ]}
      />
    </div>
  );
};

export default Root;
