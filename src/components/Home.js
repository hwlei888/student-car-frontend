
import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import '../css/home.css'
import CarList from './CarList';
// import Count from './Count';

const RAILS_BASE_URL = 'http://localhost:3000/'

function Home(){

    let linkStudent = useSelector(state => state.selectStudent);
    console.log('Home-function-selectStudent', linkStudent); // test
    
    // isHere and message and is_leave work together to make the logic run better
    const [isHere, setIsHere] = useState({}); 
    const [message, setMessage] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState(null);
    const [leaveCountA, setLeaveCountA] = useState(0);
    const [leaveCountB, setLeaveCountB] = useState(0);




    useEffect(() => {
        findAllStudents();

    }, []);


    // get all students info from server
    const findAllStudents = async () => {
        try{
            setLoading(true);

            const res = await axios.get(RAILS_BASE_URL + 'students.json');
            console.log('Home-findAllStudents', res.data); //test
            localStorage.setItem('allStudents', JSON.stringify(res.data));

            setLoading(false);
            setStudents(res.data);

        }catch(err){
            console.error('Error loading All cars', err); //test

            setLoading(false);
            setError(err);
        }
    } // findAllStudents()


    if(error){
        return <p>Error Loading from API</p>
    }


    // count the total number of students in each class
    const StudentsCount = ({item, room}) => {

        let countA = 0;
        let countB = 0;
        item.forEach(element => {
            if(element.classroom === 'A'){
                countA++;
            }else{
                countB++;
            }
        });

        if(room === 'A'){
            return countA;
        }else{
            return countB;
        }

    }; // StudentsCount()



    // calculate the number of left students and at here
    const StudentsLeaveOrNot = ({item, room, status}) => {

        let numLeaveA = 0;
        let numHereA = 0;
        let numLeaveB = 0;
        let numHereB = 0;
        item.forEach(element => {
            if(element.classroom === 'A'){
                if(element.is_leave){
                    numLeaveA++;
                }else{
                    numHereA++;
                }
            }else{
                if(element.is_leave){
                    numLeaveB++;
                }else{
                    numHereB++;
                }
            }
        });

        if(room === 'A' && status === 'leave'){
            console.log('numLeaveA', numLeaveA);
            console.log('leaveCountA', leaveCountA);
            return numLeaveA + leaveCountA;
        }else if(room === 'A' && status === 'here'){
            return numHereA - leaveCountA;
        }else if(room === 'B' && status === 'leave'){
            return numLeaveB + leaveCountB;
        }else{
            return numHereB - leaveCountB;
        }

    }; // StudentsLeaveOrNot()


    const LinkStudentIsLeave = ({linkStudentId}) => {
        let result;
        if(students){
            students.forEach(item => {
                if(item.id === linkStudentId){
                    if(item.is_leave){
                        console.log('LinkStudentIsLeave-item', item.is_leave)
                        result = `${item.name} has left`;
                    }
                }
            })
        }
        return result;

    }; // LinkStudentIsLeave








    // if click the leave button, student leave
    const studentLeave = async(item) => {

        const res = await axios.patch(RAILS_BASE_URL + `students/${item.id}`, {student: {is_leave: true}});

        // in case back from other link and isHere is back to {}
        // linkStudent.is_leave = true;
        
        setMessage({
            ...message,
            [item.id]: `${item.name} has left`
        });

        setIsHere({
            ...isHere,
            [item.id]: false
        });

        let countA = leaveCountA;
        // if empty message, means not duplicate, and class A
        // means A student leave
        // if((!isHere[item.id] || isHere[item.id] === true) && !message[item.id] && item.classroom === 'A'){
        if((isHere[item.id] && item.classroom === 'A') || (!item.is_leave && !message[item.id] && !isHere[item.id] && item.classroom === 'A')){
            countA++;
        }
        setLeaveCountA(countA);

        let countB = leaveCountB;
        if((isHere[item.id] && item.classroom === 'B') || (!item.is_leave && !message[item.id] && !isHere[item.id] && item.classroom === 'B')){
            countB++;
        }
        setLeaveCountB(countB);

    }; // studentLeave()


    // if click the still here button, student not leave
    const studentNotLeave = async(item) => {

        const res = await axios.patch(RAILS_BASE_URL + `students/${item.id}`, {student: {is_leave: false}});

        // linkStudent.is_leave = false;
        
        setMessage({
            ...message,
            [item.id]: null
        });

        setIsHere({
            ...isHere,
            [item.id]: true
        });

        // if isHere = false, and have message, means not duplicate, and class A
        // means A student leave
        let countA = leaveCountA;
        if((message[item.id] && item.classroom === 'A') || (item.is_leave && !message[item.id] && !isHere[item.id] && item.classroom === 'A')){
            countA--;
        }
        setLeaveCountA(countA);

        let countB = leaveCountB;
        if((message[item.id] && item.classroom === 'B') || (item.is_leave && !message[item.id] && !isHere[item.id] && item.classroom === 'B')){
            countB--;
        }
        setLeaveCountB(countB);

    }; // studentNotLeave()


    return(
        <div>
            <h1>Home</h1>

            <div className='home-container'>
                <div className='listOfCars'>

                    <CarList />

                </div>


                <div className='class-container'>

                    {/* Class A */}
                    <div className='classA-container'>
                        <p>Class A</p>

                        <div className='classA-count-container'>
                            {
                                students &&
                                <div>
                                    <p>
                                        No.Total: <StudentsCount item={students} room={'A'}/>
                                    </p>

                                    <p>
                                        No.Already Left: <StudentsLeaveOrNot item={students} room={'A'} status={'leave'}/>
                                    </p>

                                    <p>
                                        No.Still here: <StudentsLeaveOrNot item={students} room={'A'} status={'here'}/>
                                    </p>
                                </div>
                            }
             

                        </div>






                        {
                            students &&
                            linkStudent &&
                            (
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
                                        <p><LinkStudentIsLeave linkStudentId={linkStudent.id}/></p>
                                    }
                                </div>
                            )
                        }
                    </div>



                    {/* Class B */}
                    <div className='classB-container'>
                        <p>Class B</p>

                        <div className='classB-count-container'>
                            {
                                students &&
                                <div>
                                    <p>
                                        No.Total: <StudentsCount item={students} room={'B'}/>
                                    </p>

                                    <p>
                                        No.Already Left: <StudentsLeaveOrNot item={students} room={'B'} status={'leave'}/>
                                    </p>

                                    <p>
                                        No.Still here: <StudentsLeaveOrNot item={students} room={'B'} status={'here'}/>
                                    </p>
                                </div>
                            }
             

                        </div>




                        {
                            students &&
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
                                    <p><LinkStudentIsLeave linkStudentId={linkStudent.id}/></p>
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




