import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({

}));

export default function Game(props) {
    const classes = useStyles();

    return (
        <div>
            <Grid container spacing={5} justify="center" alignItems="center">
                <div >
                    
                </div>
            </Grid>
        </div>
    );
}