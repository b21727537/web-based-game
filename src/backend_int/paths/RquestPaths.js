export default {

    DELETE_ONE_TENANT_USER: (userID)=>`user/${userID}`,
    UPDATE_ONE_TENANT_USER : (userId)=>`user/${userId}`,
    UPDATE_ONE_USER_PHOTO : (userID)=>`profilePicture/${userID}`,
    DELETE_ONE_USER_PHOTO : (userID)=>`profilePicture/${userID}`,
    CHECK_PSW: (userId)=>`${userId}/checkPsw`,
    FORGOT_PASSWORD:"forgotPassword",
    CREATE_NEW_PASSWORD_TOKEN:"generatePasswordToken",
    VALIDATE_PASSWORD : "passwordValidate",
    CHANGE_PASSWORD : "changePassword",
    LOGIN:"login",
    REGISTER: "register",
    AUTH_CALL:"me",
    LOGOUT:"logout",
    UPLOAD_TEMP_IMAGE:"tempRoomImage"
  }
  
  