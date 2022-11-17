

import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import '../css/carlist.css';

import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 

function CarList(props){

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cars,setCars] = useState(null);

    useEffect(() =>{
        findAllCars();
        
    }, []);


    // get cars json data from server
    const findAllCars = async () => {
        try{

            setLoading(true);

            const res = await axios.get(RAILS_BASE_URL + 'cars.json');
            // console.log('Home-findAllCars', res.data); //test

            setLoading(false);
            setCars(res.data);

        }catch(err){
            // console.error('Error loading All cars', err); // test
            
            setLoading(false);
            setError(err);
        }
    }; //findAllCars()

    if(error){
        return <p>Error Loading from API</p>
    };

    // get car related student name
    const showStudentName = (item) => {

        dispatch({type: 'selectStudent/set', payload: item.student});

    }; // showStudentName()


    return(
        <div className='carlist-container'>

            <p className='carlist-title'>Registration</p>
            <p className='carlist-title carlist-title-number'>Number</p>

            {
                loading
                ?
                <p>Loading results...</p>
                :
                cars &&
                cars.map((item, index) => 
                    <div 
                    key={item.id}
                    className='carlist-text'
                    >
                        {
                            props.msg[item.student.id]
                            ?
                            <p 
                            style={{color:'rgb(208, 184, 112)'}}
                            onClick={() => showStudentName(item)}
                            >
                                {item.registration}
                            </p>
                            :
                            <p 
                            style={(item.student.is_leave && !props.isHere[item.student.id]) ? {color:'rgb(208, 184, 112)'}:{color:'black'}}
                            onClick={() => showStudentName(item)}
                            >
                                {item.registration}
                            </p>
                        }
                    </div>
                )
            }
               
        </div>
    )
}

export default CarList;





