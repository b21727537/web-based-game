import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Unity, { UnityContext } from "react-unity-webgl";



const useStyles = makeStyles((theme) => ({

    main : {
/*         backgroundImage: 'url(images/asd.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop:"50px", */
        justifyContent: 'center',
        alignItems: 'center'
    }

}));

/* const WhiteTextTypography = withStyles({
    root: {
      color: "#ecf0f1"
    }
  })(Typography);

  const BlueTextTypography = withStyles({
    root: {
      color: "#2c3e50",
    }
  })(Typography); */

  const unityContext = new UnityContext({
    loaderUrl: "WebGL/Build/WebGL_v1.1.loader.js",
    dataUrl: "WebGL/Build/WebGL_v1.1.data",
    frameworkUrl: "WebGL/Build/WebGL_v1.1.framework.js",
    codeUrl: "WebGL/Build/WebGL_v1.1.wasm",
  });


export default function Game(props) {
    
    const classes = useStyles();


    return (
        <div className={classes.main} >

            <Unity 
            unityContext={unityContext} 
            style={{
                width: '1800px',
                height: '800px',
                border: '2px solid black',
                background: 'green'
            }}
            />
            
        </div>
    );
}