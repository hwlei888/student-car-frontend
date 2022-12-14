
import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import '../css/home.css';
import CarList from './CarList';
import ClassStudent from './ClassStudents';

import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 

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
    const [showClassA, setShowClassA] = useState(false);
    const [showClassB, setShowClassB] = useState(false);




    useEffect(() => {
        findAllStudents();

    }, []);


    // get all students info from server
    const findAllStudents = async () => {
        try{
            setLoading(true);

            const res = await axios.get(RAILS_BASE_URL + 'students.json');
            console.log('Home-findAllStudents', res.data); //test
            // localStorage.setItem('allStudents', JSON.stringify(res.data));

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

        if(room === 'A' && status === 'leave' && (numLeaveA + leaveCountA) >= 0){
            console.log('numLeaveA', numLeaveA); // test
            console.log('leaveCountA', leaveCountA); // test
            return numLeaveA + leaveCountA;
        }else if(room === 'A' && status === 'here' && (numHereA - leaveCountA) >= 0){
            return numHereA - leaveCountA;
        }else if(room === 'B' && status === 'leave' && (numLeaveB + leaveCountB) >= 0){
            return numLeaveB + leaveCountB;
        }else{
            if((numHereB - leaveCountB) >= 0){
                return numHereB - leaveCountB;
            }
        }

    }; // StudentsLeaveOrNot()


    // show the message after page refresh
    const LinkStudentIsLeave = ({linkStudentId}) => {
        let result;
        if(students){
            students.forEach(item => {
                if(item.id === linkStudentId){
                    if(item.is_leave && !isHere[linkStudentId]){
                        // console.log('LinkStudentIsLeave-item', item.is_leave); // test
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

        // find that student and use in count condition
        let studentIsLeave;
        students.forEach(ele => {
            if(ele.id === item.id){
                studentIsLeave = ele.is_leave;
            }
        })
        // console.log('Home-studentIsLeave', studentIsLeave); // test

        let countA = leaveCountA;
        // if empty message, means not duplicate, and class A
        // means A student leave
        if((isHere[item.id] && item.classroom === 'A') || (!studentIsLeave && !message[item.id] && !isHere[item.id] && item.classroom === 'A')){
            countA++;
        }
        setLeaveCountA(countA);

        let countB = leaveCountB;
        if((isHere[item.id] && item.classroom === 'B') || (!studentIsLeave && !message[item.id] && !isHere[item.id] && item.classroom === 'B')){
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


        // find that student and use in count condition
        let studentIsLeave;
        students.forEach(ele => {
            if(ele.id === item.id){
                studentIsLeave = ele.is_leave;
            }
        })


        // if isHere = false, and have message, means not duplicate, and class A
        // means A student leave
        let countA = leaveCountA;
        if((message[item.id] && item.classroom === 'A') || (studentIsLeave && !message[item.id] && !isHere[item.id] && item.classroom === 'A')){
            countA--;
        }
        setLeaveCountA(countA);

        let countB = leaveCountB;
        if((message[item.id] && item.classroom === 'B') || (studentIsLeave && !message[item.id] && !isHere[item.id] && item.classroom === 'B')){
            countB--;
        }
        setLeaveCountB(countB);

    }; // studentNotLeave()



    // control to show Class A students or not
    const showClassAStudents = () => {
        setShowClassA(true);
        setShowClassB(false);

    }; // showClassAStudents()


    // control to show Class B students or not
    const showClassBStudents = () => {
        setShowClassA(false);
        setShowClassB(true);

    }; // showClassBStudents()







    return(
        <div className='home-container'>
            <div className='listOfCars'>

                <CarList                     
                msg={message}
                isHere={isHere}
                />

            </div>


            <div className='class-container'>

                {/* Class A */}
                <div className='classAB-container'>
                    <div className='class-title'>
                        <Button
                            onClick={showClassAStudents}
                            variant='light'
                        >    
                                Class A
                        </Button>
                    </div>

                    <div className='class-container-count-info'>


                        {/* Number of students */}
                        <div className='class-count-container'>
                            {
                                students &&
                                <div className='class-count-text'>
                                    <div>
                                        No.Total: 
                                        <p className='class-count-number'><StudentsCount item={students} room={'A'}/></p>
                                    </div>

                                    <div>
                                        No.Already Left: 
                                        <p className='class-count-number'><StudentsLeaveOrNot item={students} room={'A'} status={'leave'}/></p>
                                    </div>

                                    <div>
                                        No.Still here: 
                                        <p className='class-count-number'><StudentsLeaveOrNot item={students} room={'A'} status={'here'}/></p>
                                    </div>
                                </div>
                            }
                        </div>


                        <div className='class-student-leave-info'>
                            {
                                students &&
                                linkStudent &&
                                linkStudent.classroom === 'A' &&
                                (
                                    message[linkStudent.id]
                                    ?
                                    <p>{message[linkStudent.id]}</p>
                                    :
                                    <p><LinkStudentIsLeave linkStudentId={linkStudent.id}/></p>
                                )
                            }

                        </div>

                    




                        {/* student info & leave or not button & leave message */}
                        {
                            students &&
                            linkStudent &&
                            (
                                linkStudent.classroom === 'A' &&
                                <div className='class-student-info'>
                                    <p className='class-student-name'>{linkStudent.name}</p>
                                    <div>Phone Number: 
                                        <p>{linkStudent.phone}</p>
                                    </div>
                                    
                                    <div>Vehicle could take:
                                    {
                                        linkStudent.cars.map((item, index) =>
                                            <div key={item.id}>
                                                {
                                                    <div>{item.registration}</div>
                                                }
                                            </div>
                                        )
                                    }
                                    </div>

                                    <Button 
                                    onClick={() => {studentLeave(linkStudent)}}
                                    variant="warning"
                                    className='student-leave-button'
                                    >
                                        Leave
                                    </Button>


                                    <Button 
                                    onClick={() => {studentNotLeave(linkStudent)}}
                                    variant="outline-primary"
                                    >
                                        Still here
                                    </Button>

                                </div>
                            )
                        }

                    </div>
                </div>



                {/* Class B */}
                <div className='classAB-container'>
                    <div className='class-title'>
                        <Button
                            onClick={showClassBStudents}
                            variant='light'
                        >    
                                Class B
                        </Button>
                    </div>

                    <div className='class-container-count-info'>

                    <div className='class-count-container'>
                            {
                                students &&
                                <div className='class-count-text'>
                                    <div>
                                        No.Total: 
                                        <p className='class-count-number'><StudentsCount item={students} room={'B'}/></p>
                                    </div>

                                    <div>
                                        No.Already Left: 
                                        <p className='class-count-number'><StudentsLeaveOrNot item={students} room={'B'} status={'leave'}/></p>
                                    </div>

                                    <div>
                                        No.Still here: 
                                        <p className='class-count-number'><StudentsLeaveOrNot item={students} room={'B'} status={'here'}/></p>
                                    </div>
                                </div>
                            }
                        </div>



                        <div className='class-student-leave-info'>
                            {
                                students &&
                                linkStudent &&
                                linkStudent.classroom === 'B' &&
                                (
                                    message[linkStudent.id]
                                    ?
                                    <p>{message[linkStudent.id]}</p>
                                    :
                                    <p><LinkStudentIsLeave linkStudentId={linkStudent.id}/></p>
                                )
                            }

                        </div>




                        {
                            students &&
                            linkStudent &&
                            (
                                linkStudent.classroom === 'B' &&
                                <div className='class-student-info'>
                                    <p className='class-student-name'>{linkStudent.name}</p>
                                    <p>Phone Number: 
                                        <p>{linkStudent.phone}</p>
                                    </p>
                                    
                                    <div>Vehicle could take:
                                    {
                                        linkStudent.cars.map((item, index) =>
                                            <div key={item.id}>
                                                {
                                                    <div>{item.registration}</div>
                                                }
                                            </div>
                                        )
                                    }
                                    </div>

                                    <Button 
                                    onClick={() => {studentLeave(linkStudent)}}
                                    variant="warning"
                                    >
                                        Leave
                                    </Button>


                                    <Button 
                                    onClick={() => {studentNotLeave(linkStudent)}}
                                    variant="outline-primary"
                                    >
                                        Still here
                                    </Button>

                                </div>
                            )
                        }


                    </div>

                </div>

            </div>


            {/* different class student on the right */}
            <div className='students-container'>
                <ClassStudent 
                showA={showClassA} 
                showB={showClassB}
                msg={message}
                isHere={isHere}
                students={students}
                />

            </div>


            

        </div>
    )
}

export default Home;




