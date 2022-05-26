import { IconButton, MenuItem, Select } from '@material-ui/core';
import { IconFlagTR, IconFlagUS } from 'material-ui-flags';
import React from 'react';

const LanguageDropdown = (props) => {
return ( <div style={{marginRight:"16px"}}>
            <Select
                value={props.lang}
                onChange={props.onChange}
                className={props.classes.selector}
                classes={props.classesObject}
                disableUnderline={true}
            >
                <MenuItem value="en" >
                <IconButton ><IconFlagUS /></IconButton>
                </MenuItem> 
                <MenuItem value="tr" >
                <IconButton ><IconFlagTR /></IconButton>
                </MenuItem> 
            </Select>
            </div> 
        );
 }
export default LanguageDropdown;