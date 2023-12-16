import './App.css';
import NavBar from './componenet/NavBar';
import React, { Component, } from 'react';
import News from './componenet/News';
import LoadingBar from 'react-top-loading-bar'
//there is two ways one is rfc fucntion based or rcc class based function for our application choose either one
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
export default class App extends Component {
  apiKey = process.env.REACT_APP_API_KEY
  // apiKey='4009e42566dc48d2a69a98c6da52decf'
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />
          <Routes>
            <Route exact path="/home" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="general" pageSize={9} country="in" category="general" name="General" />} ></Route>

            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="general" pageSize={9} country="in" category="general" name="General" />} ></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="business" pageSize={9} country="in" category="business" name="Business" />} ></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="entertainment" pageSize={9} country="in" category="entertainment" name="Entertainment" />} ></Route>
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="general" pageSize={9} country="in" category="general" name="General" />} ></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="health" pageSize={9} country="in" category="health" name="Health"/>} ></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="science" pageSize={9} country="in" category="science" name="Science" />} ></Route>
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="sports" pageSize={9} country="in" category="sports" name="Sports" />} ></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key ="technology" pageSize={9} country="in" category="technology" name="Technology"/>} ></Route>

          </Routes>
        </Router>
      </div>
    )
  }
}

