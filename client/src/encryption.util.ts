import { Buffer } from "buffer";

export const getKeyFromPassword = async (password: string) => {
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    Buffer.from(password),
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );
  const key = await window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: new Uint8Array(16),
      iterations: 1000,
      hash: { name: "SHA-256" },
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
  const exportedKeyBuffer = await window.crypto.subtle.exportKey("raw", key);
  return Buffer.from(exportedKeyBuffer).toString("base64");
};

// export const getKeyFromString = async (str: string) => {
//   let encrypt = new TextEncoder();
//   const keyStringMaterial = await window.crypto.subtle.importKey(
//     "raw",
//     encrypt.encode(str).buffer,
//     "PBKDF2",
//     false,
//     ["deriveBits", "deriveKey"]
//   );
//   return window.crypto.subtle.deriveKey(
//     {
//       name: "PBKDF2",
//       salt: new Uint8Array(16),
//       iterations: 100000,
//       hash: "SHA-256",
//     },
//     keyStringMaterial,
//     { name: "AES-GCM", length: 256 },
//     true,
//     ["encrypt", "decrypt"]
//   );
// };

// export const encrypt = async (key: CryptoKey, content: string) => {
//   const blob = new Blob([content], { type: "text/plain; charset=utf-8" });
//   const data = await blob.arrayBuffer();
//   const encryptedArrayBuffer = await window.crypto.subtle.encrypt(
//     {
//       name: "AES-GCM",
//       iv: new Uint8Array(12).buffer,
//     },
//     key,
//     data
//   );
//   const returnBlob = new Blob([encryptedArrayBuffer], {
//     type: "text/plain; charset=utf-8",
//   });
//   return returnBlob.text();
// };

// export const decrypt = async (key: CryptoKey, encryptedString: string) => {
//   const blob = new Blob([encryptedString], {
//     type: "text/plain; charset=utf-8",
//   });
//   const data = await blob.arrayBuffer();
//   console.log("data", data);
//   const decryptedArrayBuffer = await window.crypto.subtle.decrypt(
//     {
//       name: "AES-GCM",
//       iv: new Uint8Array(12).buffer,
//     },
//     key,
//     data
//   );
//   const returnBlob = new Blob([decryptedArrayBuffer], {
//     type: "text/plain; charset=utf-8",
//   });
//   const text = await new Response(returnBlob).text();
//   return text;
// };
