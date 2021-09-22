# LastPass Front End Engineering Challenge

## Requirements

1. The backend API should have a single login endpoint which authenticates the user. It shall return an empty 200 response if authenticated or a 401 response if not. To create the user you may implement a create account API or provide mock credentials for the challenge.
2. The initial view of the application should be a login form with a username and password input and a login button. When the form is submitted the user shall be authenticated by the server.
3. Once authenticated, the client should derive an encryption key from the user’s password using PBKDF2. The encryption key should never be shared with the server.
4. Once authenticated, the client should show a single `<textarea>` element that allows the user to enter “private information”.
   - When loaded,the client should attempt to retrieve the encrypted data from browser storage. If it exists, decrypt it and populate the textarea with the contents.
   - There should be a save button that encrypts the entered data.The encrypted data should be saved to browser storage.
   - Bonus: Implement an autosave eature!
5. There should be a logout button which returns the user to the login screen.

## Recommended APIs

- https://github.com/diafygi/webcrypto-examples#pbkdf2---derivekey
- https://github.com/diafygi/webcrypto-examples#aes-gcm---encrypt
- https://github.com/diafygi/webcrypto-examples#aes-gcm---decrypt
- Use the NodeJS Buffer API in your code to simplify dealing with array buffers.
  - Ex.Buffer.from('test')returnsanArrayBufferthatcanbepassedtothecrypto.subtle APIs. You can also do Buffer.from(arrayBuffer).toString('base64') to get a base64 encoded string from the arrayBuffer variable.

## Encryption Tips

- Decryption must use the same initialization vector (IV) used during encryption.
- A given username and password should derive the same encryption key each time the user logs
  in. If you use PBKDF2, this means each user should have a consistent salt.
