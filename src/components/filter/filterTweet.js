//Importing React Lib
import React, {Component} from 'react'

import {Row, Col, Button, FormControl} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormLabel from "react-bootstrap/es/FormLabel";

class FilterTweet extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: null,
            showFilter: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });

        console.log(date);
    };

    mountFilterType = () => {
        let options = [];
        options.push(<option value="0">Equals (=)</option>);
        options.push(<option value="1">Not Equals (!=)</option>);
        options.push(<option value="2">Greater than (>)</option>);
        options.push(<option value="3">Greater or equals than (>=)</option>);
        options.push(<option value="4">Less than (&lt;) </option>);
        options.push(<option value="5">Less or equals than (&lt;=)</option>);

        return options;
    };

    handleFilter = () => {
        console.log(this.state.showFilter);
        this.setState({showFilter: !this.state.showFilter})
    };

    render() {
        return (
            <>
                <div className='w-100 text-center'>
                    <Button variant={"light"} onClick={this.handleFilter}>Show/Hide Filters...</Button>
                </div>

                <Row id="filter_section" className="mb-2">
                    {this.state.showFilter ?
                        <>
                            <Col md={12}>
                                Filter by: <small>(leave blank if you doesn't need the filter)</small>
                            </Col>
                            <Col md={2}>
                                <FormLabel>Date</FormLabel>
                                <DatePicker id="date-filter"
                                            placeholderText='Date'
                                            selected={this.state.startDate}
                                            onChange={this.handleChange}/>
                                <FormControl as="select" id="date-filter-type">
                                    {this.mountFilterType()}
                                </FormControl>
                            </Col>
                            <Col md={2}>
                                <FormLabel>Tweet size</FormLabel>
                                <FormControl type="number" placeholder="Tweet size" id="tweet-lenght-filter"/>
                                <FormControl as="select" id="tweet-lenght-filter-type">
                                    {this.mountFilterType()}
                                </FormControl>
                            </Col>
                            <Col md={2}>
                                <FormLabel>Likes</FormLabel>
                                <FormControl type="number" placeholder="Likes" id="favorite-cont-filter"/>
                                <FormControl as="select" id="favorite-cont-filter-type">
                                    {this.mountFilterType()}
                                </FormControl>
                            </Col>
                            <Col md={2}>
                                <FormLabel>Mentions</FormLabel>
                                <FormControl type="number" placeholder="Mentions" id="mention-filter"/>
                                <FormControl as="select" id="mention-filter-type">
                                    {this.mountFilterType()}
                                </FormControl>
                            </Col>
                            <Col md={2}>
                                <FormLabel>Hashtag</FormLabel>
                                <FormControl type="number" placeholder="Hashtag" id="hashtag-filter"/>
                                <FormControl as="select" id="hashtag-filter-type">
                                    {this.mountFilterType()}
                                </FormControl>
                            </Col>
                            <Col md={2}>
                                <Button className="btn btn-secondary mt-2-rem" onClick={this.props.applyFilter}>Filter
                                    IT!</Button>
                            </Col>
                        </>
                        : null}
                </Row>
            </>
        )
    }
}

export default FilterTweet;
