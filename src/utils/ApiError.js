class ApiError extends Error {
    constructor(
        statusCode,
        message= "Something ent wrong",
        errors = [],
        statck = ""
    ){
        supper(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false;
        this.error = errors

        if(stack) {
            this.stack = stack 
        } else{
            Error.captureStackTrace(this, this.constuctor)
        }
    }
}

export {ApiError}