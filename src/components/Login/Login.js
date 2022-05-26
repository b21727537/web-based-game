import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Slide from '@material-ui/core/Slide';
import navigate from '../../navigate';



function Login(props) {

    const [content, setContent] = React.useState(<SignIn onSignUpClicked={()=>this.onSignUpClicked()} />);
    const [animationStart, setAnimationStart] = React.useState(true);
    const [direction, setDirection] = React.useState("up");
    const [timeout, setTimeout] = React.useState(0);


    const onSignUpClicked = () =>{
       
        const signUpComponent = <SignUp onSignInClicked={() => onSignInClicked()} />;

        setTimeout(200);
        setAnimationStart(false)
        setTimeout(()=>{
            setContent(signUpComponent)
            setAnimationStart(true)
            setDirection("left")
        },300)    
        
    }

    const onSignInClicked = (email,withoutAnimation) =>{
        const signInComponent = <SignIn onSignUpClicked={() => onSignUpClicked()} />;
        if(withoutAnimation){
            setContent(signInComponent)
            return;
        }
        setAnimationStart(false)
            setTimeout(()=>{
                setContent(signInComponent)
                setAnimationStart(true)
                setDirection("up")
            },300) 

        navigate("/login")

    }

    return (
        <div>
        <Slide direction={direction} timeout={timeout} in={animationStart} mountOnEnter unmountOnExit>
        <div>
            {content}
        </div>
        </Slide>
        </div>

    )

    
}

export default Login;