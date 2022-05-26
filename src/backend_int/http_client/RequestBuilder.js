import Path from "../paths/RquestPaths"
import RequestURLs from "../paths/RquestUrls"


export const REQUEST_PATHS_FOR = {
    USERS_SERVICE: {
        LOGIN: () => {
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.LOGIN}`;
        },
        REGISTER: () => {
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.REGISTER}`;
        },
        AUTH_CALL: () => {
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.AUTH_CALL}`;
        },
        UPDATE_ONE_TENANT_USER: (accountId) =>{
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.UPDATE_ONE_TENANT_USER(accountId)}`;
        },
        DELETE_ONE_TENANT_USER: (userId) =>{
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.DELETE_ONE_TENANT_USER(userId)}`;
        },
        UPDATE_ONE_USER_PHOTO: (userId) => {
            return String.format(`${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.IMAGE_API_POSIX}${Path.UPDATE_ONE_USER_PHOTO(userId)}`);
        },
        DELETE_ONE_USER_PHOTO: (userId) => {
            return String.format(`${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.IMAGE_API_POSIX}${Path.DELETE_ONE_USER_PHOTO(userId)}`);
        },
        UPDATE_A_TENANT_USER: (tenantID) => {
            return String.format(`${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_TENANT_POSIX}${Path.UPDATE_A_TENANT_USER(tenantID)}`);
        },
        CHECK_PSW: (userId) => {
            return String.format(`${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.CHECK_PSW(userId)}`);
        },
        LOGOUT: () => {
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.LOGOUT}`;
        },
        FORGOT_PASSWORD : () =>{
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.FORGOT_PASSWORD}`;
        },
        CREATE_NEW_PASSWORD_TOKEN : () =>{
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.CREATE_NEW_PASSWORD_TOKEN}`;
        },
        VALIDATE_PASSWORD : () => {
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.VALIDATE_PASSWORD}`;
        },
        CHANGE_PASSWORD : () => {
            return `${RequestURLs.USERS_SERVER_BASE_URL}${RequestURLs.USERS_API_POSIX}${Path.CHANGE_PASSWORD}`;
        }
    },
    IMAGE_SERVICE: {
        UPLOAD_TEMP_IMAGE:() => {
            return `${RequestURLs.BOOKING_SERVER_BASE_URL}${RequestURLs.IMAGE_API_POSIX}${Path.UPLOAD_TEMP_IMAGE}`;
        }
    }
};

String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};