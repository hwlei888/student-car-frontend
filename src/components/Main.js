
import { useState, useEffect } from 'react';

import axios from 'axios';
import {HashRouter as Router, Link, Route, Routes} from 'react-router-dom';

import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Student from './Student';
import Search from './Search';

function Main() {



    return(
        <div>
            <h1>Welcome to Students Picking up App</h1>

            <Router>
                <nav>
                    <Link to='/'>Home</Link>
                    <Link to='/classroom/A'>Class A</Link>
                    <Link to='/classroom/B'>Class B</Link>
                </nav>

                <Search />

                <Routes>

                    <Route path='/' element={< Home/>}/>
                    <Route path='/classroom/:title' element={< Student/>}/>




                </Routes>







            </Router>

            <footer>
                &copy; Student Pick up App @ 2022
            </footer>

        </div>
    )

} // function Main()

export default Main;





