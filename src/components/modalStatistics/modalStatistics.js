//Importing React Lib
import React, {Component} from 'react'
import {Button, Modal, Row, Col} from 'react-bootstrap'

class ModalStatistics extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleShowModal = this.handleShowModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state = {
            showingModal: false
        };
    }

    handleCloseModal = () => {
        this.setState({showingModal: false});
    };

    handleShowModal = () => {
        this.setState({showingModal: true});
    };

    mountMentions = () => {
        let allMentions = [];

        for (const mention in (this.props.tweetStatistics.mentions)) {
            if (this.props.tweetStatistics.mentions.hasOwnProperty(mention)) {
                allMentions.push(
                    <Col sm={12} className="p-0">
                        <a href={'https://www.twitter.com/' + mention}
                           target="_blank">@{mention} {(this.props.tweetStatistics.mentions[mention] > 1) ? '(' + this.props.tweetStatistics.mentions[mention] + 'x)' : ''}</a>
                    </Col>
                )
            }
        }

        return allMentions;
    };

    render() {
        return (
            <>
                <Button variant="tallMentionswitter" className="mt-2" onClick={this.handleShowModal}>Search
                    statistics</Button>

                <Modal show={this.state.showingModal} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Final tweet's statistics</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <b>Sum of all likes:</b>
                            </Col>
                            <Col sm={6}>
                                {this.props.tweetStatistics.like_count}
                            </Col>
                            <Col sm={6}>
                                <b>Avg. likes by tweet:</b>
                            </Col>
                            <Col sm={6}>
                                {Math.round(this.props.tweetStatistics.avg_likes)}
                                <small className="ml-1">({this.props.tweetStatistics.avg_likes})</small>
                            </Col>
                            <Col sm={6}>
                                <b>In tweets mentions:</b>
                            </Col>
                            <Col sm={6}>
                                {this.mountMentions()}
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

export default ModalStatistics;
