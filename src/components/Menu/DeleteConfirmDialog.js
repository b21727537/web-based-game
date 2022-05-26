import React,{useContext} from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { HTTP_REQUESTS } from "../../backend_int/services/HttpRquestService";
import AppContext  from "../../AppContext";
import { useTranslation } from 'react-i18next';
import theme from "../../theme";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteConfirmDialog(props) {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { onClose, open } = props;

  const handleBack = () => {
    onClose(false);
  };

  const handleClose = () => {

    let id = context._id
    let obj = {}
    obj.deletedTime = Date.now();
    obj.reasonForDelete = "deleted manually";
    obj.deletedBy = id;
    HTTP_REQUESTS.USER_SERVICE.DELETE_ONE_TENANT_USER(id,obj,res=> {
        alert("user deleted");
    }, err => {
      alert("An error occured during deleting")
    })
 
    setTimeout(() => {
        HTTP_REQUESTS.USER_SERVICE.LOGOUT(
            data => {
      
              let language = localStorage.getItem('language');
              localStorage.clear();
              localStorage.setItem('language' , language)
      
              window.open("/login",'_self');
            },
            err => {
              alert("Error occured during logout process")
            }
          ); 
    }, 1000);



  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleBack}
        aria-labelledby="delete-title"
        aria-describedby="delete-description"
      >
        <DialogTitle id="delete-title">{t('DeleteConfirmDialog.Confirm Delete')}</DialogTitle>
        <DialogContent>
          {t('DeleteConfirmDialog.Delete Account')}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} style={{color: theme.palette.danger.backgroundColor}}>
            {t('LogoutConfirmDialog.Cancel')}
          </Button>
          <Button variant="contained" onClick={handleClose} color="primary">
            {t('DeleteConfirmDialog.Delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
