//Importing React Lib
import React, {Component} from 'react'

import {Row, Col, Button, FormControl} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class FilterTweet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: null
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });

        console.log(date);
    };

    render() {
        return (
            <Row>
                <Col md={3}>
                    <DatePicker id="date-filter"
                                selected={this.state.startDate}
                                onChange={this.handleChange}/>
                </Col>
                <Col md={1}>
                    <FormControl id="tweet-lenght-filter"/>
                </Col>
                <Col md={1}>
                    <FormControl id="favorite-cont-filter"/>
                </Col>
                <Col md={1}>
                    <FormControl id="mention-filter"/>
                </Col>
                <Col md={1}>
                    <FormControl id="hashtag-filter"/>
                </Col>
                <Col>
                    <Button className="btn btn-twitter" onClick={this.props.applyFilter}>Salvar</Button>
                </Col>
            </Row>
        )
    }
}

export default FilterTweet;
