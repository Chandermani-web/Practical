class ApiError extends Error {
    constructor(
        message= "Something went wrong",
        statusCode= 500,
        errors= [],
        stack= ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        this.data = null;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;