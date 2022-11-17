
import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';

import '../css/search.css'

const RAILS_BASE_URL = 'http://localhost:3000/'
const REACT_BASE_URL = 'http://localhost:3001/'


function Search(){

    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState(null);
    const [searchResultsCar, setSearchRestulsCar] = useState(null);
    const [searchResultsStudent, setSearchRestulsStudent] = useState(null);
    const [showSearchRestuls, setShowSearchResults] = useState(false);



    const handleSubmit = async (ev) => {
        // console.log('Search-handleSubmit-searchText', searchText); // test
        ev.preventDefault(); // prevent page refresh after submit

        const res = await axios.get(RAILS_BASE_URL + `search/${searchText}`);
        console.log('Search-handleSubmit-res.data', res.data); // test
        setSearchRestulsCar(res.data.car);
        setSearchRestulsStudent(res.data.student);
        setShowSearchResults(true);

        ev.target[0].value = ''; // clear input

    }; // handleSubmit()


    const handleInput = (ev) => {
        // console.log('Search-handleInput', ev.target.value); // test
        setSearchText(ev.target.value);

    }; // handleInput()


    //  click Close button
    const handleClick = () => {
        setSearchText(null);
        setSearchRestulsCar(null);
        setSearchRestulsStudent(null);
        setShowSearchResults(false);
    }

    // click Search Car result text
    const textClick = (item) => {
        dispatch({type: 'selectStudent/set', payload: item});
        // console.log('Search-textClick', item); // test
        setSearchText(null);
        setSearchRestulsCar(null);
        setSearchRestulsStudent(null);
        setShowSearchResults(false);
    }


    return(
        <div>
            
            <div className='search-container'>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    placeholder='Search for Registration Number or Student Name'
                    onChange={handleInput} 
                    />

                    <Button variant="warning" size='sm'>Search</Button>
                </form>

            </div>

            {
                (searchResultsCar || searchResultsStudent)
                &&
                <div>
                    <Modal
                        show={showSearchRestuls}
                        size='lg'
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Searching for "{searchText}"
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ListGroup>
                                {
                                    searchResultsCar.map(rlt => 
                                        rlt.registration
                                        &&
                                        <ListGroup.Item
                                            key={rlt.id}
                                            action
                                            variant='warning'
                                            className='center'
                                            // href={REACT_BASE_URL}
                                            onClick={() => textClick(rlt.student)}
                                        >
                                            {rlt.registration}
                                        </ListGroup.Item>
                                    )
                                }

{
                                    searchResultsStudent.map(rlt => 
                                        rlt.name
                                        &&
                                        <ListGroup.Item
                                            key={rlt.id}
                                            action
                                            variant='primary'
                                            className='center'
                                            // href={REACT_BASE_URL}
                                            onClick={() => textClick(rlt)}
                                        >
                                            {rlt.name}
                                        </ListGroup.Item>
                                    )
                                }
                            </ListGroup>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button onClick={handleClick}>Close</Button>
                        </Modal.Footer>
                    </Modal>


                </div>


            }




        </div>
    )
}


export default Search;



