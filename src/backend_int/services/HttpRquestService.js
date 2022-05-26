import HTTPClient from "../http_client/HttpClient";
import { REQUEST_PATHS_FOR } from "../http_client/RequestBuilder";

export const HTTP_REQUESTS =
{
        USER_SERVICE:
            {
                LOGIN: (loginCredentials,successCallback,errorCallback)=>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.LOGIN();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds
                    client.addParameters(loginCredentials);
                    client.send();
                },
                REGISTER: (registerCredentials,successCallback,errorCallback)=>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.REGISTER();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds
                    client.addParameters(registerCredentials);
                    client.send();
                },
                UPDATE_ONE_TENANT_USER : (accountId,updateParams,successCallback,errorCallback) =>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.UPDATE_ONE_TENANT_USER(accountId);
                    client.requestType      = HTTPClient.REQUEST_TYPE.PUT;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds   
                    client.addParameters(updateParams);               
                    client.send();
                },
                DELETE_ONE_TENANT_USER : (userId,updateParams,successCallback,errorCallback) =>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.DELETE_ONE_TENANT_USER(userId);
                    client.requestType      = HTTPClient.REQUEST_TYPE.DELETE;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds   
                    client.addParameters(updateParams);               
                    client.send();
                },
                UPDATE_ONE_USER_PHOTO :  (userId,updateParams,successCallback,errorCallback) => {
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.UPDATE_ONE_USER_PHOTO(userId);
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.contentType      = HTTPClient.CONTENT_TYPE.MULTIPART;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; //5 seconds
                    client.formData         = updateParams;     
                    client.send();
                },
                DELETE_ONE_USER_PHOTO : (userId,updateParams,successCallback,errorCallback) =>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.DELETE_ONE_USER_PHOTO(userId);
                    client.requestType      = HTTPClient.REQUEST_TYPE.DELETE;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds   
                    client.addParameters(updateParams);               
                    client.send();
                },
                CHECK_PSW :  (userId,psw,successCallback,errorCallback) => {
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.CHECK_PSW(userId);
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; //5 seconds
                    client.addParameters(psw);
                    client.send();
                },
                AUTH_CALL: (successCallback,errorCallback)=>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.AUTH_CALL();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds
                    //client.addParameters(loginCredentials);
                    client.send();
                },
                LOGOUT: (successCallback,errorCallback)=>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.LOGOUT();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds
                    client.send();
                },
                FORGOT_PASSWORD : (mail,successCallback,errorCallback)=>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.FORGOT_PASSWORD();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds
                    client.addParameters(mail);
                    client.send();
                },
                CREATE_NEW_PASSWORD_TOKEN :  (passwordToken,successCallback,errorCallback) => {
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.CREATE_NEW_PASSWORD_TOKEN();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; //5 seconds
                    client.addParameters(passwordToken);
                    client.send();
                },
                VALIDATE_PASSWORD : (token,successCallback,errorCallback) =>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.VALIDATE_PASSWORD();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; //5 seconds
                    client.addParameters(token);
                    client.send();
                },
                CHANGE_PASSWORD : (passwordObj,successCallback,errorCallback)=>{
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.USERS_SERVICE.CHANGE_PASSWORD();
                    client.requestType      = HTTPClient.REQUEST_TYPE.PUT;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; // 5 seconds
                    client.addParameters(passwordObj);
                    client.send();
                },
            },
            IMAGE_SERVICE: {
                UPLOAD_TEMP_IMAGE :  (updateParams,successCallback,errorCallback) => {
                    let client              = new HTTPClient();
                    client.requestPath      = REQUEST_PATHS_FOR.IMAGE_SERVICE.UPLOAD_TEMP_IMAGE();
                    client.requestType      = HTTPClient.REQUEST_TYPE.POST;
                    client.contentType      = HTTPClient.CONTENT_TYPE.MULTIPART;
                    client.successCallback  = successCallback;
                    client.failCallback     = errorCallback;
                    client.timeout          = 5000; //5 seconds
                    client.formData         = updateParams;     
                    client.send();
                },
            }        
    };
