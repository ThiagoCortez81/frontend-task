//Importing React Lib
import React, {Component} from 'react'

//Importing components from Boostrap Lib
import {Container} from 'react-bootstrap'

//Importing custom components
import SearchTwitter from '../searchTwitter/searchTwitter'
import Twitter from "../../libs/custom-lib-twitter";

class Main extends Component {

    searchTweet = (tweetCount = 50) => {
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

            const apply = (json) => {
                els.result.value = JSON.stringify(json, null, 2)
                console.log(JSON.parse(els.result.value));
            };
            tw[els.method](`https://api.twitter.com/1.1/${els.endpoint.trim()}.json`, params)
                .then(apply);
        } else {
            alert('To continue, please send-us some twitter username!');
        }
    };

    render() {
        return (
            <main>
                <Container className="bg-white">
                    <SearchTwitter searchTweet={this.searchTweet}/>
                </Container>
            </main>
        );
    }
}

export default Main;
