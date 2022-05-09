import React, { useState } from "react";
import Moment from "moment";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { List, Avatar, Button, Empty, Input } from "antd";
import "./Root.css";
import {
  FolderOutlined,
  DownloadOutlined,
  FileOutlined,
  DeleteOutlined,
  UploadOutlined,
  FolderAddOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { baseURL } from "../constants";
import fileDownload from "js-file-download";

const Root = () => {
  const { state } = useLocation();
  const title = state.title;
  // console.log("🚀 ~ file: Root.js state", state);
  const folderTitle = state.folderTitle;
  const [newFolderName, setNewFolderName] = useState('');
  const [dropboxCurrentPath, setDropboxCurrentPath] = useState('');

  const navigate = useNavigate();

  const getFolderContents = (folder) => {
    if (title === "Google Drive") {
      getDriveContents(folder);
    }
    if (title === "Dropbox") {
      getDropboxContents(folder);
    }
    if (title === "Amazon S3") {
      getDropboxContents(folder);
    }
  };

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
    .post(`${baseURL}/dropbox/files-all/`, {
      folder_path: folder.path_display,
    })
    .then((res) => {
      const fileList = res?.data?.fileList;
      setDropboxCurrentPath(res?.data?.currentPath);
      console.log(newFolderName);
      console.log(dropboxCurrentPath);
        navigate("/root", {
          state: {
            contents: fileList,
            title: title,
            folderTitle: folder.title,
          },
        });
      });
  };

  const downloadFile = (file) => {
    if (title === "Google Drive") {
      downloadDriveFile(file);
    }
    if (title === "Dropbox") {
      downloadDropboxFile(file);
    }
    // if (title === "Amazon S3") {
    //   getDropboxContents(file);
    // }
  };

  const downloadDriveFile = (file) => {
    axios
      .get(`${baseURL}/drive/files`, {
        responseType: "blob",
        params: {
          file_id: file.id,
          title: file.title,
          mimetype: file.mimetype,
        },
      })
      .then((res) => {
        const dataa = res?.data;
        // console.log("🚀 ~ file: Root.js ~ line 91 ~ .then ~ dataa", dataa);
        fileDownload(dataa, file.title);
      });
  };

  const downloadDropboxFile = (file) => {
    axios
      .get(`${baseURL}/dropbox/files`, {
        responseType: "blob",
        params: { filename: file.title, filepath: file.path_display },
      })
      .then((res) => {
        const dataa = res?.data;
        // console.log("🚀 ~ file: Root.js ~ line 91 ~ .then ~ dataa", dataa);
        fileDownload(dataa, file.title);
      });
  };

  const deleteFile = (file) => {
    if (title === "Google Drive") {
      deleteDriveFile(file);
    }
    // if (title === "Dropbox") {
    //   deleteDropboxFile(file);
    // }
    // if (title === "Amazon S3") {
    //   getDropboxContents(file);
    // }
  };

  const deleteDriveFile = (file, folder) => {
    axios
      .delete(`${baseURL}/drive/files`, {
        params: { file_id: file.id },
      })
      .then((res) => {
        const dataa = res?.data;
        getDriveContents(folder);
      });
  };

  const createFolder = () => {
    // if (title === "Google Drive") {
    //   createDriveFolder();
    // }
    if (title === "Dropbox") {
      createDropboxFolder();
    }
    // if (title === "Amazon S3") {
    //   getDropboxContents();
    // }
  };

  const createDropboxFolder = () => {
    console.log(newFolderName);
    console.log(dropboxCurrentPath);
    axios
      .post(`${baseURL}/dropbox/folders/`, { folder_name: newFolderName, dropbox_path: dropboxCurrentPath })
      .then((res) => {
        const status = res?.data?.status;
        console.log("🚀 ~ file: Root.js ~ line 158 ~ .then ~ status", status)
        getDropboxContents({path_display: dropboxCurrentPath});
      });
  };

  return (
    <div className="fullPage">
      <div>
        <h1>
          <b>{title}</b>
        </h1>
      </div>
      <div className="folderTitleLineBackButton">
        <div className="icon backButton" >
          <Button className="backButtonText" icon={<ArrowLeftOutlined /> } onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
        <div className="folderTitleLine">
          <div className="folderTitleBackButton">
            <div className="folderTitle">{folderTitle}</div>
          </div>
          <div>
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 200px)" }}
                placeholder="New folder name"
                // value={this.state.someVal || ''}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
              {/* <Button type="primary">Submit</Button> */}
              <Button icon={<FolderAddOutlined />} onClick={() => {createFolder()}} >Create a Folder</Button>
            </Input.Group>
          </div>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </div>
      </div>
      {state.contents[0] ? (
        <div>
          {state.contents.map((i) => {
            return (
              <div className="linuxRow tableItem">
                <div className="rowFlex">
                  <div className="icon">
                    {i.type === "folder" ? (
                      <FolderOutlined />
                    ) : (
                      <FileOutlined />
                    )}
                  </div>
                  <div
                    className={`${
                      i.type === "folder" && "folder"
                    } contentTitle`}
                    onClick={() => {
                      i.type === "folder" && getFolderContents(i);
                    }}
                  >
                    {i.title}
                  </div>
                </div>
                <div>
                  {i.type === "folder" ? (
                    <></>
                  ) : (
                    <>
                      <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        size={"large"}
                        onClick={() => downloadFile(i)}
                      >
                        Download
                      </Button>
                      &nbsp;
                      <Button
                        type="primary"
                        icon={<DeleteOutlined />}
                        size={"large"}
                        danger
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="emptyFolder">
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            imageStyle={{
              height: 80,
            }}
            description={"No Files here"}
          >
            <Button type="primary" size={"large"} onClick={() => navigate(-1)}>
              Go Back
            </Button>
          </Empty>
        </div>
      )}
    </div>
  );
};

export default Root;
