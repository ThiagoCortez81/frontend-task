//Importing React Lib
import React, {Component} from 'react'

//Importing components from Boostrap Lib
import {Container} from 'react-bootstrap'

//Importing custom components
import SearchTwitter from '../searchTwitter/searchTwitter'
import FilterTweet from '../filter/filterTweet'
import Twitter from "../../libs/custom-lib-twitter";
import Tweet from 'react-tweet'
import twttr from 'twitter-text'
import {Row, Col} from "react-bootstrap";

class Main extends Component {

    constructor() {
        super();

        this.state = {
            tweets: [],
            original_tweets: [],
            tweets_statistics: [],
            isLoading: false
        }
    }

    applyResults = (json) => {
        const objTweets = JSON.parse(JSON.stringify(json, null, 2));
        this.setState({
            'tweets': objTweets,
            'original_tweets': objTweets,
            'isLoading': false
        });

        console.log(this.state.tweets);

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
        const linkProps = {target: '_blank', rel: 'noreferrer'}

        for (let i = 0; i < this.state.tweets.length; i++) {
            tweets.push(
                <Col md={4}>
                    <Tweet linkProps={linkProps} data={this.state.tweets[i]}/>
                </Col>
            );
        }
        return tweets
    };

    orderTweets = (elem) => {
        let tweets = this.state.tweets;

        //sort by date and the number of likes
        if (elem.value === "0")
            tweets.sort(function (first, second) {
                const firstDate = new Date(first.created_at);
                const secondDate = new Date(second.created_at);

                return secondDate.getTime() - firstDate.getTime();
            });
        else if (elem.value === "1")
            tweets.sort(function (first, second) {
                const firstDate = new Date(first.created_at);
                const secondDate = new Date(second.created_at);

                return firstDate.getTime() - secondDate.getTime();
            });
        else if (elem.value === "2")
            tweets.sort(function (first, second) {
                return first.favorite_count - second.favorite_count;
            });
        else if (elem.value === "3")
            tweets.sort(function (first, second) {
                return second.favorite_count - first.favorite_count;
            });

        this.setState({tweets: tweets});
    };

    applyFilter = () => {
        let insertDate = document.querySelector('#date-filter').value;
        let tweetLenght = document.querySelector('#tweet-lenght-filter').value;
        let favoriteCount = document.querySelector('#favorite-cont-filter').value;
        let mentionCount = document.querySelector('#mention-filter').value;
        let hashtagCount = document.querySelector('#hashtag-filter').value;
        const tweets = this.state.original_tweets;
        let newTweets = [];

        if (insertDate !== '') {
            insertDate = new Date(insertDate).setHours(0, 0, 0, 0);
        }


        for (const tweet of tweets) {
            let flag = false;

            const tweetDate = new Date(tweet.created_at).setHours(0, 0, 0, 0);
            if (insertDate === tweetDate && insertDate !== '')
                flag = true;
            if ((tweet.text).length === parseFloat(tweetLenght) && tweetLenght !== '')
                flag = true;
            if (tweet.favorite_count === parseFloat(favoriteCount) && favoriteCount !== '')
                flag = true;
            if (this.getMentionsNumber(tweet.text) === parseFloat(mentionCount) && mentionCount !== '')
                flag = true;
            if (this.getHashtagsNumber(tweet.text) === parseFloat(hashtagCount) && hashtagCount !== '')
                flag = true;

            if (flag)
                newTweets.push(tweet);

            if (newTweets.length !== 0 || (insertDate !== '' || tweetLenght !== '' || favoriteCount !== '' || mentionCount !== '' || hashtagCount !== ''))
                this.setState({
                    tweets: newTweets
                });
            else
                this.setState({
                    tweets: tweets
                });
        }
    };

    getMentionsNumber = (str) => {
        var pattern = /\B@[a-z0-9_-]+/gi;
        const matches = str.match(pattern);

        if (matches !== null && matches !== undefined)
            return matches.length;

        return 0;
    };

    getHashtagsNumber = (str) => {
        var pattern = /\B#[a-z0-9_-]+/gi;
        const matches = str.match(pattern);

        if (matches !== null && matches !== undefined)
            return matches.length;

        return 0;
    };

    render() {
        return (
            <main>
                <Container className="bg-white">
                    <SearchTwitter orderTweets={this.orderTweets} tweetStatistics={this.state.tweets_statistics}
                                   searchTweet={this.searchTweet}/>
                    <FilterTweet applyFilter={this.applyFilter}/>
                    <Row>
                        {this.createTweets()}
                    </Row>
                </Container>
            </main>
        );
    }
}

export default Main;
