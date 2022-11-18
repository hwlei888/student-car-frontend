
import React from 'react';
import '../css/howItWork.css'

function HowItWork(){

 

    return(
        <div className='howitwork-container'>

            <div className='howitwork-title'>How It Works</div>

            <div className='howitwork-foreword'>
                <p>Welcome to Lei's Student Pick Up App.</p>
                <p>You make a good choice for your kids.</p>
                <p>Here are the instructions:</p>
            </div>

            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        Click registration number on the left, you can get associated student's brief information on the middle card.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/click-registration.png'} alt="click-registration image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        Click Class name on the middle card, you can get all students' name in that class on the right.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/click-class.png'} alt="click-class image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        Click Student's name on the right, you can also get the brief information on the middle card of that student.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/click-name.png'} alt="click-name image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        When the student leaves, click 'Leave' on the middle card, the middle card shows the message that 'Student's name has left'.
                    </p>
                    
                    <p>
                        After clicking 'Leave', the associated cars' registration numbers on the left will turn dark yellow. The student's name on the right will also turn dark yellow.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/click-leave.png'} alt="click-leave image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        When you find clicking 'Leave' by accident, or the student comes back for some reasons. You could also click 'Still here' button on the middle card. Then the message will not be displayed.
                    </p>

                    <p>
                        After clicking 'Still here', the associated cars' registration numbers on the left will turn back to black. The student's name on the right will also turn back to black.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/click-stillhere.png'} alt="click-stillhere image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        On the top is the search bar, you can search the registration numbers and also student names, with number, lower case or upper case.
                    </p>

                    <p>
                        For example, we enter 'ke'.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/search-input.png'} alt="search-input image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        We can get registration numbers and students' names results with 'ke'.
                    </p>

                    <p>
                        We click one of the registration number.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/search-result-registration.png'} alt="search-result-registration image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        We can get the associated student's brief info on the middle card.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/search-result-registration-student.png'} alt="search-result-registration-student image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        We can also click one of the students' name.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/search-result-name.png'} alt="search-result-name image" />
                </div>
            </div>


            <div className='howitwork-eachstep'>
                <div className='howitwork-instruction'>
                    <p>
                        We can get the student's brief info on the middle card.
                    </p>
                </div>
                
                <div className='howitwork-image'>
                    <img src={process.env.PUBLIC_URL + '/search-result-name-student.png'} alt="search-result-name-student image" />
                </div>
            </div>

            <div className='howitwork-contact'>
                <p>Now you are ready to use this Students Pick Up App!</p>
                <p>For any questions, please contact:</p>
                <p><strong>Phone:</strong> +610411456245</p>
                <p><strong>Email:</strong> leihuawen888@gmail.com</p>
            </div>

        </div>
    )
}

export default HowItWork;





