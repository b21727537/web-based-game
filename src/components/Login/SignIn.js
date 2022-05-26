import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import VariantAvatars from './CompanyAvatar';
import { HTTP_REQUESTS } from '../../backend_int/services/HttpRquestService';
import SessionStorage from '../Helper-Functions/SessionStorage';
import navigate from '../../navigate';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import LanguageDropdown from '../Menu/LanguageDropdown';
import emailStrIsValid from "../Helper-Functions/EmailValidation";   




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
    submit2: {
        margin: theme.spacing(0, 0, 2)
    },
    centered: {
        justifyContent: 'left',
        marginLeft: '0',
        marginRight:'0',
        display:'flex'
    },
    selector:{
        color:'white',
        fontSize:'medium',
        "& .MuiSvgIcon-root": { color: "black" }
    },
}));

function SignInSide(props) {
    const classes = useStyles();
    const [uname, setUname] = React.useState(props.email);
    const [psw, setPsw] = React.useState(null);
    const [unameError, setUnameError] = React.useState(null);
    const [pswError, setPswError] = React.useState(null);
    const [lang, setLang] = React.useState( (localStorage.getItem('language')) ? localStorage.getItem('language') : 'en');
    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        i18n.changeLanguage(lang); localStorage.setItem('language',lang); 
      }, [i18n, lang]);

    const handleLanguageChange = (event) => {
        setLang(event.target.value);
    };

    const usernameChanged = event => {
        setUname(event.target.value);
        setUnameError(null);
    }

    const passwordChanged = event => {
        setPsw(event.target.value);
        setPswError(null);
    }

    const keyPress = event => {

        if(event.key === "Enter")
        {
            signInClicked();
        }
    }

    const forgotPasswordClicked = () => {
        navigate("/password-forgot")
    }

    const signUpClicked = () => {
        navigate("/sign-up")
    }

    const anonyClicked = () => {
        navigate("/basic-main")
    }

    const signInClicked = () => {
        let formValid = true;

        if (!uname || uname === "") {
            setUnameError('errorProperties.SIGN_IN.SET_U_NAME_ERROR');
            formValid = false;
        }

        if (!psw || psw === "") {
            setPswError('errorProperties.SIGN_IN.SET_PSW_ERROR');
            formValid = false;
        } else if (psw.length < 6) {
            setPswError('errorProperties.SIGN_IN.SET_PSW_ERROR_LENGTH');
            formValid = false;
        }

        if (uname){
            if(!emailStrIsValid(uname)){
                setUnameError('errorProperties.FORGOT_PASSWORD.NOT_VALID_EMAIL')
            }else{
                if (formValid) continueSignIpProcess();
            }   
        }

    }

    const continueSignIpProcess = () => {
        // below url is -> /localhost:3001/login
        HTTP_REQUESTS.USER_SERVICE.LOGIN(
            {
                email: uname,
                password: psw
            }, (data) => {
                if (data.auth_token !== "") {
                    //SessionStorage.sessionData = data;
                    /* props.enqueueSnackbar(t("Dashboard.Main.Logged Success"), {
                        variant: 'success',
                    }) */
                    SessionStorage.welcomeMessageRequest = true;
                    window.open('/main','_self');
                }
            }, (err) => {

                /* props.enqueueSnackbar(t('errorProperties.SIGN_IN.CONTINUE_SIGN_IP_PROCCES'), {
                    variant: 'error'
                }); */
                alert("login failed");
                
            })

    }


    return (
        <Grid container component="main" className="signInRoot">
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div>
                    <Grid item container xs={12} justify="flex-end" alignItems="center">
                        <FormControl>
                            <LanguageDropdown lang={lang} onChange={handleLanguageChange} classes={classes} />
                        </FormControl>
                    </Grid>
                </div>
                <div className="signInPaper">
                    <VariantAvatars />
                    <Avatar className="avatar">
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {t('SignIn.Sign In')}
                    </Typography>
                    <form className="form" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label={t('SignIn.Email')}
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={usernameChanged}
                            value={uname}
                            helperText={t(unameError) || " "}
                            error={t(unameError)}
                            onKeyPress={keyPress}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label={t('SignIn.Password')}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={passwordChanged}
                            helperText={t(pswError) || " "}
                            error={t(pswError)}
                            onKeyPress={keyPress}
                        />
                        <Grid className={classes.centered}>
                            <FormControlLabel
                                className={classes.centered}
                                control={<Checkbox value="remember" color="primary" />}
                                label={t('SignIn.Remember')}
                            />
                        </Grid>
                        
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={signInClicked}                           
                        >
                            {t('SignIn.Sign In')}
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            color="#841584"
                            className={classes.submit2}
                            onClick={anonyClicked}                           
                        >
                            {t('SignIn.Play')}
                        </Button>
                        <Grid container>
                            <Grid item xs={6} >
                                <Link style={{ float: "left" }} className="cursor-ptr" onClick={ forgotPasswordClicked } variant="body2">
                                    {t('SignIn.Forgot')}
                                </Link>
                            </Grid>
                            <Grid item xs={6} >
                                <Link style={{ float: "right" }} className="cursor-ptr" onClick={ signUpClicked } variant="body2">
                                    {t('SignIn.Sign Up')}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5} className="box">
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default SignInSide;