import axios from "axios";
import packageJson from '../../../package.json';
export default class HTTPClient {
    
    static _notifierFunc;

    constructor() {
        this._params = {};
        this._timeout = 10000;
        this._contentType = HTTPClient.CONTENT_TYPE.JSON;
        this._responseType = HTTPClient.RESPONSE_TYPE.JSON;
        this._acceptType = HTTPClient.ACCEPT.DEFAULT;
        this._formData = null;
        this._userNotification = null;
        this.setHeaderCustomParameters();
    }

    set requestPath(path) {
        this._reqPath = path;
    }

    set requestType(type) {
        if (Object.keys(HTTPClient.REQUEST_TYPE).includes(type)) {
            this._reqType = type;
        } else {
            console.error("Request type is not defined on HTTPClient")
        }
    }

    set successCallback(cb) {
        this._successCB = cb;
    }

    set failCallback(cb) {
        this._failCB = cb;
    }

    set timeout(duration) {
        this._timeout = duration;
    }

    set contentType(type) {
        this._contentType = type;
    }

    set responseType(type) {
        this._responseType = type;
    }

    set acceptType(type) {
        this._acceptType = type;
    }

    set formData(formData) {
        this._formData = formData;
    }

    set userNotification(notification) {
        this._userNotification = notification;
    }

    addParameters = (params) => {
        this._params = { ...this._params, ...params };
    };

    static setAuthToken = (token) => {
        //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    setHeaderCustomParameters = ()  => {
        axios.defaults.headers.common = { "version":packageJson.version,"customer":packageJson.customer}

    }

    static unsetAuthToken = () => {
        //axios.defaults.headers.common['Authorization'] = null;
    };

    _build = () => {
        const headers = { 'Content-Type': this._contentType, 'Accept': this._acceptType};
        const params = this._formData ? this._formData : this._params;
        this._promise = null;
        switch (this._reqType) {
            case HTTPClient.REQUEST_TYPE.GET:
                this._promise = axios.get(this._reqPath, { params:params, headers: headers, timeout: this._timeout, responseType: this._responseType, withCredentials:true });
                break;
            case HTTPClient.REQUEST_TYPE.POST:
                this._promise = axios.post(this._reqPath, params, { headers: headers, timeout: this._timeout, responseType: this._responseType, withCredentials:true  });
                break;
            case HTTPClient.REQUEST_TYPE.PUT:
                this._promise = axios.put(this._reqPath, params, { headers: headers, timeout: this._timeout, responseType: this._responseType, withCredentials:true  });
                break;
            case HTTPClient.REQUEST_TYPE.DELETE:
                this._promise = axios.delete(this._reqPath, {data:params, headers: headers, timeout: this._timeout, responseType: this._responseType, withCredentials:true  });
                break;
            default:
                console.log(`This request type (${this._reqType}) not handled by HTTPClient`);
                break;
        }
    };

    send = () => {
        this._build();
        this._promise.then((res) => {
            this._successCB(res.data);
            if (HTTPClient._notifierFunc && this._userNotification) {
                HTTPClient._notifierFunc(this._userNotification.title, {
                    variant: this._userNotification.type
                });
            }
        }).catch((err) => {
            if(err.toString().includes('401')){
                //TODO logout user
            }
            if (err.response) {
                // Request made and server responded
                this._failCB(err.response);
              } else if (err.request) {
                // The request was made but no response was received
                this._failCB(err);
              } else {
                // Something happened in setting up the request that triggered an Error
                this._failCB(err);
              }
              if (HTTPClient._notifierFunc && this._userNotification) {
                HTTPClient._notifierFunc(this._userNotification.title, {
                    variant: this._userNotification.type
                });
            }
            //HTTPClient.showErrorFunction(err.toString());
        })
    };

}

HTTPClient.REQUEST_TYPE = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

HTTPClient.CONTENT_TYPE = {
    JSON: "application/json",
    MULTIPART: "multipart/form-data"
};

HTTPClient.RESPONSE_TYPE = {
    JSON: "json",
    BLOB: "blob"
};

HTTPClient.ACCEPT = {
    DEFAULT: "application/json, text/plain, */*",
    JSON: "application/json,*/*",
};