import { convertDaysToMiliseconds } from "./timeUnitConversion";
import { PRODUCTION } from "../consts/enviroment";

// Get token from model, create cookie and send response
export const sendTokenResponse = (user, statusCode, res) => {
  //json web token creation
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + convertDaysToMiliseconds(process.env.JWT_COOKIE_EXPIRE)
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === PRODUCTION) {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("TOKEN", token, options)
    .json({ success: true, token });
};
