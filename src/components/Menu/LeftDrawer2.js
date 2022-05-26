import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import navigate from '../../navigate';
import { Box, Drawer, Grid, Hidden } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FormControl from '@material-ui/core/FormControl';
import LanguageDropdown from './LanguageDropdown';
import WelcomePage from './WelcomePage';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#2c3e50"
  },
  appBarShift: {
    width: `100%`,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    width: `100%`,
    flexGrow: 1,
    padding: theme.spacing(3),
     marginLeft: -drawerWidth,
  },
  contentShift: {

  },
  title: {
    flexGrow: 1,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 80,
    size: 'small'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  selector:{
    color:'white',
    fontSize:'medium',
    "& .MuiSvgIcon-root": { color: "white" }
  },
  selector2:{
    color:'white',
    fontSize:'medium',
    "& .MuiSvgIcon-root": { color: "grey" }
  },
  w100:{
    width:'100%'
  },
  left45: {
    left:'45px'
  },
  deleteIcon4: {
    "& svg": { fontSize: 1000 } 
  }
    

}));

const WhiteTextTypography = withStyles({
  root: {
    color: "#ecf0f1",
    fontWeight: "bold"
  }
})(Typography);

export default function LeftDrawer2(props) {

  const classes = useStyles();
  
  const [open, setOpen] = React.useState(localStorage.getItem("LeftDrawer") === "true");
  const [lang, setLang] = React.useState( (localStorage.getItem('language')) ? localStorage.getItem('language') : 'en');
  const [isMain , setIsMain] = React.useState(false);
  

  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    var currentUrl = window.location.href;
    if (currentUrl.includes("main")) {
      setIsMain(true);
    }
  }, []);


  React.useEffect(() => {
    i18n.changeLanguage(lang); localStorage.setItem('language',lang); 
  }, [i18n, lang]);

  const handleLanguageChange = (event) => {
    setLang(event.target.value);
  };
  const mainClick = (event) => {
    localStorage.setItem("LeftDrawer", false);
    setOpen(false);
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
         className={clsx(classes.appBar, 
        )}
      >
        <Toolbar>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={2} md={4} container alignItems="center"> 
              {
                isMain 
                ?               
                <Button onClick={() => { navigate("/basic-how-to-play"); setIsMain(false);}}>
                    <WhiteTextTypography>{t("LeftDrawer.How To")}</WhiteTextTypography>
                </Button>
                : 
                <Button onClick={() => { navigate("/basic-main"); setIsMain(true);}}>
                    <WhiteTextTypography>{t("LeftDrawer.Play")}</WhiteTextTypography>
                </Button>
              }

            </Grid>
            
            <Grid item container xs={8} md={4} justify="center" alignItems="center">
              <div>
              <Typography variant="h6" className={classes.title} align="center" style={{maxWidth: '100%'}}>
                <span style={{cursor : "pointer" }} onClick={() => { navigate("/basic-main"); setIsMain(true)}}>
                  <Box component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                    {t('LeftDrawer.Title')}
                  </Box>
                </span>
              </Typography>
              </div>
            </Grid>

            <Grid item container xs={2} md={4} justify="flex-end" alignItems="center">
              <Hidden mdDown>
                <FormControl >
                  <LanguageDropdown lang={lang} onChange={handleLanguageChange} classes={classes} />
                </FormControl>
              </Hidden>

             <Hidden smDown>
                <Typography style={{display: 'inline-block',maxWidth: '150px'}}>
                  <Box component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">{props.myName}</Box>
                </Typography>
             </Hidden>

             <Button onClick={() => { navigate("/login"); setIsMain(true);}}>
                    <WhiteTextTypography>{t("LeftDrawer.Login")}</WhiteTextTypography>
                </Button>
              <Button onClick={() => { navigate("/sign-up"); setIsMain(true);}}>
                    <WhiteTextTypography>{t("LeftDrawer.Register")}</WhiteTextTypography>
              </Button>

            </Grid>
          </Grid>
          
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>

        </div>

        






      </Drawer>
      <main 
      onClick={mainClick}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className="innerComponent" >
          {props.innerComponent}
        </div>
        {isMain ? <WelcomePage name={"random name 3"} setIsMain={setIsMain} /> : null}
      </main>
    </div>
  );
}