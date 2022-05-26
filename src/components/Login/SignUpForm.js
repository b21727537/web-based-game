import React from 'react';
import VariantAvatars from './CompanyAvatar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import LanguageDropdown from '../Menu/LanguageDropdown';
import navigate from '../../navigate';

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(0),
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
        marginTop: theme.spacing(1),
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

const SignUpForm = props => {
    const classes = useStyles();
    const [lang, setLang] = React.useState( (localStorage.getItem('language')) ? localStorage.getItem('language') : 'en');
    const { t, i18n } = useTranslation();

    React.useEffect(() => {
        i18n.changeLanguage(lang); localStorage.setItem('language',lang); 
      }, [i18n, lang]);

    const handleLanguageChange = (event) => {
        setLang(event.target.value);
    };

    const onSignInClicked = () => {
        navigate("/login")
    }
    
    return (
        <div>
            <Grid item container xs={12} justify="flex-end" alignItems="center">
                <FormControl>
                    <LanguageDropdown lang={lang} onChange={handleLanguageChange} classes={classes} />
                </FormControl>
            </Grid>
        <div className="signInRoot">
        <div className="signInPaper">
            <VariantAvatars />
            <Avatar className="avatar">
            </Avatar>
            <Typography component="h1" variant="h5">
                {t('SignUpForm.Sign Up')}
            </Typography>
            <form className="form" noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            autoComplete="fname"
                            name="nickName"
                            variant="outlined"
                            required
                            fullWidth
                            id="nickName"
                            label={t('SignUpForm.Nickname')}
                            autoFocus
                            error={t(props.nickNameError)}
                            helperText={t(props.nickNameError)}
                            onChange={props.nickNameChanged}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label={t('SignUpForm.Email')}
                            name="email"
                            autoComplete="email"
                            error={t(props.emailError)}
                            helperText={t(props.emailError)}
                            onChange={props.emailChanged}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label={t('SignUpForm.Password')}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={t(props.pswError)}
                            helperText={t(props.pswError)}
                            onChange={props.passwordChanged}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password2"
                            label={t('SignUpForm.Confirm')}
                            type="password"
                            id="password2"
                            autoComplete="current-password"
                            error={t(props.pswError_2)}
                            helperText={t(props.pswError_2)}
                            onChange={props.passwordChanged_2}
                        />
                    </Grid>
                </Grid>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={props.signUpCliked}
                    disabled={props.opInProgress}
                >
                    {props.opInProgress 
                        ? t('SignUpForm.Attempt') 
                        : t('SignUpForm.Sign Up')
                    }
                </Button>
                <Grid container justify="center">
                    <Grid item alignContent = "center">
                        <Link href="#" variant="body2" onClick={onSignInClicked}>
                            {t('SignUpForm.Already Have')}
                        </Link>
                    </Grid>
                </Grid>
            </form>
            <Box mt={5} className="box">
            </Box>
        </div>
        </div>
        </div>
    )
}
export default SignUpForm;