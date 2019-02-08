//Importing React Lib
import React, {Component} from 'react'

//Importing components from Boostrap Lib
import {Container} from 'react-bootstrap'

//Importing custom components
import SearchTwitter from '../searchTwitter/searchTwitter'
import Twitter from "../../libs/custom-lib-twitter";
import Tweet from 'react-tweet'
import twttr from 'twitter-text'
import {Row, Col} from "react-bootstrap";

class Main extends Component {

    constructor() {
        super();

        this.state = {
            tweets: [],
            tweets_statistics: [],
            isLoading: false
        }
    }

    applyResults = (json) => {
        const objTweets = JSON.parse(JSON.stringify(json, null, 2));
        this.setState({
            'tweets': objTweets,
            'isLoading': false
        });

        this.calculateStatistics();
    };

    searchTweet = (tweetCount = 50) => {
        this.setState({
            'isLoading': true
        });
        const twitterUser = document.querySelector("#search_twitter").value.replace('@', '');

        if (twitterUser !== '') {
            const els = {
                credentials: {
                    consumerKey: 'SnJlUyhs5euDL7PBY0tfnS7NB',
                    consumerSecret: 'iVVlK6jSJCW5QkwxJiYHbkaOojW87npJkv7xVAa8vmVSqJWc8o',
                    accessToken: '811725754111262720-1K9ezUKC57xtiLkFONZWnb74miOfabM',
                    accessTokenSecret: '3TE2FF9Vmz0qVValsNIoWM3q64UxOzhKi40znJkQTruty'
                },
                method: 'get',
                endpoint: 'statuses/user_timeline',
                params: {
                    nocache: (new Date()).getTime(),
                    screen_name: twitterUser,
                    count: tweetCount
                },
                result: {
                    value: ''
                }
            };

            els.result.value = '';

            const tw = new Twitter(
                els.credentials.consumerKey.trim(),
                els.credentials.consumerSecret.trim(),
                els.credentials.accessToken.trim(),
                els.credentials.accessTokenSecret.trim()
            );
            const params = els.params;

            tw[els.method](`https://api.twitter.com/1.1/${els.endpoint.trim()}.json`, params)
                .then(this.applyResults);
        } else {
            alert('To continue, please send-us some twitter username!');
        }
    };

    calculateStatistics = () => {
        const tweets = this.state.tweets;
        let tweets_statistics = {
            like_count: 0,
            avg_likes: 0,
            mentions: {}
        };

        for (const tweet of tweets) {
            // console.log(tweet.text);
            // sum of all likes
            tweets_statistics.like_count += tweet.favorite_count;

            // all mentions in tweets with number of unique occurences
            const mentions = twttr.extractMentions(tweet.text);
            for (const mention of mentions) {
                if (mention in tweets_statistics.mentions) {
                    tweets_statistics.mentions[mention] += 1;
                } else {
                    tweets_statistics.mentions[mention] = 1;
                }
            }
        }
        //average likes per tweet
        tweets_statistics.avg_likes = tweets_statistics.like_count / tweets.length;

        this.setState({tweets_statistics: tweets_statistics})
    };

    createTweets = () => {
        let tweets = [];

        for (let i = 0; i < this.state.tweets.length; i++) {
            tweets.push(
                <Col md={4}>
                    <Tweet data={this.state.tweets[i]}/>
                </Col>
            );
        }
        return tweets
    };

    render() {
        return (
            <main>
                <Container className="bg-white">
                    <SearchTwitter tweetStatistics={this.state.tweets_statistics} searchTweet={this.searchTweet}/>
                    <Row>
                        {this.createTweets()}
                    </Row>
                </Container>
            </main>
        );
    }
}

export default Main;
