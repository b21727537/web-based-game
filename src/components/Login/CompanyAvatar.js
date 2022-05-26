import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, green } from '@material-ui/core/colors';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  rounded: {
    color: '#fff',
    backgroundColor: green[500],
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(10),
  },
  logo: {
    width:"auto",
    maxWidth:"100%",
    height:"235px"
  }
}));

export default function VariantAvatars() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'}}>
      <div className="logo">
        <img alt="logo" src="/images/HacettepeCs.jpg" className={classes.logo} />
      </div>
      <Typography component="h1" variant="h6" className="title">
        {t('CompanyAvatar.Space System')}  
      </Typography>
      <br /><br />
    </div>


  );
}