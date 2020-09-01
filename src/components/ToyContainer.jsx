import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component{

  renderToys=()=>{
    return this.props.toyCollections.map((toy)=> <ToyCard key={toy.id} toy={toy} deleteHandler={this.props.deleteHandler} likeHandler={this.props.likeHandler}/>)
    }

  render(){

    return(
      <div id="toy-collection">
        {this.renderToys()}
      </div>
    );

  }

}

export default ToyContainer;
