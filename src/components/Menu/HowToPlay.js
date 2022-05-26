import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { useTranslation } from 'react-i18next';



const useStyles = makeStyles((theme) => ({

    main : {
/*         backgroundImage: 'url(images/question-mark.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center', */
        paddingTop:"10px",
        paddingBottom: "180px"
    },
    img : {
        flex: 1,
        width: 180,
        height: 270,
        resizeMode: 'contain',
    }

}));

const BlueTextTypography = withStyles({
    root: {
      color: "#2c3e50",
    }
  })(Typography);

  const WhiteTextTypography = withStyles({
    root: {
      color: "#ecf0f1"
    }
  })(Typography);

export default function Game(props) {
    
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div>
            <Grid container spacing={5} justify="center" alignItems="center" className={classes.main}>
                <Grid item xs='10'>
                    <BlueTextTypography variant="h1">
                        {t("HowTo.How")}
                    </BlueTextTypography>
                </Grid>
                <Grid item xs='2'>
                    <img src="/images/Hacettepe.jpg" alt="image1" className={classes.img}/>;
                </Grid>
                <Grid item xs={12} >
                    <BlueTextTypography  variant="h2" paddingLeft="100px">
                        {t("HowTo.Click")}
                    </BlueTextTypography>
                </Grid>
{/*                 <Grid item xs={12} >
                    <BlueTextTypography  variant="h2" paddingLeft="100px">
                        {t("HowTo.Then")}
                    </BlueTextTypography>
                </Grid> */}
                <Grid item xs={12} >
                    <BlueTextTypography  variant="h2" paddingLeft="100px">
                        {t("HowTo.Choose")}
                    </BlueTextTypography>
                </Grid>
                <Grid item xs={12} >
                    <BlueTextTypography  variant="h2" paddingLeft="100px">
                        {t("HowTo.By")}
                    </BlueTextTypography>
                </Grid>
                <Grid item xs={12} >
                    <BlueTextTypography  variant="h2" paddingLeft="100px">
                        {t("HowTo.Avoid")}
                    </BlueTextTypography>
                </Grid>

                <Grid style={{
                    position: "fixed",
                    left: 0,
                    bottom: 0,
                    right: 0,
                    backgroundColor: "#2c3e50",
                    justifyContent:"center",
                    }}>
                        <WhiteTextTypography variant="h5">
                            © Copyright - Hacettepe CS Project
                        </WhiteTextTypography>
                    </Grid>
            </Grid>
        </div>
    );
}