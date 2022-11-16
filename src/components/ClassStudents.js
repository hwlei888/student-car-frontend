

import React from 'react';
import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const RAILS_BASE_URL = 'http://localhost:3000/'

function ClassStudent(props){

    const dispatch = useDispatch();

    // console.log('ClassStudent-useEffect-props.students', props.students); // test

    // get car related student name
    const showStudentName = (item) => {

        dispatch({type: 'selectStudent/set', payload: item});

    }; // showStudentName()


    return(
        <div>
            {
                !props.showA && !props.showB
                &&
                <p>Click Class name in square to check each class students</p>
            }

            {
                props.showA &&
                <div>
                <div>Class A</div>
                {
                    props.students &&
                    props.students.map((item, index) => 
                        <div key={item.id}>
                            {
                                item.classroom === 'A'
                                &&
                                (
                                    props.msg[item.id]
                                    ?
                                    <p 
                                    style={{color:'green'}}
                                    onClick={() => showStudentName(item)}
                                    >
                                        {item.name}
                                    </p>
                                    :
                                    <p 
                                    style={(item.is_leave && !props.isHere[item.id]) ? {color:'green'}:{color:'black'}}
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
                <div>Class B</div>
                {
                    props.students &&
                    props.students.map((item, index) => 
                        <div key={item.id}>
                            {
                                item.classroom === 'B'
                                &&
                                (
                                    props.msg[item.id]
                                    ?
                                    <p 
                                    style={{color:'green'}}
                                    onClick={() => showStudentName(item)}
                                    >
                                        {item.name}
                                    </p>
                                    :
                                    <p 
                                    style={(item.is_leave && !props.isHere[item.id]) ? {color:'green'}:{color:'black'}}
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


