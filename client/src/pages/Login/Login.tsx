import React, { FormEvent, useCallback, useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/auth.slice";
import { useHistory } from "react-router";
import { getKeyFromPassword } from "../../encryption.util";

export const Login = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const toast = useToast();

  const getKey = useCallback(async () => {
    return getKeyFromPassword(password);
  }, [password]);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      axios
        .post(
          "http://localhost:8080/login",
          {
            username,
            password,
          },
          {
            validateStatus: function (status) {
              return status < 500;
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            getKey().then((key) => {
              dispatch(authenticate(key));
              history.push("/");
            });
          } else {
            toast({
              title: "Login unsuccessful",
              status: "error",
              isClosable: true,
            });
          }
        });
    },
    [username, password, dispatch]
  );

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h1 className="form__heading">Login</h1>
        <label className="form__username">Username</label>
        <input
          className="form__username-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="form__password">Password</label>
        <input
          className="form__password-input"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <button className="form__button" type="submit">
          Login
        </button>
      </form>
    </>
  );
};
