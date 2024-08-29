import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
    statusCode = 400;
    reason = 'Route not found';
    constructor(){
        super('Route not found')

        // since we are extending a built in class we need to write below line
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(){
        return [
            { message: this.reason}
        ];
    }
}