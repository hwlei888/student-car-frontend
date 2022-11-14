
import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const RAILS_BASE_URL = 'http://localhost:3000/'

function Student(){

    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState(null);

    


    useEffect(() => {
        findAllStudents();

    }, [params.title]);



    const findAllStudents = async () => {
        try{
            setLoading(true);

            const res = await axios.get(RAILS_BASE_URL + 'students.json');
            console.log('Student-findAllStudents', res.data);

            setLoading(false);
            setStudents(res.data);

        }catch(err){
            console.error('Error loading All cars', err);

            setLoading(false);
            setError(err);
        }
    } // findAllStudents()


    if(error){
        return <p>Error Loading from API</p>
    }


    return(
        <div>
            <h1>ClassroomA</h1>

            <div>
                {
                    loading
                    ?
                    <p>Loading results...</p>
                    :
                    students &&
                    students.map((item, index) => 
                        <div key={item.id}>
                            {
                                item.classroom === params.title
                                &&
                                <p style={item.is_leave ? {color:'green'}:{color:'black'} }>
                                    {item.name}
                                </p>
                            }
                        </div>
                    )

                    

                }
            </div>



        </div>
    )
}

export default Student;
