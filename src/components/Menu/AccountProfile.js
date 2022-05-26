import React,{useContext,useEffect} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import AppContext  from "../../AppContext";
import { useTranslation } from 'react-i18next';
import theme from "../../theme";

const useStyles = makeStyles((theme) => ({
  root: {},
  details: {
    display: "flex",
  },
  avatar: {
    marginLeft: "auto",

    height: 150,
    width: 150,
    flexShrink: 0,
    flexGrow: 0,
  },
  uploadButton: {
    marginRight: theme.spacing(2),
  },
  input: {
    display: "none",
  },
}));


const AccountProfile = (props) => {
  const { t } = useTranslation();
  const context = useContext(AppContext);
  const { className, ...rest } = props;
  
  const [fName, setFName] = React.useState(context.name);
  const [time,setTime] = React.useState(
        new Date()
      );
  
      useEffect(() => {
        const interval = setInterval(
          () => setTime(new Date()),
          1000
        );
    
        return () => {
          clearInterval(interval);
        }
      }, []);
  
  const classes = useStyles();

  const handleImage = (event) => {
    props.setImage(event.target.files[0]);
    props.setAvatar(URL.createObjectURL(event.target.files[0]));
    event.target.value = null
  };
  const handleRemove = () => {
    props.setAvatar(null);
    props.setImage(null)
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography gutterBottom variant="h5">
              {`${fName}`}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Hacettepe CS
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {t('AccountProfile.Time') + moment(time).format("hh:mm A")}
            </Typography>
          </div>
          <Avatar className={classes.avatar} src={props.avatar} />
        </div>
      </CardContent>
      <Divider />
      
        <CardActions>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple={false}
            onChange={handleImage}
            type="file"
            name= "image"
          />
            <label htmlFor="contained-button-file">
              <Button
                variant="text"
                color="primary"
                className={classes.uploadButton}
                component="span"                
                >
                {t('AccountProfile.Upload')}
              </Button>
            </label>
              <Button variant="text" onClick={handleRemove} style={{color: theme.palette.danger.backgroundColor}}>
                {t('AccountProfile.Remove')}
              </Button>
         
        </CardActions>
      
      
    </Card>
  );
};

AccountProfile.propTypes = {
  className: PropTypes.string,
};

export default AccountProfile;
