import React, { Component } from "react";

const baseUrl = "http://localhost:8000";
class Main extends Component {
  state = {
    imageURL: ""
  };

  handleUploadImage = ev => {
    ev.preventDefault();

    console.log(this.uploadInput.files);
    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);

    fetch(`${baseUrl}/upload`, { method: "POST", body: data })
      .then(response => response.json())
      .then(body => this.setState({ imageURL: `${baseUrl}/${body.file}` }));
  };

  render() {
    const { imageURL } = this.state;
    return (
      <form onSubmit={this.handleUploadImage}>
        <div>
          <input
            ref={ref => {
              this.uploadInput = ref;
            }}
            type="file"
          />
        </div>
        <div>
          <input
            ref={ref => {
              this.fileName = ref;
            }}
            type="text"
            placeholder="Enter the desired name of file"
          />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        {imageURL ? <img src={imageURL} alt="img" /> : null}
      </form>
    );
  }
}

export default Main;
