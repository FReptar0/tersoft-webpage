class CustomResponse {

    constructor(status, message, data, errors) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }
}

// Ejemplo de uso de constructor:

// const customResponse = new CustomResponse();
// customResponse.setStatus(200);
// customResponse.setMessage("Token válido");
// customResponse.setData({});
// customResponse.setErrors({});
// return res.status(200).json(customResponse.getResponse());


// Ejemplo de uso de constructor:

// const customResponse = new CustomResponse(200, "Token válido", {}, {});

module.exports = CustomResponse;

