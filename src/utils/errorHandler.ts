import { CustomError } from "../types/types";

class CustomErrorClass extends Error implements CustomError {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, CustomErrorClass.prototype);
    }
}

export default function errorHandler(statusCode: number, message: string): CustomError {
    return new CustomErrorClass(statusCode, message);
}