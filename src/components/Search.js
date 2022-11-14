
import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RAILS_BASE_URL = 'http://localhost:3000/'

function Search(){

    const [searchText, setSearchText] = useState(null);



    const handleSubmit = async (ev) => {
        console.log('Search-handleSubmit-searchText', searchText);
        ev.preventDefault();
        const res = await axios.get(RAILS_BASE_URL + `search/${searchText}`);
        console.log('Search-handleSubmit-res.data', res.data);


    }; // handleSubmit()


    const handleInput = (ev) => {
        console.log('Search-handleInput', ev.target.value)
        setSearchText(ev.target.value);

    }; // handleInput()

    return(
        <div>
            <h1>Search</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder='Search for Registration Number'
                onChange={handleInput} 
                />
                <br />

                <button>Search</button>
            </form>

        </div>
    )
}


export default Search;



