import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import ToyCard from './components/ToyCard'


class App extends React.Component{

  state = {
    display: false,
    toyCollections: []
   
  }

  componentDidMount(){
    fetch("http://localhost:3000/toys")
    .then(resp=>resp.json())
    .then(data=> this.setState({toyCollections:data}))
  }

  

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  handleSubmit =(obj)=>{

    let newArray=[...this.state.toyCollections, obj]

    this.setState({toyCollections: newArray})

    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    })
  }

  deleteHandler =(obj)=>{

    // console.log(this.state.toyCollections)

    let updatedArray = this.state.toyCollections.filter((Obj)=> Obj.id!==obj.id)
  
    // console.log(updatedArray)
    this.setState({toyCollections:updatedArray})
    
    
    fetch(`http://localhost:3000/toys/${obj.id}`, {
      method: "DELETE"
    })
  }

    likeHandler=(obj)=>{
      // console.log(obj)
      let likes = obj.likes
      let newLikes = likes+1

      let newArray = [...this.state.toyCollections]

      let element = newArray.find((object)=>object.id ===obj.id)
        element.likes=newLikes

        this.setState({toyCollections:newArray})

      
        fetch(`http://localhost:3000/toys/${obj.id}`, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({likes:newLikes})
      })
    }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toyCollections={this.state.toyCollections} likeHandler={this.likeHandler} deleteHandler={this.deleteHandler}/>
      </>
    );
  }

}

export default App;




