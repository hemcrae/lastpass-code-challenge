import React, { FormEvent, useCallback, useEffect, useState } from "react";
import "./Dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Buffer } from "buffer";
import * as WebCrypto from "easy-web-crypto";
import { logout } from "../../store/auth.slice";

export const Dashboard = () => {
  const [content, setContent] = useState("");
  const keyString = useSelector((state: RootState) => state.auth.key);
  const dispatch = useDispatch();

  const handleLogOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const getEncryptedContent = useCallback(
    async (str: string) => {
      if (!keyString) {
        return;
      }
      const keyBuffer = Buffer.from(keyString, "base64");
      const key = await WebCrypto.importKey(keyBuffer);
      return WebCrypto.encrypt(key, str);
    },
    [keyString]
  );

  const getDecryptedContent = useCallback(
    async (encryptedContent: WebCrypto.CipherData) => {
      if (!keyString) {
        return;
      }
      const keyBuffer = Buffer.from(keyString, "base64");
      const key = await WebCrypto.importKey(keyBuffer);
      return WebCrypto.decrypt(key, encryptedContent);
    },
    [keyString]
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const encryptedContent = await getEncryptedContent(content);
      localStorage.setItem(
        "encryptedContent",
        JSON.stringify(encryptedContent)
      );
    },
    [content]
  );

  useEffect(() => {
    const encryptedContent = localStorage.getItem("encryptedContent");
    if (!encryptedContent) {
      return;
    }
    const parsedContent = JSON.parse(encryptedContent);
    getDecryptedContent(parsedContent).then((c) => {
      setContent(c);
    });
  }, []);

  return (
    <form className="dashboard" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="dashboard__heading">Dashboard</h1>
      <label className="dashboard__message">Enter message:</label>
      <textarea
        className="dashboard__input"
        placeholder="Type message here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="dashboard__buttons">
        <button className="dashboard__button-save" type="submit">
          Save
        </button>
        <button className="dashboard__button-logout" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </form>
  );
};
