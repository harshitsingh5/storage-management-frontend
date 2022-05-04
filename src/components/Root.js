import React from "react";
import FileBrowser, { Icons } from "react-keyed-file-browser";
import "react-keyed-file-browser/dist/react-keyed-file-browser.css";
import Moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { List, Avatar, Button, Skeleton } from "antd";
import "./Root.css";
import {
  FolderOutlined,
  DownloadOutlined,
  FileOutlined,
  DeleteOutlined,
  UploadOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../constants";

const Root = () => {
  const { state } = useLocation();
  const title = state.title;
  console.log("🚀 ~ file: Root.js state", state);
  const folderTitle = state.folderTitle;

  const navigate = useNavigate();

  const getFolderContents = (folder) => {
    if(title==='Google Drive'){
      getDriveContents(folder);
    }
    if (title==='Dropbox'){
      getDropboxContents(folder);
    }
    if (title==='Amazon S3'){
      getDropboxContents(folder);
    }
  }

  const getDriveContents = (folder) => {
    axios
      .post(`${baseURL}/drive/files-all/`, { folder_id: folder.id })
      .then((res) => {
        const fileList = res?.data?.fileList;
        navigate("/root", {
          state: {
            contents: fileList,
            title: title,
            folderTitle: folder.title,
          },
        });
      });
  };

  const getDropboxContents = (folder) => {
    axios
      .post(`${baseURL}/dropbox/files-all/`, { folder_path: folder.path_display })
      .then((res) => {
        const fileList = res?.data?.fileList;
        navigate("/root", {
          state: {
            contents: fileList,
            title: title,
            folderTitle: folder.title,
          },
        });
      });
  };

  return (
    <div className="fullPage">
      <div>
        <h1>
          <b>{title}</b>
        </h1>
      </div>
      <div className="folderTitleLine">
        <div className="folderTitle">{folderTitle}</div>
        {/* <Button icon={<FolderAddOutlined />}>Create a Folder</Button> */}
        {/* <Button icon={<UploadOutlined />}>Click to Upload</Button> */}
      </div>
      <div>
        {state.contents.map((i) => {
          return (
            <div className="linuxRow tableItem">
              <div className="rowFlex">
                <div className="icon">
                  {i.type === "folder" ? <FolderOutlined /> : <FileOutlined />}
                </div>
                <div
                  className={`${i.type === "folder" && "folder"} contentTitle`}
                  onClick={() => {
                    i.type === "folder" && getFolderContents(i);
                  }}
                >
                  {i.title}
                </div>
              </div>
              <div>
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  size={"large"}
                >
                  Download
                </Button>
                &nbsp;
                {/* <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  size={"large"}
                  danger
                >
                  Delete
                </Button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Root;
