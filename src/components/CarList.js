

import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const RAILS_BASE_URL = 'http://localhost:3000/'

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
        <div>

            {
                loading
                ?
                <p>Loading results...</p>
                :
                cars &&
                cars.map((item, index) => 
                    <div key={item.id}>
                        {
                            props.msg[item.student.id]
                            ?
                            <p 
                            style={{color:'green'}}
                            onClick={() => showStudentName(item)}
                            >
                                {item.registration}
                            </p>
                            :
                            <p 
                            style={(item.student.is_leave && !props.isHere[item.student.id]) ? {color:'green'}:{color:'black'}}
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





