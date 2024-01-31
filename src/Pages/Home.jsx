import React, { useEffect, useState } from "react";
import { MdFileUpload } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";
import Header from "./../Components/Header/Header";
import "./Home.css";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const [docName, setDocName] = useState([]);
  const { comid } = useParams();

  const companyId = comid.split("-")[0];
  const customerId = comid.split("-")[1];

  console.log(companyId, customerId);

  const fetchTasks = async () => {
    try {
      // const response = await fetch(
      //   `http://localhost:5000/company/doc/doc-details/${companyId}`
      // );
      const response = await fetch(
        `http://13.200.220.251:4000/subdomain/doc/doc-details/${companyId}`
      );

      const data = await response.json();
      setDocName(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(docName);

  const [selectedFiles, setSelectedFiles] = useState({});

  const handleFileChange = (document, file) => {
    setSelectedFiles((prevFiles) => ({ ...prevFiles, [document]: file }));
  };

  const handleRemoveFile = (document) => {
    setSelectedFiles((prevFiles) => ({ ...prevFiles, [document]: null }));
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const missingFiles = docName.filter(
      (documentName) => !selectedFiles[documentName]
    );

    if (missingFiles.length > 0) {
      toast.error("Please select files for all documents.");
      return;
    }
    const filesArray = Object.values(selectedFiles);
    const files = filesArray.filter((file) => file !== null);

    console.log(files);
    try {
      let response;
      const responses = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
        response = fetch(`http://13.200.220.251:4000/subdomain/file-upload/${comid}`, {
          method: "POST",
          body: formData,
        });
        return response;
      });

      await Promise.all(responses);
      toast.success("Files Uploaded successfully");
      navigate("/uploaded");
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <>
      <Header />
      <form onSubmit={handleUpload}>
        <div className="Home">
          <div className="text-section">
            <h1>Upload Your Documents Here</h1>
            <p>Upload your given documents to initiate the process</p>
          </div>

          <div className="content-container">
            <div className="image-div">
              <img src="/Img/upload-doc.png" />
              <p>
                Upload your documents here and let our Smart Agents go through
                them to create a seamless experience for you
              </p>
            </div>

            <div className="content-div">
              <div>
                {docName.map((documentName, k) => (
                  // eslint-disable-next-line
                  <div className="doc-upload">
                    <h3 key={k}>{documentName}</h3>
                    {selectedFiles[documentName] ? (
                      <div className="file-name">
                        <label>
                          <FaRegFile />
                          {selectedFiles[documentName].name}
                        </label>
                        <span onClick={() => handleRemoveFile(documentName)}>
                          X
                        </span>
                      </div>
                    ) : (
                      <label
                        htmlFor={`fileInput_${documentName}`}
                        className="file-upload-label"
                      >
                        <MdFileUpload />
                        Browse File
                      </label>
                    )}

                    <input
                      type="file"
                      id={`fileInput_${documentName}`}
                      onChange={(e) =>
                        handleFileChange(documentName, e.target.files[0])
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="button-div">
            <button className="custom-btn">Submit</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Home;
