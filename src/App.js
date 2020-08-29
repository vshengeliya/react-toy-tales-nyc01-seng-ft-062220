import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'
import ToyCard from './components/ToyCard'

import data from './data'


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

  renderToys=()=>{
  return this.state.toyCollections.map((toy)=> <ToyCard key={toy.id} toy={toy} deleteHandler={this.deleteHandler}/>)
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

  deleteHandler =(id)=>{

    console.log(this.state.toyCollections)

    let updatedArray = this.state.toyCollections.filter((Obj)=> Obj.id!==id)
  
    console.log(updatedArray)
    this.setState({toyCollections:updatedArray})
    
    
    fetch(`http://localhost:3000/toys/${id}`, {
      method: "DELETE"
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
        <ToyContainer renderToys={this.renderToys}/>
      </>
    );
  }

}

export default App;
