import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class RequestValidationError extends CustomError {
    statusCode = 400
    constructor(public errors: ValidationError[]){ // public is equivalent to decalring the variable aabove and assing it in contructor
        super('Invalid Params')

        // since we are extending a built in class we need to write below line
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors(){
        return this.errors.map(error=>{
                if (error.type === 'field') {
                    return { message: error.msg, field: error.path };
                }
                return { message: error.msg }
            })
    }
}