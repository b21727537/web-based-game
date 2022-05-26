import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LeftDrawer2 from '../Menu/LeftDrawer2';

const nickNamesDictionary = [
    "Anonymous crow",
    "Anonymous pigeon",
    "Anonymous robin",
    "Anonymous woodpecker",
    "Anonymous sparrow",
    "Anonymous kingfisher",
    "Anonymous warbler",
    "Anonymous bulbul",
    "Anonymous drongo",
    "Anonymous seagulls",
    "Anonymous flamingo",
    "Anonymous eagles",
    "Anonymous owl",
    "Anonymous kite",
    "Anonymous parakeet",
    "Anonymous beeeater",
    "Anonymous munia",
    "Anonymous dove",
    "Anonymous peacock",
    "Anonymous oriole",
    "Anonymous flycatcher",
    "Anonymous quail",
    "Anonymous magpie",
    "Anonymous roller",
    "Anonymous emu",
    "Anonymous sunbird",
    "Anonymous starling",
    "Anonymous rockthrush",
    "Anonymous barnowl",
    "Anonymous goose",
    "Anonymous duck",
    "Anonymous trogon",
    "Anonymous nightjar",
    "Anonymous barbet",
  ];

  let myNickname;

function Basic(props) {

    if (localStorage.getItem("flappy-nickname")) {
        myNickname = localStorage.getItem("flappy-nickname");
    } else {
        myNickname = nickNamesDictionary[Math.floor(Math.random() * 34)];
        localStorage.setItem("flappy-nickname", myNickname);
    }

    return (
        <Grid container component="main" className="signInRoot">
            <CssBaseline />
            <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
                <div>
                    <LeftDrawer2 myName={myNickname}/>
                </div>
            </Grid>
        </Grid>
    );
}

export default Basic;