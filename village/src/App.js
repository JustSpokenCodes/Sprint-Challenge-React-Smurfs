import React, { Component } from 'react';
import axios from "axios";
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3333/smurfs")
      .then(res => {
        const smurfs = res.data
        this.setState({smurfs})
      })
      .catch(err => console.error(err))
  }
  addSmurf = newSmurf => {
    const URL = "http://localhost:3333/smurfs";
    axios 
      .post(URL, newSmurf)
      .then(res => {
        const smurfs = res.data
        this.setState({ smurfs })
      })
      .catch(err => {
        console.error(err)
      })
  }
  delSmurf = id => {
    axios 
      .delete(`http://localhost:3333/smurfs/${id}`)
      .then(res => {
        const smurfs = res.data;
        this.setState({smurfs})
      })
      .catch(err => console.error(err))
  }
  render (){
    return (
      <div className = "App">
        <SmurfForm reset = {this.resetSmurfState} addSmurf= {this.addSmurf}/>
        <Smurfs smurfs={this.state.smurfs} delSmurf={this.state.delSmurf} />
      </div>
    );
  }
};
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  
export default App;
