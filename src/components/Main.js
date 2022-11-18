
import { useState, useEffect } from 'react';

import axios from 'axios';
import {HashRouter as Router, Link, Route, Routes} from 'react-router-dom';

import '../css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home';
import Search from './Search';
import HowItWork from './HowItWork';

function Main() {



    return(
        <div>


            <Search />


            <div className='logo-container'>
                <p className='app-name app-name-students'>Students </p>
                <p className='app-name app-name-pickup'>Pick Up</p>
                <p className='app-logo'>Make Our Lives Easier, Safer and Happier</p>

            </div>


            <Router>

                

                <div className='navbar-container'>
                    <Link to='/'>Home</Link>
                    <Link to='/how-it-works'>How It Works</Link>
                    {/* <Link to='/classroom/A'>Class A</Link>
                    <Link to='/classroom/B'>Class B</Link> */}
                </div>

                

                <Routes>

                    <Route path='/' element={< Home/>}/>
                    <Route path='/how-it-works' element={< HowItWork/>}/>
                    {/* <Route path='/classroom/:title' element={< Student/>}/> */}




                </Routes>







            </Router>

            <footer>
                &copy; Student Pick up App @ 2022
            </footer>

        </div>
    )

} // function Main()

export default Main;





