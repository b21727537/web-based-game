import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
var Spinner = require('react-spinkit');

const useStyles = makeStyles((theme) => ({

    spinContainer : {
        height: '25vh',
        width: '25vw',
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
    },

    customSpinner : {
        height: '15vh',
        width: '10vh',
        color: "#2c3e50"
    }
}));

export default function RegisterEntityCard(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={5} justify="center" alignItems="center">
                <div className={classes.spinContainer}>
                    <Spinner name="circle" className={classes.customSpinner} fadeIn={0}/>
                </div>
            </Grid>
        </div>
    );
}
