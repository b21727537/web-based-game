import React,{useContext} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import AccountProfileCard from "./AccountProfile";
import { HTTP_REQUESTS } from "../../backend_int/services/HttpRquestService";
import AppContext  from "../../AppContext";
import navigate from '../../navigate';
import { useTranslation } from 'react-i18next';
import theme from "../../theme";
import DeleteConfirmDialog from "./DeleteConfirmDialog";




const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  profile: {
    width: 100,
    height: 100,
    position: "inherit",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    margin: "auto",
  },
  paper: {
    marginTop: theme.spacing(0),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", 
  },

  cancel: {
    backgroundColor: theme.palette.danger
  }
}));


function Profile(props) {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const classes = useStyles();
  const [firstName, setFirstName] = React.useState(context.name);
  const [firstNameError, setFirstNameError] = React.useState(null);
  const [ avatar, setAvatar] = React.useState(/* context.profilePic */);
  const [image, setImage] = React.useState(null);
  const [email, setEmail] = React.useState(context.email);
  const [emailError, setEmailError] = React.useState(null);
  const [psw, setPsw] = React.useState(null);
  const [pswError, setPswError] = React.useState(null);
  const [newPsw, setNewPsw] = React.useState(null);
  const [newPswError, setNewPswError] = React.useState(null);
  const [openLogout, setOpenLogout] = React.useState(false);



  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const firstNameChanged = (event) => {
    setFirstName(event.target.value);
    setFirstNameError(null);
  };


  const emailChanged = (event) => {
    setEmail(event.target.value);
    setEmailError(null);
  };

  const passwordChanged = (event) => {
    setPsw(event.target.value);
    setPswError(null);
  };

  const newPasswordChanged = (event) => {
    setNewPsw(event.target.value);
    setNewPswError(null);
  };
  const saveClicked = () => {
    let formValid = true
    if (!email || email === "") {
      setEmailError('errorProperties.PROFILE.SAVE_CLICKED.SET_EMAIL_ERROR');
      formValid = false
    }
    if (!firstName || firstName === "") {
      setFirstNameError('errorProperties.PROFILE.SAVE_CLICKED.SET_NICK_NAME_ERROR');
      formValid = false
    }
    if (!psw || psw === "") {
      
    } else {

      if (!newPsw || newPsw === "" || newPsw==="null") {
        setNewPswError('errorProperties.PROFILE.SAVE_CLICKED.SET_PSW_ERROR');
        formValid = false
      } else if (newPsw.length < 6) {
        setNewPswError('errorProperties.PROFILE.SAVE_CLICKED.SET_PSW_ERROR_LENGTH');
        formValid = false
      } else {
      
      }
    }
    if (formValid) onSaveChanges();
  };

  const deleteClicked = () => {
    setOpenLogout(true);
  }

  const onSaveChanges = () => {

      if(newPsw==="" || !newPsw || newPsw==="null"){
        let params1 = {
            name: `${firstName}`,
          };

          HTTP_REQUESTS.USER_SERVICE.UPDATE_ONE_TENANT_USER(context._id,params1,response=>{
            context.name=params1.name;
            //props.enqueueSnackbar(t('Profile.Profile Updated'), { variant: "success" });
            alert("profile updated");
            
        },fail=>{
            //props.enqueueSnackbar(t('errorProperties.PROFILE.ON_SAVE_CHANGES.IF_PASSWORD_EMPTY'), { variant: "error" });
            alert("profile updating failed");
        })
      }
      else {

        HTTP_REQUESTS.USER_SERVICE.CHECK_PSW(context._id, { psw: psw }, response => {
                let params = {
                name: `${firstName}`,
                password: newPsw,
              };
              HTTP_REQUESTS.USER_SERVICE.UPDATE_ONE_TENANT_USER(context._id,params,response=>{
                context.name=params.name;
                //props.enqueueSnackbar(t('Profile.Profile Updated'), { variant: "success" });
                alert("profile updated with new password");

                
            },error=>{
                /* props.enqueueSnackbar(t('errorProperties.PROFILE.ON_SAVE_CHANGES.IF_PASSWORD_EMPTY_ELSE'), { variant: "error" }); */
                alert("error occured while trying the update")
            })
            },
            (fail) => {
                setPswError('errorProperties.PROFILE.ON_SAVE_CHANGES.SET_PSW_ERROR')
              /* props.enqueueSnackbar(t('errorProperties.PROFILE.ON_SAVE_CHANGES.SET_PSW_ERROR') ,{ variant: "error" }); */
            }
        );
        
      }
   
    
  };


  return (
    
    <div>
      <Card>
      <Container component="main" maxWidth="xs">
          <CssBaseline />
         
          <div className={classes.paper}>
            
            <form className={classes.form} noValidate >
              <Grid item xs={12}>
                <AccountProfileCard
                  image={image}
                  setImage={setImage}
                  avatar={avatar}
                  setAvatar={setAvatar}
                ></AccountProfileCard>
              </Grid>
              <br></br>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    inputProps={{ autoComplete:'off',form: {autoComplete: 'off'}}}
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    value={firstName}
                    helperText={t(firstNameError)}
                    error={t(firstNameError)}
                    onChange={firstNameChanged}
                    id="firstName"
                    label={t('Profile.Nickname')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    type="text"
                    id="email"
                    onChange={emailChanged}
                    error={t(emailError)}
                    helperText={t(emailError)}
                    value={email}
                    disabled={true}
                    label={t('Profile.Email')}
                    name="email"
                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label={t('Profile.Password')}
                    onChange={passwordChanged}
                    error={t(pswError)}
                    helperText={t(pswError)||t('errorProperties.PROFILE.RETURN.GRID')}
                    type="password"
                    id="password"
                    
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    name="newPassword"
                    onChange={newPasswordChanged}
                    error={t(newPswError)}
                    helperText={t(newPswError)}
                    label={t('Profile.New Password')}
                    type="password"
                    id="newPassword"
                    autoComplete='nope'
                  />
                </Grid>
             
              <Grid item xs={12} sm={6}>
                <Button
                  style={theme.palette.danger}
                  type="button"
                  fullWidth
                  variant="contained"
                  onClick= {() => {window.location.reload(false);}}
                >
                  {t('Profile.Cancel')}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  
                  onClick={saveClicked}
                >
                  {t('Profile.Save')}
                </Button>
              </Grid>
              <Grid item xs={0} sm={3}>
                
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="inherit"
                  
                  onClick={deleteClicked}
                >
                  {t('Profile.Delete')}
                </Button>
              </Grid>
              <Grid item xs={0} sm={3} >
                
              </Grid>
              <Grid item xs={12} >
                
              </Grid>
              <Grid item xs={12} >
                
              </Grid>
              <Grid item xs={12} >
                
              </Grid>
              <DeleteConfirmDialog  open = {openLogout} onClose={handleCloseLogout}/>
            </Grid>
            </form>  
          </div>
        </Container>    
      </Card>
    </div>
  );
}
export default Profile;
