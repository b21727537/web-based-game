import React,{/* useContext */} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { HTTP_REQUESTS } from "../../backend_int/services/HttpRquestService";
import { useTranslation } from 'react-i18next';
import theme from "../../theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutConfirmDialog(props) {
  const { t } = useTranslation();
  //const context = useContext(AppContext);
  const { onClose, open } = props;

  const handleBack = () => {
    onClose(false);
  };

  const handleClose = () => {
    //Saving User Preferences
 

    HTTP_REQUESTS.USER_SERVICE.LOGOUT(
      data => {
        // let userPrefs = UserPreferences.setUserPreferences(context.email);
        let language = localStorage.getItem('language');
        localStorage.clear();
        localStorage.setItem('language' , language)
        // localStorage.setItem('userPreferences',JSON.stringify(userPrefs));

        window.open("/login",'_self');
      },
      err => {
        alert("error occured during logout")
      }
    ); 


  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleBack}
        aria-labelledby="logout-title"
        aria-describedby="logout-description"
      >
        <DialogTitle id="logout-title">{t('LogoutConfirmDialog.Confirm')}</DialogTitle>
        <DialogContent>
          {t('LogoutConfirmDialog.Logout System')}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} style={{color: theme.palette.danger.backgroundColor}}>
            {t('LogoutConfirmDialog.Cancel')}
          </Button>
          <Button variant="contained" onClick={handleClose} color="primary">
            {t('LogoutConfirmDialog.Logout')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
