import React from 'react'
import { render } from 'react-dom'
import { API_URL } from './app.js'
import UploadFile from './../component/file-upload.js'

import { AuthorProfile } from './../component/profile.js'

export default class ProfileSettings extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AuthorProfile author_id={this.props.author_id}/>
        <UploadFile label="Upload Bot:" />
      </React.Fragment>
    );
  }
}
