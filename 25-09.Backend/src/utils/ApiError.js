class ApiError extends Error {
    constructor(
        message= "Something went wrong",
        statusCode= 500,
        errors= [],
        statck= ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        this.data = null;

        if(statck){
            this.stack = statck;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;