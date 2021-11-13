import React, { Dispatch, SetStateAction, useState } from "react";
import firebase from "../../firebase/init";
import styled from "@emotion/styled";
import { Form, Input, Label, Button } from "../../styles/global";

type Props = {
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2em;
`;

const Heading = styled.h1`
  font-size: 1.2em;
  margin: 0;
`;

// todo styling..
const LoginPage: React.FC<Props> = ({ setIsLoggedIn }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);
  const login = (event) => {
    setIsLoggingIn(true);
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword("sanderfsandoy@gmail.com", inputPassword)
      .then((userCredential) => {
        setIsLoggingIn(false);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setIsLoggingIn(false);
      });
  };
  return (
    <LoginContainer>
      <p>Du må logge inn for å legge til ny, vakker kunst!</p>
      <Form onSubmit={login}>
        <Label>Passord </Label>
        <Input
          type="password"
          onChange={(event) => setInputPassword(event.target.value)}
        />
        <Button style={{ marginTop: 8 }} type="submit">
          Logg inn
        </Button>
        {isLoggingIn && <div>Logger inn...</div>}
        {error && <p>Feil passord!</p>}
      </Form>
    </LoginContainer>
  );
};

export default LoginPage;
