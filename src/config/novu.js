const { Novu } = require("@novu/node");


const novu = new Novu(process.env.NOVU_API_KEY);

module.exports = {novu}