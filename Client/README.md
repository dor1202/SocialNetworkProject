# React client intro
A file to explain the client.
The project is organized by views components.

## Running the client
### Step 1
Check if the Node modules folder is installed, if not:
```
npm install
```

### Step 2
Compile and run the client
```
npm start
```

The client should open a tab in the default browser on localhost 3000.

## Environment
Divided to 2 files, secret env and public env.
* **Secret env** - Contain the server url, google oAuth and facebook oAuth.
* **Public env** - Contain phone area codes, tags rotation colors and email codes.

## Pages
Available pages in the project
### App
Father component, holding the router.
### Error404View
The main page.
### LoginView
The login page, have sign up, login google/facebook, send reset email.
### MainView
The main page in the app, have feed in map and feed in a list.
Can see notifications, post new posts, filter exist feed, switch view and navigate to user page.
### ResetPasswordView
The reset password page, have simple form.
### UserView
The profile page, have friends management, groups management, profile management, notifications and log out.

## Pipes
Pipes in the project
### Ellipsis
Custom pipe, display the wanted length of a string and the "..." .
### EllipsisBasedWords
Custom pipe, display the wanted length of words and the "..." .
### CapitalFirstLetter
Custom simple pipe, display the first letter uppercase.
### SmallDate
Custom pipe, display the date in 3 possible formats, minutes, hours, days.

## Components
Components in the project
### Error404View
A simple div for navigation to login.
### LoginView
* **LoginForm** - Login contain the other components.
* **ForgotPasswordForm** - A simple form to send a reset mail.
* **SignUpForm** - A form to create a new user.
* **FacebookLogin/GoogleLogin** - Buttons to login with facebook/google.if user exist login, if not create a new user.
### MainView
* **SideNav** - Contain 3 nav components.
* **FeedMap** - Display the feed in a map.
* **NormalFeed** - Display the feed in a list.
### ResetPasswordView
* **ResetPasswordForm** - A simple form to reset password of a user.
### UserView
* **SideNav** - Contain 3 nav components.
* **Profile** - Display user data.
* **Friends** - Manage friends.
* **Groups** - Manage groups.

## Built With
* ["axios"](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser.
* ["jwt-decode"](https://www.npmjs.com/package/jwt-decode) - A small browser library that helps decoding JWTs token which are Base64Url encoded..
* ["leaflet"](https://www.npmjs.com/package/leaflet) - Open library map provider.
* ["react-leaflet"](https://www.npmjs.com/package/react-leaflet) - The map provider from leaflet to react client.
* ["lodash"](https://www.npmjs.com/package/lodash) - A modern JavaScript utility library delivering modularity, performance & extras..
* ["react-datepicker"](https://www.npmjs.com/package/react-datepicker) - A simple and reusable Datepicker component for React.
* ["react-facebook-login"](https://www.npmjs.com/package/react-facebook-login) - A Component React for Facebook Login.
* ["react-google-login"](https://www.npmjs.com/package/react-google-login) - A Google oAUth Sign-in / Log-in Component for React.
* ["react-tag-input"](https://www.npmjs.com/package/react-tag-input) - React-tags is a simple tagging component.
* ["react-visibility-sensor"](https://www.npmjs.com/package/react-visibility-sensor) - Sensor component for React that notifies you when it goes in or out of the window viewport.
* ["semantic-ui-react"](https://www.npmjs.com/package/semantic-ui-react) - A UI framework designed for theming..
* ["socket.io-client"](https://www.npmjs.com/package/socket.io-client) - A socket library.
* ["validator"](https://www.npmjs.com/package/validator) - A library of string validators and sanitizers.

## Author
* **Dor Schreiber** - *Server and Client work.*
* **Netanel Benglsdorf** - *Server and Client work.*
