


const responseWithJson = (res, data, status = 200) => {
    return send(res, data, status)
}

const badRequest = (res, data) => {
    return send(res, data, 400)
}



const responseMessage = (res, message, status = 200) => {
    return send(res, {
        message
    }, status)
}



const send = (res, data, status) => {
    return res.status(status).send(data)
}

module.exports = {
    responseWithJson
}