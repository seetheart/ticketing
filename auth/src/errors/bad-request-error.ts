import { CustomError } from "./custom-errors";

export class BadRequestError extends CustomError {
    statusCode = 400;

    // public is equivalent to decalring the variable aabove and assing it in contructor
    constructor(public message: string){ 
        super(message)

        // since we are extending a built in class we need to write below line
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors(){
        return [
            { message: this.message}
        ];
    }
}
