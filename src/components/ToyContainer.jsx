import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component{

  render(){

    return(
      <div id="toy-collection">
        {this.props.renderToys()}
      </div>
    );

  }

}

export default ToyContainer;
