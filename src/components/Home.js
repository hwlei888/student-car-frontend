
import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import '../css/home.css'

const RAILS_BASE_URL = 'http://localhost:3000/'

function Home(){

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cars,setCars] = useState(null);
    const [linkStudent, setLinkStudent] = useState(null);
    const [message, setMessage] = useState({});
    const [isHere, setIsHere] = useState({});

    useEffect(() =>{
        findAllCars();

    }, []);

    // get cars json data from server
    const findAllCars = async () => {
        try{

            setLoading(true);

            const res = await axios.get(RAILS_BASE_URL + 'cars.json');
            console.log('Home-findAllCars', res.data);

            setLoading(false);
            setCars(res.data);

        }catch(err){
            console.error('Error loading All cars', err);
            
            setLoading(false);
            setError(err);
        }
    } //findAllCars()

    if(error){
        return <p>Error Loading from API</p>
    }


    // get car related student name
    const showStudentName = (item) => {

        setLinkStudent(item.student);

    } // showStudentName()


    // if click the leave button, student leave
    const studentLeave = async(item) => {

        const res = await axios.patch(RAILS_BASE_URL + `students/${item.id}`, {student: {is_leave: true}});
        
        setMessage({
            ...message,
            [item.id]: `${item.name} has left`
        });

        setIsHere({
            ...isHere,
            [item.id]: false
        });

    } // studentLeave()


    // if clikc the still here button, student not leave
    const studentNotLeave = async(item) => {

        const res = await axios.patch(RAILS_BASE_URL + `students/${item.id}`, {student: {is_leave: false}});
        
        setMessage({
            ...message,
            [item.id]: null
        });

        setIsHere({
            ...isHere,
            [item.id]: true
        });

    } // studentNotLeave()


    return(
        <div>
            <h1>Home</h1>

            <div className='home-container'>
                <div className='listOfCars'>
                    {
                        loading
                        ?
                        <p>Loading results...</p>
                        :
                        cars &&
                        cars.map((item, index) => 
                            <div key={item.id}>
                                <div onClick={() => showStudentName(item)}>
                                    {item.registration}
                                </div>
                            </div>
                        )
                    }
                </div>

                <div className='class-container'>

                    <div className='classA-container'>
                        <p>Class A</p>
                        {
                            linkStudent &&
                            linkStudent.classroom === 'A' &&
                            <div>
                                <p>{linkStudent.name}</p>

                                <button onClick={() => {studentLeave(linkStudent)}}>
                                    Leave
                                </button>

                                <button onClick={() => {studentNotLeave(linkStudent)}}>
                                    Still here
                                </button>


                                {
                                    message[linkStudent.id]
                                    ?
                                    <p>{message[linkStudent.id]}</p>
                                    :
                                    (
                                        linkStudent.is_leave &&
                                        !isHere[linkStudent.id] &&
                                        <p>{linkStudent.name} has left</p>
                                    )
                                }
                            </div>
                        }
                    </div>


                    <div className='classB-container'>
                        <p>Class B</p>
                        {
                            linkStudent &&
                            linkStudent.classroom === 'B' &&
                            <div>
                                <p>{linkStudent.name}</p>

                                <button onClick={() => {studentLeave(linkStudent)}}>
                                    Leave
                                </button>

                                <button onClick={() => {studentNotLeave(linkStudent)}}>
                                    Still here
                                </button>


                                {
                                    message[linkStudent.id]
                                    ?
                                    <p>{message[linkStudent.id]}</p>
                                    :
                                    (
                                        linkStudent.is_leave &&
                                        !isHere[linkStudent.id] &&
                                        <p>{linkStudent.name} has left</p>
                                    )
                                }
                            </div>
                        }
                    </div>

            </div>





            </div>

            

        </div>
    )
}

export default Home;




