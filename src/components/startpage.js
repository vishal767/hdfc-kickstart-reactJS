import React, { Component } from 'react';
import './App.css';
import styles from './styles';
import ListItems from './listItems';
import { Badge } from 'reactstrap';
import {message} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
class App extends Component {
  constructor(props){
    super(props);
    this.getList=this.getList.bind(this);

    this.state = {
      list:[],
      initialList:[],
      searchTerm:"",
      reportText:null,
      endTime:0,
      country:0,
      amount:0,
      backers:0,
    }
    this.getList();
    this.setSearch=this.setSearch.bind(this);
    this.getSearch=this.getSearch.bind(this);
    this.sortCountry=this.sortCountry.bind(this);
    this.sortAmount=this.sortAmount.bind(this);
    this.sortEndTime=this.sortEndTime.bind(this);
    this.sortBackers=this.sortBackers.bind(this);

  }
  sortCountry(){
    let list=this.state.list;
    console.log(list)
    list=list.sort((a, b) => a.country.localeCompare(b.country));
    if(this.state.country){
      list=list.reverse();
      this.setState({
        country:0,
        list:list
      })
    }
    else{
      this.setState({
        country:1,
        list:list
      })
    }


  }
  sortAmount(){
    let list=this.state.list;
    console.log(list)
    list=list.sort((a, b) => {
      if(a['amt.pledged']<b['amt.pledged'])
      return -1;
      else if(a['amt.pledged']>b['amt.pledged'])
      return 1;
      else return 0;
    });
    if(this.state.amount){
      list=list.reverse();
      this.setState({
        amount:0,
        list:list
      })
    }
    else{
      this.setState({
        amount:1,
        list:list
      })
    }
  }
  sortEndTime(){
    let list=this.state.list;
    console.log(list)//end.time
    list=list.sort((a, b) => {
      let c=new Date(a['end.time']);
      let d=new Date(b['end.time']);
      if(c<d)
      return -1;
      else if(c>d)
      return 1;
      else return 0;
    });
    if(this.state.endTime){
      list=list.reverse();
      this.setState({
        endTime:0,
        list:list
      })
    }
    else{
      this.setState({
        endTime:1,
        list:list
      })
    }
  }
  sortBackers(){
    let list=this.state.list;
    console.log(list)

    list=list.sort((a, b) => {
      if(a['num.backers']<b['num.backers'])
      return -1;
      else if(a['num.backers']>b['num.backers'])
      return 1;
      else return 0;
    });
    if(this.state.backers){
      list=list.reverse();
      this.setState({
        backers:0,
        list:list
      })
    }
    else{
      this.setState({
        backers:1,
        list:list
      })
    }
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
            this.setState({
              list:list,
              initialList:list
            });
          })
          .catch((error) => {
            console.error(error)
          })

  }
  setSearch(event){
    let value=event.currentTarget.value;
    let searchList=[];
    this.state.initialList.forEach(function(item){
      if(item.title.toLowerCase().includes(value.toLowerCase())){
        searchList.push(item);
      }
    });
    if(searchList.length){
      this.setState({
        searchTerm:value,
        list:searchList,
        reportText:null
      })
    }
    else{
      this.setState({
        list:searchList,
        reportText:'No kickstarters available',
        searchTerm:value
      })
    }

  }
  getSearch(){
    let value=this.state.searchTerm;
    let searchList=[];
    this.state.initialList.forEach(function(item){

      if(item.title.toLowerCase().includes(value.toLowerCase())){
        searchList.push(item);
      }
    });
    if(searchList.length){
      this.setState({
        list:searchList,
        reportText:null
      })
    }
    else{
      this.setState({
        list:searchList,
        reportText:'No kickstarters available'
      })
    }

  }
  render() {
    console.log(this.state.list);
    return (
      <div className="App">
      <h1>HDFC Life ReactJS - kickstarter Project</h1>
      <h5>By vishal J &nbsp; .<a href="https://github.com/vishal767" target="_blank"> <FontAwesomeIcon icon={['fab', 'github']} /></a> &nbsp; . <a href="https://codepen.io/Vish0007/" target="_blank"> <FontAwesomeIcon icon={['fab', 'codepen']} /></a></h5>
      <div className="search-height">
      <div className="search-text-wrap">
        <input type='text' className="search-text" placeholder={"Search by name"} value={this.state.searchTerm} onChange={(e)=>this.setSearch(e)}/>
        <div className="search-button" onCLick={this.getSearch}>Search</div>
      </div>
      <div align="center">
      <div className="display-inline">Sort by: &nbsp;&nbsp;</div>
      <h3 className="display-inline">
      <Badge color="secondary" onClick={()=>this.sortCountry()}>country</Badge>
      <Badge color="secondary" onClick={()=>this.sortAmount()}>amount pledged</Badge>
      <Badge color="secondary" onClick={()=>this.sortEndTime()}>end time</Badge>
      <Badge color="secondary" onClick={()=>this.sortBackers()}>number of backers</Badge>
      </h3>
      <h6>Click the sort buttons to toggle sort</h6>
      </div>
      </div>
        <hr/>
        {
          (this.state.list.length)?
          <ListItems list={this.state.list}/>:
          (this.state.reportText)?
          <h1>{this.state.reportText}</h1>:
          <h1>Please Wait</h1>
        }

      </div>
    );
  }
}

export default App;
