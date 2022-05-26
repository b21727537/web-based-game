class SessionStorage{

    //SETTERS
    static set sessionData(JSONData){
        localStorage.setItem("session_params", JSON.stringify(JSONData));
    }

    static set authToken(newToken){

    }

    static set authUserName(userName){
        try{
            let existingSessionParams =  JSON.parse(localStorage.getItem("session_params"));
            existingSessionParams.name = userName;
            localStorage.setItem("session_params", JSON.stringify(existingSessionParams));
        }catch(err){
            return null;
        }
    }

    static set tenants(tenant){
        try{
            let existingSessionParams =  JSON.parse(localStorage.getItem("session_params"));
            const tenantArray = [...existingSessionParams.tenants, tenant];
            existingSessionParams.tenant=tenantArray;
            localStorage.setItem("session_params", JSON.stringify(existingSessionParams));
        }catch(err){
            return null;
        }
    }

    static set selectedTenantID(tenantID){
        try{
            let existingSessionParams =  JSON.parse(localStorage.getItem("session_params"));            
            existingSessionParams.selectedTenant=tenantID;
            localStorage.setItem("session_params", JSON.stringify(existingSessionParams));
        }catch(err){
            return null;
        }
    }

    static set generatedTokens(tokens){
        try{
            let existingSessionParams =  JSON.parse(localStorage.getItem("session_params"));
            existingSessionParams.generatedTokens = tokens;
            localStorage.setItem("session_params", JSON.stringify(existingSessionParams));
        }catch(err){
            return null;
        }
    }

    static set welcomeMessageRequest(isActive){
        if(isActive){
            localStorage.setItem("show_success_login_message", "yes");
        }else{
            localStorage.removeItem('show_success_login_message');
        }
    }

    //GETTERS
    static get authToken(){

        return null;
    }

    static get authUserID(){
        try{
            return JSON.parse(localStorage.getItem("session_params"))._id;
        }catch(err){
            return null;
        }
    }

    static get tenants(){
        try{
            return JSON.parse(localStorage.getItem("session_params")).tenants;
        }catch(err){
            return null;
        }
    }

    static get selectedTenantID(){
        try{
            return JSON.parse(localStorage.getItem("session_params")).selectedTenant;
        }catch(err){
            return null;
        }
    }

    static get userEmail(){
        try{
            return JSON.parse(localStorage.getItem("session_params")).email;
        }catch(err){
            return null;
        }
    }

    static get generatedTokens(){
        try{
            return JSON.parse(localStorage.getItem("session_params")).generatedTokens;
        }catch(err){
            return null;
        }
    }

    static get shouldBeDisplayWelcomeMessage(){
        return localStorage.getItem('show_success_login_message');
    }

    static get authUserName(){
        try {
            return JSON.parse(localStorage.getItem("session_params")).name;
        } catch (error) {
            return null;
        }
    }

    //FUNCTIONS
    static removeSessionData(){
        localStorage.removeItem('session_params');
    }
    
}

export default SessionStorage;