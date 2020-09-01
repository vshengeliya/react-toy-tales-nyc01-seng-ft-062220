
import React, { Component } from 'react';

class ToyForm extends Component {

  state = {
    name: "",
    image: "",
    likes: 0

  }

  changeHandler=(e)=>{
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" 
        onSubmit={(e)=>{
          e.preventDefault()
          this.props.handleSubmit(this.state)
          this.setState({name: "", image: ""})
        
        }}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" placeholder="Enter a toy's name..." className="input-text"  value ={this.state.name}onChange={this.changeHandler}/>
          <br/>
          <input type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text" value={this.state.image}onChange={this.changeHandler}/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
