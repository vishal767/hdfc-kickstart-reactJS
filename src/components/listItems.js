import React, { Component } from 'react';
import './App.css';
import styles from './styles';
import { Container, Row, Col } from 'reactstrap';

const months =['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:this.props.list
    }

  }
  getListItems(){
      let {list} =this.state;
      let listItems = list.map((item)=>
      <div className="card-flex grid-item">
        <div className="card-flex-wrapper">
        <Row>
        <Col xs="6">
          <div className="card-author">
            {item.by}
          </div>
        </Col>
        <Col xs="6">
          <div className="card-fund">
            {item['percentage.funded']} of {item['amt.pledged']} {item.currency.toUpperCase()} funded
          </div>
        </Col>
        </Row>
          <div className="card-title">
            {item.title}
          </div>
          <div className="card-blurb">
            {item.blurb}
          </div>
          <div className="hr-line"/>
          <Row>
          <Col xs="6">
            <div className="card-author">
              End Time :{new Date(item['end.time']).getDate()+', '+months[new Date(item['end.time']).getMonth()]}
              <br/>
              <img src = {require('../flags/'+item.country.toLowerCase()+'.png')} /> {item.location}
            </div>
          </Col>
          <Col xs="6">
            <div className="card-fund">
              {item['percentage.funded']} of {item['amt.pledged']} {item.currency.toUpperCase()} funded
              <br/>
              {item['num.backers']} backers
            </div>
          </Col>
          </Row>

        </div>
      </div>
    )

    return listItems;
  }
  render() {
    console.log(this.state.list);
    return (
      <div className="App">
        <div className="card grid-container">
        {this.getListItems()}
        </div>
      </div>
    );
  }
}

export default App;
