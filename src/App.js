import React, {Component} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
//Importing Head Component
import Header from './components/header/header';

//Importing Main Component
import Main from './components/main/main';

import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Main searchTweet={this.searchTweet}/>
            </div>
        );
    }
}

export default App;
