import React from "react";
import FileBrowser, {Icons} from "react-keyed-file-browser";
import "react-keyed-file-browser/dist/react-keyed-file-browser.css";
import Moment from "moment";
import { useLocation } from "react-router-dom";

const Root = () => {

	const {state} = useLocation();
  const title = state.title;
  console.log("🚀 ~ file: Root.js state", state)
	
  return (
    <div className="fullPage">
      <div>
        <h1><b>{title}</b></h1>
      </div>
      <FileBrowser
        files=
          {state.contents.map((i) => {
            return (
              
              {
                key: i.title,
                // modified: +Moment().subtract(1, "hours"),
                // size: 1.5 * 1024 * 1024,
              }
            //   :  
            //   {
            //     key: i.name,
            //     // modified: +Moment().subtract(1, "hours"),
            //     // size: 1.5 * 1024 * 1024,
            //   }
            // }
            
            )
          })}

          // {
          //   key: "cat.png",
          //   modified: +Moment().subtract(1, "hours"),
          //   size: 1.5 * 1024 * 1024,
          // }

        
      />
    </div>
  );
};

export default Root;
