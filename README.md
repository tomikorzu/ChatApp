# Chat App

- This is a simple chat application that uses socket.io for real-time communication.

## How to use it

1. Clone this repository to your local computer: `https://github.com/tomikorzu/ChatApp.git`
2. Go to the client folder with: `cd client`
3. Install the dependencies with: `npm install`
4. Create a `.env` file in the root of the client folder and add the following keys and values

```
PORT=3000
HOSTNAME=localhost
JWT_SECRET=your_secret_key
```

5. Start the client with: `npm run dev`

## Email keys and values in .env file

- Also you need to add the following keys and values in the `.env` file in the root of the client folder

```
EMAIL_HOST=your_email_host
EMAIL_PORT=your_email_port
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### How to get the email password

- If you are using Gmail, you need to create an app password. You can do that by following these steps:

1. Go to your Google Account: `https://myaccount.google.com/`
2. In the Search bar, type `App passwords`
3. Click on `App passwords`
4. Enter your account password
5. Give the name that you want to the app password like `Chat App`
6. Click on `Create`
7. Copy the generated password and paste it in the `.env` file: `EMAIL_PASS=your_generated_password`

You can see the .env.example file in the root of the client folder.
