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

        document.querySelector("#selection-tweet-order").value = '0';

        if (objTweets.length > 0) {
            this.setState({
                'tweets': objTweets,
                'original_tweets': objTweets,
                'isLoading': false
            });
            this.calculateStatistics();
        } else {
            document.querySelector("#search_twitter").value = '';
            alert("Oops! Look likes that the username that you inserted doesn't exists!");
        }
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
                .then(this.applyResults)
                .catch((e) => {
                    document.querySelector("#search_twitter").value = '';
                    alert(e.error);
                });
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
        if (this.state.tweets.length > 0) {
            const linkProps = {target: '_blank', rel: 'noreferrer'}

            for (let i = 0; i < this.state.tweets.length; i++) {
                tweets.push(
                    <Col md={4}>
                        <Tweet linkProps={linkProps} data={this.state.tweets[i]}/>
                    </Col>
                );
            }
        } else {
            tweets.push(
                <Col md={12} className="text-center mt-5 mb-5">
                    <h5>Oh no! There aren't tweets to show :/</h5>
                </Col>
            )
        }
        return tweets
    };

    orderTweets = (elem, customTweets = null) => {
        let tweets;

        if (customTweets === null)
            tweets = this.state.tweets;
        else
            tweets = customTweets;

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
                return second.favorite_count - first.favorite_count;
            });
        else if (elem.value === "3")
            tweets.sort(function (first, second) {
                return first.favorite_count - second.favorite_count;
            });

        if (customTweets === null)
            this.setState({tweets: tweets});
        else
            return tweets
    };

    applyFilter = () => {
        if (this.state.original_tweets.length > 0) {
            let insertDate = document.querySelector('#date-filter').value;
            let insertDateType = parseInt(document.querySelector('#date-filter-type').value);
            let tweetLenght = document.querySelector('#tweet-lenght-filter').value;
            let tweetLenghtType = parseInt(document.querySelector('#tweet-lenght-filter-type').value);
            let favoriteCount = document.querySelector('#favorite-cont-filter').value;
            let favoriteCountType = parseInt(document.querySelector('#favorite-cont-filter-type').value);
            let mentionCount = document.querySelector('#mention-filter').value;
            let mentionCountType = parseInt(document.querySelector('#mention-filter-type').value);
            let hashtagCount = document.querySelector('#hashtag-filter').value;
            let hashtagCountType = parseInt(document.querySelector('#hashtag-filter-type').value);
            const tweets = this.state.original_tweets;
            let newTweets = [];

            if (insertDate !== '') {
                insertDate = new Date(insertDate).setHours(0, 0, 0, 0);
            }


            for (const tweet of tweets) {
                let flag = false;
                let stop = false;

                const tweetDate = new Date(tweet.created_at).setHours(0, 0, 0, 0);
                if (insertDate !== '') {
                    if (insertDateType === 0) {
                        if (insertDate === tweetDate) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (insertDateType === 1) {
                        if (insertDate !== tweetDate) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (insertDateType === 2) {
                        if (insertDate < tweetDate) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (insertDateType === 3) {
                        if (insertDate <= tweetDate) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (insertDateType === 4) {
                        if (insertDate > tweetDate) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (insertDateType === 5) {
                        if (insertDate >= tweetDate) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    }
                }

                if (tweetLenght !== '' && !stop) {
                    if (tweetLenghtType === 0) {
                        if ((tweet.text).length === parseFloat(tweetLenght)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (tweetLenghtType === 1) {
                        if ((tweet.text).length !== parseFloat(tweetLenght)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (tweetLenghtType === 2) {
                        if ((tweet.text).length < parseFloat(tweetLenght)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (tweetLenghtType === 3) {
                        if ((tweet.text).length <= parseFloat(tweetLenght)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (tweetLenghtType === 4) {
                        if ((tweet.text).length > parseFloat(tweetLenght)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (tweetLenghtType === 5) {
                        if ((tweet.text).length >= parseFloat(tweetLenght)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    }
                }

                if (favoriteCount !== '' && !stop) {
                    if (favoriteCountType === 0) {
                        if (tweet.favorite_count === parseFloat(favoriteCount)) {
                            console.log("wntrou");
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (favoriteCountType === 1) {
                        if (tweet.favorite_count !== parseFloat(favoriteCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (favoriteCountType === 2) {
                        if (tweet.favorite_count > parseFloat(favoriteCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (favoriteCountType === 3) {
                        if (tweet.favorite_count >= parseFloat(favoriteCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (favoriteCountType === 4) {
                        if (tweet.favorite_count < parseFloat(favoriteCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (favoriteCountType === 5) {
                        if (tweet.favorite_count <= parseFloat(favoriteCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    }
                }

                if (mentionCount !== '' && !stop) {
                    if (mentionCountType === 0) {
                        if (this.getMentionsNumber(tweet.text) === parseFloat(mentionCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (mentionCountType === 1) {
                        if (this.getMentionsNumber(tweet.text) !== parseFloat(mentionCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (mentionCountType === 2) {
                        if (this.getMentionsNumber(tweet.text) > parseFloat(mentionCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (mentionCountType === 3) {
                        if (this.getMentionsNumber(tweet.text) >= parseFloat(mentionCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (mentionCountType === 4) {
                        if (this.getMentionsNumber(tweet.text) < parseFloat(mentionCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (mentionCountType === 5) {
                        if (this.getMentionsNumber(tweet.text) <= parseFloat(mentionCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    }
                }

                if (hashtagCount !== '' && !stop) {
                    if (hashtagCountType === 0) {
                        if (this.getHashtagsNumber(tweet.text) === parseFloat(hashtagCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (hashtagCountType === 1) {
                        if (this.getHashtagsNumber(tweet.text) !== parseFloat(hashtagCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (hashtagCountType === 2) {
                        if (this.getHashtagsNumber(tweet.text) > parseFloat(hashtagCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (hashtagCountType === 3) {
                        if (this.getHashtagsNumber(tweet.text) >= parseFloat(hashtagCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (hashtagCountType === 4) {
                        if (this.getHashtagsNumber(tweet.text) < parseFloat(hashtagCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    } else if (hashtagCountType === 5) {
                        if (this.getHashtagsNumber(tweet.text) <= parseFloat(hashtagCount)) {
                            flag = true;
                        } else {
                            flag = false;
                            stop = true;
                        }
                    }
                }

                if (flag)
                    newTweets.push(tweet);
            }

            if (newTweets.length !== 0 || (insertDate !== '' || tweetLenght !== '' || favoriteCount !== '' || mentionCount !== '' || hashtagCount !== ''))
                this.setState({
                    tweets: this.orderTweets(document.querySelector('#selection-tweet-order'), newTweets)
                });
            else
                this.setState({
                    tweets: tweets
                });
        } else
            alert("To continue, please provide a twitter @username!");
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
