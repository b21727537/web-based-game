import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import VariantAvatars from './CompanyAvatar';
import { HTTP_REQUESTS } from '../../backend_int/services/HttpRquestService';
import navigate from '../../navigate';
import emailStrIsValid from "../Helper-Functions/EmailValidation";   
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';


import LanguageDropdown from '../Menu/LanguageDropdown';



const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(images/qwe.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', 
        marginTop: theme.spacing(0),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    selector:{
        color:'white',
        fontSize:'medium',
        "& .MuiSvgIcon-root": { color: "black" }
    },
}));

function ForgotPassword(props) {
    const classes = useStyles();
    const [email, setEmail] = React.useState(null);
    const [emailError, setEmailError] = React.useState(null);
    const [lang, setLang] = React.useState( (localStorage.getItem('i18nextLng')) ? localStorage.getItem('i18nextLng') : 'en');
    const { t, i18n } = useTranslation();
    let environment = window.location.origin;

    React.useEffect(() => {
        i18n.changeLanguage(lang); 
      }, [i18n, lang]);

    const handleLanguageChange = (event) => {
        setLang(event.target.value);
    };

    const emailChanged = event => {

        setEmail(event.target.value);
        setEmailError(null);
    }

    const keyPress = event => {

        if(event.key==="Enter")
        {
            event.preventDefault();
            forgotPasswordClicked();
        }
    }

    const forgotPasswordClicked = () => {
        let formValid = true;

        if (!email || email === "") {
            setEmailError('errorProperties.FORGOT_PASSWORD.SET_EMAIL_ERROR');
            formValid = false;
        }
        if (email){
            if(!emailStrIsValid(email)){
                setEmailError('errorProperties.FORGOT_PASSWORD.NOT_VALID_EMAIL')
            }else{
                if (formValid) continueForgotPasswordProcess();
            }   
        }
    }   

    const loginClicked = () =>{
        navigate("/login")
    }

    const continueForgotPasswordProcess = () => {
        
        let mailObject = {
            email : email
        }
        let inviteToken = "";

        // url -> localhost:3001/generatePasswordToken        
        HTTP_REQUESTS.USER_SERVICE.CREATE_NEW_PASSWORD_TOKEN(mailObject, (success) => {
            inviteToken = success.token;
            mailObject = {
                email : email,
                token : (environment +"/password-change?code=" + encodeURIComponent(inviteToken))
            }
            // url -> localhost:3001/forgotPassword
            HTTP_REQUESTS.USER_SERVICE.FORGOT_PASSWORD(mailObject,(success)=>{
                alert("Mail sent succesfully to your email address")
                navigate("/login")
            },(err) => {
                alert("an error occured (2)" , err)
            })
        },(err)=>{
            alert("an error occured (1) " , err)
        });
   
    }


    return (
        <Grid container component="main" className="signInRoot">
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Grid item container xs={12} justify="flex-end" alignItems="center">
                    <FormControl>
                        <LanguageDropdown lang={lang} onChange={handleLanguageChange} classes={classes} />
                    </FormControl>
                </Grid>
                <div className="signInPaper">
                    <VariantAvatars />
                    <Typography component="h1" variant="h5">
                        {t('ForgotPassword.Forgot')}
                    </Typography>
                    <form className="form" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t('ForgotPassword.Email')}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={emailChanged}
                            value={email}
                            helperText={t(emailError) || " "}
                            error={t(emailError)}
                            onKeyPress={keyPress}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={forgotPasswordClicked}                           
                        >
                            {t('ForgotPassword.Change Pass')}
                        </Button>
                       <Grid container>
                            <Grid item xs={12} s>
                                <Link style={{ float: "right" }} className="cursor-ptr" onClick={loginClicked} variant="body2">
                                    {t('ForgotPassword.Login')}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default ForgotPassword;