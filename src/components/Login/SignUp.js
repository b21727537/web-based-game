import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { HTTP_REQUESTS } from '../../backend_int/services/HttpRquestService';
import SignUpSuccess from './SignUpSuccess';
import SignUpForm from './SignUpForm';
import emailStrIsValid from "../Helper-Functions/EmailValidation";   


function SignUp(props) {
  const [flag,setFlag]                      = React.useState(false)
  const [nickName, setNickName]           = React.useState(null);
  const [nickNameError, setNickNameError] = React.useState(null);
  const [email, setEmail]                   = React.useState(null);
  const [emailError, setEmailError]         = React.useState(null);
  const [psw, setPsw]                       = React.useState(null);
  const [psw_2, setPsw_2]                   = React.useState(null);
  const [pswError, setPswError]             = React.useState(null);
  const [pswError_2, setPswError_2]         = React.useState(null);
  const [opInProgress, setOpInProgress]     = React.useState(null);
  const [opSuccess, setOpSuccess]           = React.useState(null);
  


  
  const flagChanged = event => {
    setFlag(event.target.checked);
    
  }
  const nickNameChanged = event => {
    setNickName(event.target.value);
    setNickNameError(null);
  }

  const emailChanged = event => {
    setEmail(event.target.value);
    setEmailError(null);
  }

  const passwordChanged = event => {
    setPsw(event.target.value);
    setPswError(null);
  }

  const passwordChanged_2 = event => {
    setPsw_2(event.target.value);
    setPswError_2(null);
  }



  const signUpCliked = () => {
    let formValid = true;
    if (!email || email === "") {
      setEmailError('errorProperties.SIGN_UP.SET_EMAIL_ERROR');
      formValid = false;
    }

    if (!nickName || nickName === "") {
      setNickNameError('errorProperties.SIGN_UP.SET_NICK_NAME_ERROR');
      formValid = false;
    }else if (nickName.length < 5) {
      setNickNameError('errorProperties.SIGN_UP.SET_NICK_NAME_ERROR_LENGTH');
      formValid = false;
    }
    
    if (!psw || psw === "") {
      setPswError('errorProperties.SIGN_UP.SET_PSW_ERROR');
      formValid = false;
    }else if(psw.length<6){
      setPswError('errorProperties.SIGN_UP.SET_PSW_ERROR_LENGTH');
      formValid = false;
    }

    if (!psw_2 || psw_2 === "") {
      setPswError_2('errorProperties.SIGN_UP.SET_PSW_ERROR_2')
      formValid = false;
    }else if(psw !== psw_2){
      setPswError_2('errorProperties.SIGN_UP.SET_PSW_ERROR_NOT_SAME')
      formValid = false;
    }

    if (email){
      if(!emailStrIsValid(email)){
          setEmailError('errorProperties.FORGOT_PASSWORD.NOT_VALID_EMAIL')
      }else{
          if (formValid) processSignUp();
      }   
  }

  }

  const processSignUp = () => {
    let params = { name: nickName, email: email, password: psw };
    setOpInProgress(true);
    setTimeout(()=>{
      HTTP_REQUESTS.USER_SERVICE.REGISTER(
        params, (data) => {
          setOpInProgress(false);
          setOpSuccess(true);
          /* setTimeout(()=>{props.onRegistrationSuccess(email);}
            ,3000) */
        }, (err) => {
          try{
          }catch(err){
            /* props.enqueueSnackbar(t('errorProperties.SIGN_UP.PROCESS_SIGN_UP'),{variant: 'error'}); */
          }
          setOpInProgress(false);
  
        })
    },1000)
    
    

  }

  return (
    <Container component="main" maxWidth="xs" className="signUpRoot">
      <CssBaseline />
      {opSuccess ? <SignUpSuccess/>
      :<SignUpForm  nickNameChanged    = {nickNameChanged}
                    emailChanged        = {emailChanged}
                    passwordChanged     = {passwordChanged}
                    passwordChanged_2   = {passwordChanged_2}
                    flagChanged         = {flagChanged}
                    signUpCliked        = {signUpCliked}
                    nickNameError       = {nickNameError}
                    emailError          = {emailError}
                    pswError            = {pswError} 
                    pswError_2          = {pswError_2} 
                    opInProgress        = {opInProgress} 
                    onSignInClicked     = {props.onSignInClicked}/>} 
    </Container>
  );
}

export default SignUp