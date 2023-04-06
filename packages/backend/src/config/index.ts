import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 3000,
  jwt: {
    secret: process.env.SECRET || "fucking-exam@avan",
  },
  oauth: {
    github: {
      clientID: process.env.CLIENT_ID || "",
      clientSecret:
        process.env.CLIENT_SECRET || "",
    },
  },
};
