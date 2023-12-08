import { Button, Container } from "react-bootstrap";
import HeaderNavbar from "../components/Header-navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../json-server/api";
import verified_gift from "../asset/verify.gif";
import error_verification from "../asset/error.gif";
import { useToast } from "@chakra-ui/react";

export const Verification_Email = () => {
  const { id, token } = useParams();
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const verifyUser = async () => {
    await api
      .post(`/users/verify_user/${token}?id=${id}`)
      .then((result) => {
        setIsVerified(true);
        toast({
          title: "Account verification success",
          status: "success",
          isClosable: true,
          duration: 2000,
          position: "top",
        });
      })
      .catch((err) => setError(err.response.data));
  };

  const resendVerificationLink = async () => {
    toast({
      title: "a new verification email has been sent",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    await api
      .post(`/users/new_account_verification/${id}`, {})
      .then((result) => {
        console.log(result);
        setError("a new verification email has been sent");
      })
      .catch((err) => setError(err?.message));
  };

  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <HeaderNavbar />
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <div className="my-4">
          <h2>
            {isVerified
              ? "Your account has been verified, you may now log in"
              : "Oooooops"}
          </h2>
        </div>
        <div>
          <img src={isVerified ? verified_gift : error_verification} />
        </div>

        <div className="my-4 text-danger">
          <b>{error ? error : null}</b>
        </div>

        {isVerified ? null : (
          <Button onClick={resendVerificationLink}>Resend Verification</Button>
        )}
        {isVerified ? (
          <a href="/login">
            <Button>Login page</Button>
          </a>
        ) : null}
      </Container>
    </>
  );
};
