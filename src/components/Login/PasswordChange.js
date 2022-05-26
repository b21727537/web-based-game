import React, { useEffect } from 'react';

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



import { useTranslation } from 'react-i18next';
import { FormControl } from '@material-ui/core';
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
}));

function ChangePassword(props) {
    const classes = useStyles();
    const [password, setPassword] = React.useState(null);
    const [rePassword, setRePassword] = React.useState(null);
    const [rePasswordError, setRePasswordError] = React.useState(null);
    const [passwordError, setPasswordError] = React.useState(null);
    const [email, setEmail] = React.useState(null);
    const [isRender , setIsRender] = React.useState(false);
    const [lang, setLang] = React.useState( (localStorage.getItem('i18nextLng')) ? localStorage.getItem('i18nextLng') : 'en');
    const { t, i18n } = useTranslation();

    let url = new URL(window.location);
    let params = new URLSearchParams(url.search);

    useEffect(() => {
        if (params.get("code") == null) {
            /* props.enqueueSnackbar(t('errorProperties.INVITATION.VALIDATE_TOKEN.INVALID_LINK'), {
                variant: 'error'
            }); */
            alert("Invalid link ! (1)");
            navigate("/login")
        } else {
            validateToken();
        }
    },params.get("code"))

    React.useEffect(() => {
        i18n.changeLanguage(lang);
      }, [i18n, lang]);
    
    const validateToken = () => {

        let token = decodeURIComponent(params.get("code"));
        let tokenParams = { passwordToken: token };

        // url -> localhost:3001/passwordValidate
        HTTP_REQUESTS.USER_SERVICE.VALIDATE_PASSWORD(
          tokenParams,
          (success) => {
            setEmail(success.email);
            setIsRender(true)
          },
          (fail) => {
            /* props.enqueueSnackbar(t('errorProperties.INVITATION.VALIDATE_TOKEN.INVALID_LINK'), {
                variant: 'error'
            }); */
            alert("Invalid link ! (2)");
            navigate("/login");
          }
        );
      };

    const loginClicked = () =>{
        navigate("/login")
    } 

    const passwordChange = event => {
        setPassword(event.target.value);
        setPasswordError(null);
    }

    const rePasswordChange = event => {
        setRePassword(event.target.value);
        setRePasswordError(null);
    }

    const keyPress = event => {
        if(event.key==="Enter")
        {
            event.preventDefault();
            changePasswordClicked();
        }
    }

    const changePasswordClicked = () => {
        if (!password || password === "" ){
            setPasswordError('errorProperties.CHANGE_PASSWORD.SET_PASSWORD_ERROR');
        } else if(password.length < 6){
            setPasswordError('errorProperties.CHANGE_PASSWORD.SET_PSW_ERROR_LENGTH');
        }else if(!rePassword || rePassword === "" ){
            setRePasswordError('errorProperties.CHANGE_PASSWORD.SET_PASSWORD_ERROR');
        }else if(password !== rePassword){
            setRePasswordError('errorProperties.CHANGE_PASSWORD.SET_PASSWORD_MATCH_ERROR');
            /* props.enqueueSnackbar(t('errorProperties.CHANGE_PASSWORD.CHANGE_PASSWORD_CLICKED.SET_PASSWORD_NOT_MATCH_ERROR'), {
                variant: 'error'
            }); */
        }
        else{
            continueChangePasswordProcess();
        }
    }

    
    const continueChangePasswordProcess = () => {

        let passwordObject = {
            password : password,
            email : email
        }

        // url -> localhost:3001/changePassword
        HTTP_REQUESTS.USER_SERVICE.CHANGE_PASSWORD(passwordObject,(success)=>{
            /* props.enqueueSnackbar(t('Password.ChangePassword.Password Changed'), {
                variant: 'success'
            }); */
            alert("Your password changed successfully");
            navigate("/login")
        },(err) => {
            /* props.enqueueSnackbar(t('errorProperties.CHANGE_PASSWORD.CONTINUE_CHANGE_PASSWORD_PROCCES'), {
                variant: 'error'
            }); */
            alert("Password change failed");
         });
    }

    const handleLanguageChange = (event) => {
        setLang(event.target.value);
    };


    return ( isRender ? (
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
                        {t('ChangePassword.Change Pass')}
                    </Typography>
                    <form className="form" noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="password"
                            fullWidth
                            id="password"
                            label={t('ChangePassword.New Pass')}
                            name="password"
                            autoComplete="password"
                            autoFocus
                            onChange={passwordChange}
                            value={password}
                            helperText={t(passwordError)|| " "}
                            error={t(passwordError)}
                            onKeyPress={keyPress}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            type="password"
                            fullWidth
                            id="password"
                            label={t('ChangePassword.Confirm New')}
                            name="password"
                            autoComplete="password"
                            autoFocus
                            onChange={rePasswordChange}
                            value={rePassword}
                            helperText={t(rePasswordError)|| " "}
                            error={t(rePasswordError)}
                            onKeyPress={keyPress}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={changePasswordClicked}                           
                        >
                            {t('ChangePassword.Change Pass')}
                        </Button>
                       <Grid container>
                            <Grid item xs={12} s>
                                <Link style={{ float: "right" }} className="cursor-ptr" onClick={loginClicked} variant="body2">
                                    {t('ChangePassword.Login')}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid> 
        ) : null
    );
}

export default ChangePassword;