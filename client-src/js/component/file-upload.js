import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import { RadioButton, RadioButtonDefault } from './button.js'
import { API_URL } from './../routing/app.js'

export default class FileUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null, filename: null };
    if(localStorage.getItem("access_token") === null)
       localStorage.setItem("access_token", "");
  }

  onChange = (event) => {
    let new_state = {};
    new_state[event.target.name] = event.target.value;
    this.setState(new_state);
  }

  onFileChange = (event) => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.fileUpload(this.state.file, this.state.filename);
  }

  fileUpload = (file, filename, bot_race) => {
    // Configure upload.
    const url = API_URL + this.props.uploadPath;
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': access_token
      }
    }
    console.log(formData);
    // Submit the upload
    axios.post(url, formData, config)
    .then(function (response) {
      console.log("upload response");
      console.log(response);
    })
    .catch(function (error) {
      console.log("ERROR");
      console.log(error);
    });
  }

  render() {
    return (
      <form className="flex-horizontal"
            onSubmit={this.onSubmit}>
        <input name="file"
               type="file"
               className="btn"
               onChange={this.onFileChange}/>
        <input type="submit"
               value="Submit"
               className="btn"/>
      </form>
    )
  }
}
