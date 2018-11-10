import React, { Component } from 'react';
import './App.css';
import styles from './styles';
import ListItems from './listItems';
class App extends Component {
  constructor(props){
    super(props);
    this.getList=this.getList.bind(this);

    this.state = {
      list:[]
    }
    this.getList();
  }
   getList(){
    let url='http://starlord.hackerearth.com/kickstarter';
   fetch(url,{
              method: 'GET',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              }
          }).then((response) => response.json())
          .then((list) => {
            this.setState({list});
          })
          .catch((error) => {
            console.error(error)
          })

  }
  render() {
    console.log(this.state.list);
    return (
      <div className="App">
        {
          (this.state.list.length)?
          <ListItems list={this.state.list}/>:
          <h1>Please Wait</h1>
        }

      </div>
    );
  }
}

export default App;
