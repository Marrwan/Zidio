
const passportLocalConfig = require("./local.passport")
// const  serializeDeserializeUser  = require("./serializeDeserialize")

const passportConfig = (passport) => {
    // serializeDeserializeUser(passport)
    passportLocalConfig(passport)
  
}

module.exports= passportConfig;