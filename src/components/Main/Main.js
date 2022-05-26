import React from 'react';
import LeftDrawer from '../Menu/LeftDrawer';
import HTTPClient from '../../backend_int/http_client/HttpClient';
import SessionStorage from '../Helper-Functions/SessionStorage';
import { withTranslation } from 'react-i18next';

class Main extends React.Component {
    componentDidMount() {

        if (SessionStorage.shouldBeDisplayWelcomeMessage) {
            SessionStorage.welcomeMessageRequest = false;
        }
        HTTPClient._notifierFunc = this.props.enqueueSnackbar;
    }

    render() {
        return (
            <div id="mainPage">
                <LeftDrawer/>
            </div>
        )
    }
}


export default withTranslation(Main);



