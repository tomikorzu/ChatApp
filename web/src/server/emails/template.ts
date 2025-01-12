export const template = (content: string) => {
  return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu correo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 10px;
        }

        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #dddddd;
        }

        .header svg {
            max-width: 150px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .content h1 {
            color: #333333;
        }

        .button {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            background-color: #4caf50;
            color: #ffffff;
            text-decoration: none;
            font-weight: bold;
            border-radius: 5px;
        }

        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#27947c"><path d="M63.988 31.295c-.174-10.7-6.14-21.118-15.37-26.604C41.346.162 32.16-1.057 23.886 1.033 11.433 4.168 1.505 15.446.243 28.3-1.325 40.44 4.815 53.066 15.308 59.292c10.276 6.444 24.253 6.183 34.3-.6 9.057-5.878 14.674-16.6 14.37-27.388zM33.77 59.25c-14.543 1.437-28.607-10.885-29-25.472-1.1-11.843 6.705-23.556 17.852-27.475C38.254.033 57.456 11.615 59.067 28.38c2.526 15.064-10.014 30.4-25.297 30.87zM24.2 30.38l21.03-17.2-11.364 17.243c-3.222 0-6.444 0-9.666-.044zm5.913 3.18l9.666.044-21.03 17.243L30.113 33.56z"/></svg>
        </div>
        <div class="content">
        ${content}
        </div>
        <div class="footer">
            <p>© 2024 Chat App. All rights reserved.</p>
        </div>
    </div>
</body>


</html>`;
};
