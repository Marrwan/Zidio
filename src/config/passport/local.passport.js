
const { User } = require("../../models/Models");
const { compareToken } = require("../../util/token.util");


const LocalStrategy = require("passport-local").Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const passportLocalConfig = async (passport) => {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {

        try {
          let user;
          user = await User.findOne({where: {email}})

          if (!user) {
            return done(null, false, {
              status: 404,
              message: "Incorrect credentials",
            });
          }

          const passwordMatch = await compareToken(
            password,
            user.password
          );

          if (!passwordMatch) {
            // console.log("YELLO");

            return done(null, false, {
              status: 401,
              message: "Incorrect credentials",
            });
          }
          
          // Create a JWT token with user information
          //   const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
          //     expiresIn: "1d",
          //   });
          user.password = null;
          return done(null, user.dataValues);
        } catch (error) {
          return done(null, false, error);
        }
      }
    )
  );

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET,
      },
      async function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        
        let user;
        // user = await prisma.user.findUnique({
        //   where: {
        //     id: jwtPayload?.user?.id || jwtPayload.id,
        //   },
        // });  
        user = await User.findOne({where: {
              email: jwtPayload?.email|| jwtPayload?.user?.email || decoded?.id?.id,
            }})

        // If user is still not found, return an error
        if (!user) {
          return cb(null, false, {
            status: 404,
            message: "User not found.",
          });
        }

        // If user is found, return the user
        return cb(null, { ...jwtPayload.data });
      }
    )
  );
};

module.exports = passportLocalConfig;
