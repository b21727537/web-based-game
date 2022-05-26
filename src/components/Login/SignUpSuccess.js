import React, { useEffect } from 'react';
import {  Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { green } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';
import navigate from '../../navigate';


const SignUpSuccess = () => {
    const { t } = useTranslation();

    useEffect(() => {
        setTimeout(() => {
            navigate("/login");
        }, 2000);
      });

    return (
        <div style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }}>
            {<CheckCircleOutlineIcon style={{ fontSize: 200, color: green[500], width:'100%' }} align='center' />}
            
            <Typography component="h1" variant="h5" align="center"  >
                {t('SignUpSuccess.Congrats')}
            </Typography>
            <Typography component="h1" variant="h5" align='center'>
                {t('SignUpSuccess.Success')}
            </Typography>
            
            <Typography component="h1" variant="h6" align='center'>
                {t('SignUpSuccess.Redirected')}
            </Typography>
            
            
        </div>
    )
}

export default SignUpSuccess;

