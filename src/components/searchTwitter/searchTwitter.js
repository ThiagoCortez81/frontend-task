//Importing React Lib
import React, {Component} from 'react'
import {Button, Col, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";

class SearchTwitter extends Component {

    addAtToTwitterUserName = () => {
        const elem = document.getElementById('search_twitter');

        let actualVal = elem.value;
        if (actualVal.indexOf('@') === -1) {
            elem.value = '@' + actualVal;
        }
    };

    render() {
        return(
            <Row className="pt-2">
                <Col md={6}>
                    <FormGroup>
                        <FormLabel>Twitter username:</FormLabel>
                        <FormControl placeholder="Twitter username" id="search_twitter" onChange={e => this.addAtToTwitterUserName()}/>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <br/>
                        <Button variant="twitter" className="mt-2">Search on Twitter</Button>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default SearchTwitter;
