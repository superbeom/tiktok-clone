import axios from "axios";
import { CredentialResponse } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

export const createOrGetUser = async (
  response: CredentialResponse,
  login: Function
) => {
  try {
    const { credential } = response;

    const decoded: { name: string; picture: string; sub: string } = jwt_decode(
      credential ?? ""
    );

    const { name, picture, sub } = decoded;

    const user = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    login(user);

    await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_PATH}/api/auth`, user)
      .catch((error) =>
        console.log(
          "@Error createOrGetUser - utils: ",
          error.message,
          " Check the axios"
        )
      );
  } catch (error: any) {
    console.log(
      "@Error createOrGetUser - utils: ",
      error.message,
      " Maybe credential is blank. Check the credential."
    );
  }
};
