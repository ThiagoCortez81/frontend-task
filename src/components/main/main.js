//Importing React Lib
import React from 'react'

//Importing components from Boostrap Lib
import {Container} from 'react-bootstrap'

//Importing custom components
import SearchTwitter from '../searchTwitter/searchTwitter'

const Main = () => (
    <main>
        <Container className="bg-white">
            <SearchTwitter/>
        </Container>
    </main>
);

export default Main;
