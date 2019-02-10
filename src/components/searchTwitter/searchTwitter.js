//Importing React Lib
import React, {Component} from 'react'
import {Button, Col, FormControl, FormGroup, FormLabel, Row} from "react-bootstrap";
import ModalStatistics from '../modalStatistics/modalStatistics'

class SearchTwitter extends Component {

    addAtToTwitterUserName = () => {
        const elem = document.getElementById('search_twitter');

        let actualVal = elem.value;
        if (actualVal.indexOf('@') !== 0) {
            elem.value = '@' + actualVal.replace('@', '');
        }
    };

    render() {
        return (
            <Row className="pt-2">
                <Col md={6}>
                    <FormGroup>
                        <FormLabel>Twitter username:</FormLabel>
                        <FormControl placeholder="Twitter username" id="search_twitter"
                                     onChange={e => this.addAtToTwitterUserName()}/>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <br/>
                        <Button variant="twitter" className="mt-2" onClick={e => this.props.searchTweet()}>Search on
                            Twitter</Button>
                        <ModalStatistics tweetStatistics={this.props.tweetStatistics}/>
                    </FormGroup>
                </Col>

                <Col md={2}>
                    <FormLabel>Order by:</FormLabel>
                    <FormControl as="select" onChange={e => this.props.orderTweets(e.target)}>
                        <option value="0">Date - descending</option>
                        <option value="1">Date - ascending</option>
                        <option value="2">Likes - descending</option>
                        <option value="3">Likes - ascending</option>
                    </FormControl>
                </Col>
            </Row>
        );
    }
}


export default SearchTwitter;


