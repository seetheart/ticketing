import { ValidationError } from "express-validator";
import { CustomError } from "./custom-errors";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';
    constructor(){ // public is equivalent to decalring the variable aabove and assing it in contructor
        super('Error connecting to database')

        // since we are extending a built in class we need to write below line
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors(){
        return [
            { message: this.reason}
        ];
    }
}