import React,{useContext} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Search from '@material-ui/icons/Search';
import LogoutConfirmDialog from './LogoutConfirmDialog';
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import navigate from '../../navigate';
import AppContext  from "../../AppContext";
import { Box, Grid, Hidden } from '@material-ui/core';
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

export default function LeftDrawer(props) {
  const context = useContext(AppContext);
  const classes = useStyles();
  const theme = useTheme();
  
  const [open, setOpen] = React.useState(localStorage.getItem("LeftDrawer") === "true");
  const [openLogout, setOpenLogout] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [lang, setLang] = React.useState( (localStorage.getItem('language')) ? localStorage.getItem('language') : 'en');
  const [isMain , setIsMain] = React.useState(props.isMain);
  
  const openUserMenu = Boolean(anchorEl);
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


  const handleDrawerClose = () => {
    localStorage.setItem("LeftDrawer", false);

    setOpen(false);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);

  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleOpenLogout = () => {
    setOpenLogout(true);
    handleClose();
  };

  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  const handleOpenProfile = () => {
   setIsMain(false);
   navigate("/profile")
   handleClose();
  };

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
{/*               <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton> */}
              {
                isMain 
                ?               
                <Button onClick={() => { navigate("/how-to-play"); setIsMain(false);}}>
                    <WhiteTextTypography>{t("LeftDrawer.How To")}</WhiteTextTypography>
                </Button>
                : 
                <Button onClick={() => { navigate("/main"); setIsMain(true);}}>
                    <WhiteTextTypography>{t("LeftDrawer.Play")}</WhiteTextTypography>
                </Button>
              }

            </Grid>
            
            <Grid item container xs={8} md={4} justify="center" alignItems="center">
              <div>
              <Typography variant="h6" className={classes.title} align="center" style={{maxWidth: '100%'}}>
                <span style={{cursor : "pointer" }} onClick={() => { navigate("/main"); setIsMain(true)}}>
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
                  <Box component="div" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">{context.name}</Box>
                </Typography>
             </Hidden>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={openUserMenu}
                    onClose={handleClose}
                  >
                   <Hidden mdUp>
                      <Typography align='center' style={{display: 'block', fontWeight: 'bold'}}>
                        {context.name}
                      </Typography>
                   </Hidden>
                     
                      <MenuItem onClick={handleOpenProfile} > 
                        <ListItemIcon>
                          <AccountCircleOutlinedIcon fontSize="large" style={{marginRight:"6px"}}/> 
                        </ListItemIcon>
                        {t('LeftDrawer.Profile')}
                      </MenuItem>

                    
                    
                  
                  <Hidden lgUp>
                    <MenuItem >
                      <ListItemIcon className={classes.w100}>
                      <FormControl className={classes.w100} >
                        <LanguageDropdown lang={lang} onChange={handleLanguageChange} classes={classes.w100 + ' ' + classes.selector2} classesObject={{'icon' : classes.left45}}/>
                      </FormControl> 
                      </ListItemIcon>
                    </MenuItem>
                  </Hidden>

                    <MenuItem onClick={handleOpenLogout} button key={'Logout'}>
                      <ListItemIcon>
                        <PowerSettingsNewOutlinedIcon fontSize="large" style={{color:"red"}}/> 
                      </ListItemIcon>
                      {t('LeftDrawer.Logout')}
                    </MenuItem>
                    <LogoutConfirmDialog  open = {openLogout} onClose={handleCloseLogout}/>
                    
                    
                  </Menu>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <ListItem button onClick={() => { localStorage.setItem("LeftDrawer", true);navigate("/main" ); setIsMain(true); }}>
          <ListItemIcon style={{ color: "blue" }}><DashboardOutlinedIcon /> </ListItemIcon>
          <ListItemText primary={t('LeftDrawer.Main')} />
        </ListItem>
        <Divider />
        
          <ListItem button onClick={() => { localStorage.setItem("LeftDrawer", true);navigate("/how-to-play"); setIsMain(false);}}>
          <ListItemIcon style={{ color: "red" }}><Search /> </ListItemIcon>
          <ListItemText primary={t('LeftDrawer.How To')} />
          </ListItem>
          <Divider />
          <ListItem  button onClick={() => { localStorage.setItem("LeftDrawer", true);navigate("/game"); setIsMain(false);}}>
          <ListItemIcon  style={{ color: "orange"}}><SportsEsportsIcon /> </ListItemIcon>
          <ListItemText primary={t('LeftDrawer.Game')} />
          </ListItem>
          <Divider />





        <List>
        </List>
      </Drawer>
      <main
      onClick={mainClick}
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className="innerComponent">
          {props.innerComponent}
        </div>
        {isMain ? <WelcomePage name={context.name} setIsMain={setIsMain} /> : null}
      </main>
    </div>
  );
}