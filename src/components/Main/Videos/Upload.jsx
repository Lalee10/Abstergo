import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


class Upload extends Component {

    onChangeHandler=event=>{

        console.log(event.target.files[0]);

        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
          })
    
    }

    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:8080/upload", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
    }

    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
      }

    render() {
        return (
            <div>
                <form method="post" action="#" id="#">
            
                    <div class="form-group files">
                        <label>Upload Your File </label>
                        <input type="file" class="form-control" multiple="" onChange={this.onChangeHandler}/>
                    </div>

                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
                    
                </form>
        </div>
        );
    }
}

Upload.propTypes = {

};

export default Upload;