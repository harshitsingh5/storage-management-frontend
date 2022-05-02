import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import "./Dashboard.css";
import amazon_s3 from '../static/img/amazon_s3_2.png'
import drive from '../static/img/google_drive.png'
import dropbox from '../static/img/dropbox.png'
import axios from "axios";
import { baseURL } from '../constants'
import Root from "./Root";

const Dashboard = () => {
  const { Meta } = Card;

	const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
	
	const navigate = useNavigate();

	const getDropbox = () => {
		console.log("inside dropbox");
		axios
			.post(`${baseURL}/dropbox/files-all/`, { folder_path: '' })
			.then((res) => {
				const fileList = res?.data?.fileList
        console.log("🚀 ~ file: Dashboard.js ~ line 28 ~ .then ~ fileList", fileList)
				// window.location = "/root";
				// <Root title="Dropbox" />
				console.log("navigating...");
				navigate(
					 '/root',
					{ state: { contents: fileList	}, }
				);
			})
	}

  return (
    <div className="fullPage">
			<h1><u>Storage Management Dashboard</u></h1>
			<div style={{display:'flex'}}> 
			<div className="card">
      <Card
        hoverable
        style={{ width: 240, height: 300 }}
				onClick={() => {
					// aws();
				}}
        cover={
          <img
            alt="s3 logo"
            src={amazon_s3}
          />
        }
      >
        <Meta title="Amazon S3" description="" />
      </Card>
			</div>
			<div className="card">
			<Card
        hoverable
        style={{ width: 240, height: 300 }}
        cover={
          <img
            alt="drive logo"
            src={drive}
          />
        }
      >
        <Meta title="Google Drive" description="" />
      </Card>
			</div>
			<div className="card">
			<Card
        hoverable
        style={{ width: 240, height: 300 }}
				onClick={() => {
					getDropbox();
				}}
        cover={
          <img
            alt="drive logo"
            src={dropbox}
          />
        }
      >
        <Meta title="Dropbox" description="" />
      </Card>
			</div>


			</div>

    </div>
  );
};

export default Dashboard;
