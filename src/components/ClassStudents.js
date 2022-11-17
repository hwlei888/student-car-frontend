

import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import '../css/classStudents.css'

import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 

function ClassStudent(props){

    const dispatch = useDispatch();

    // console.log('ClassStudent-useEffect-props.students', props.students); // test

    // get car related student name
    const showStudentName = (item) => {

        dispatch({type: 'selectStudent/set', payload: item});

    }; // showStudentName()


    return(
        <div className='classStudents-container'>

            <p className='classStudents-title'>Students</p>
            <p className='classStudents-title classStudents-title-name'>Name</p>

            {
                !props.showA && !props.showB
                &&
                <p>Click Class name in square to check each class students</p>
            }

            {
                props.showA &&
                <div>
                <div className='classStudents-classname'>Class A</div>
                {
                    props.students &&
                    props.students.map((item, index) => 
                        <div key={item.id} className='classStudents-text'>
                            {
                                item.classroom === 'A'
                                &&
                                (
                                    props.msg[item.id]
                                    ?
                                    <p 
                                    style={{color:'rgb(208, 184, 112)'}}
                                    onClick={() => showStudentName(item)}
                                    >
                                        {item.name}
                                    </p>
                                    :
                                    <p 
                                    style={(item.is_leave && !props.isHere[item.id]) ? {color:'rgb(208, 184, 112)'}:{color:'black'}}
                                    onClick={() => showStudentName(item)}
                                    >
                                        {item.name}
                                    </p>
                                )
                            }
                        </div>
                    )

                }
                </div>  
            }


            {
                props.showB &&
                <div>
                <div className='classStudents-classname'>Class B</div>
                {
                    props.students &&
                    props.students.map((item, index) => 
                        <div key={item.id} className='classStudents-text'>
                            {
                                item.classroom === 'B'
                                &&
                                (
                                    props.msg[item.id]
                                    ?
                                    <p 
                                    style={{color:'rgb(208, 184, 112)'}}
                                    onClick={() => showStudentName(item)}
                                    >
                                        {item.name}
                                    </p>
                                    :
                                    <p 
                                    style={(item.is_leave && !props.isHere[item.id]) ? {color:'rgb(208, 184, 112)'}:{color:'black'}}
                                    onClick={() => showStudentName(item)}
                                    >
                                        {item.name}
                                    </p>
                                )
                            }
                        </div>
                    )

                }
                </div>  
            }



        </div>
    )
}

export default ClassStudent;


