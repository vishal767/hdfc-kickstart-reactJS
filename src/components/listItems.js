import React, { Component } from 'react';
import './App.css';
import styles from './styles';
import { Container, Row, Col } from 'reactstrap';
import { Link} from 'react-router-dom';
const months =['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list:this.props.list
    }

  }
  shouldComponentUpdate(nextProps,nextState){
    console.log(nextProps,nextState);
    if(nextProps.list.length){
      nextState.list=nextProps.list;
      return true;
    }
    return false;
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
            {item['percentage.funded']}% of {item['amt.pledged']} {item.currency.toUpperCase()} funded
          </div>
        </Col>
        </Row>
          <div className="card-title">
            <a href={"https://www.kickstarter.com/"+item.url} target="_blank">{item.title}</a>
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
              {item['num.backers']} backers
              <br/>
              <a href={"https://www.kickstarter.com/"+item.url} target="_blank">Click Here to Know More</a> 
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
        {
          (this.state.list.length==1)?
          (
            <div className="card ">
            {this.getListItems()}
            </div>
          )
          :
          (
            <div className="card grid-container">
            {this.getListItems()}
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
