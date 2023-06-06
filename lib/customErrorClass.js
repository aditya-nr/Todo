class CustomError extends Error {
    constructor(status, msg) {
        super();
        this.status = status;
        this.msg = msg;
    }

    static UserAlreadyExist(msg) {
        return new CustomError(409, msg);
    }

    static UserNotExist(msg = "user not exist") {
        return new CustomError(401, msg);
    }

    static PasswordIsWrong(msg = "wrong password") {
        return new CustomError(401, msg);
    }

    static Unauthorized(msg = "Unauthorized") {
        return new CustomError(401, msg);
    }
}

module.exports = CustomError