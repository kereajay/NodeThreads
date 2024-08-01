# Node Threads API 🌐

Welcome to the Node Threads API! This backend service powers the Node Threads application. Below are the endpoints for various functionalities.
This application will provide comprehensive features of the Threads API.

# Technologies Used 🛠️

## Backend 🌐
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: Fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **MongoDB**: NoSQL database for storing user and post data.

## Authentication & Authorization 🔒
- **JWT (JSON Web Tokens)**: Secure token-based authentication.

## Hosting & Deployment 🚀
- **Render**: Hosting platform for deploying the Node backend.

## APIs & Routes 🛤️
- **RESTful API**: Standard conventions for API endpoints.

## Development Tools 🛠️
- **Nodemon**: Tool for automatically restarting the Node.js application when file changes in the directory are detected.
- **Postman**: Platform for API development, testing, and collaboration.
- **VS Code**: Code editor for development.

## Documentation 📚
- **Markdown**: Simple markup language for creating formatted text using a plain-text editor.



## Image Hosting 📸
- **Cloudinary**: Cloud-based service for hosting and managing images.



## User API's 👤

### Signup 📝
- **Endpoint:** `POST /api/v1/user/signup`
- **Description:** Sign up a new user.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/signup`

### Signin 🔑
- **Endpoint:** `POST /api/v1/user/signin`
- **Description:** Sign in an existing user.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/signin`

### Get a User 🕵️‍♂️
- **Endpoint:** `GET /api/v1/user/getuser/:Username`
- **Description:** Retrieve a user by their username.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/getuser/Username`

### Logout 🚪
- **Endpoint:** `POST /api/v1/user/logout`
- **Description:** Logout the current user.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/logout`

### Follow ➕
- **Endpoint:** `POST /api/v1/user/follow/:userId`
- **Description:** Follow a user.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/follow/userId`

### Update 🔄
- **Endpoint:** `PUT /api/v1/user/update/:userId`
- **Description:** Update user details.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/update/userId`

### Get All Users 👥
- **Endpoint:** `GET /api/v1/user/getallusers`
- **Description:** Retrieve all users.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/getallusers`

### Freeze a User ❄️
- **Endpoint:** `PUT /api/v1/user/freeze`
- **Description:** Freeze a user account.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/freeze`

### User Suggestions 💡
- **Endpoint:** `GET /api/v1/user/usersuggestions`
- **Description:** Get user suggestions based on followers.
- **Example:** `https://nodethreads.onrender.com/api/v1/user/usersuggestions`

## Post API's 📝

### Create Post ➕
- **Endpoint:** `POST /api/v1/post/create`
- **Description:** Create a new post.
- **Example:** `https://nodethreads.onrender.com/api/v1/post/create`

### Get a Post by ID 🆔
- **Endpoint:** `GET /api/v1/post/getpost/:postId`
- **Description:** Retrieve a post by its ID.
- **Example:** `https://nodethreads.onrender.com/api/v1/post/getpost/66a7ca46bbf2e31657c59b9d`

### Delete Post ❌
- **Endpoint:** `DELETE /api/v1/post/delete/:postId`
- **Description:** Delete a post by its ID.
- **Example:** `https://nodethreads.onrender.com/api/v1/post/delete/postid`

### Like/Dislike Post 👍👎
- **Endpoint:** `POST /api/v1/post/likepost/:postId`
- **Description:** Like or dislike a post.
- **Example:** `https://nodethreads.onrender.com/api/v1/post/likepost/postid`

### Reply to Post 💬
- **Endpoint:** `POST /api/v1/post/replay/:postId`
- **Description:** Reply to a post.
- **Example:** `https://nodethreads.onrender.com/api/v1/post/replay/postid`

### Feed 📰
- **Endpoint:** `GET /api/v1/post/feed`
- **Description:** Get the feed of posts.
- **Example:** `https://nodethreads.onrender.com/api/v1/post/feed`

### Delete Reply 🗑️
- **Endpoint:** `GET /api/v1/post/deletereplay/:postId`
- **Description:** Delete a reply from a post.
- **Example:** `https://nodethreads.onrender.com/api/v1/post/deletereplay/postid`

## Message API's 💌

### Create Message ➕
- **Endpoint:** `POST /api/v1/message/create`
- **Description:** Create a new message.
- **Example:** `https://nodethreads.onrender.com/api/v1/message/create`

### Get Message 📬
- **Endpoint:** `GET /api/v1/message/get/:messageId`
- **Description:** Retrieve a message by its ID.
- **Example:** `https://nodethreads.onrender.com/api/v1/message/get/messageid`

### Get a Conversation 💬
- **Endpoint:** `GET /api/v1/message/getconversation`
- **Description:** Retrieve a conversation.
- **Example:** `https://nodethreads.onrender.com/api/v1/message/getconversation`

### Delete Message ❌
- **Endpoint:** `DELETE /api/v1/message/delete/:messageId`
- **Description:** Delete a message by its ID.
- **Example:** `https://nodethreads.onrender.com/api/v1/message/delete/messageid`


## Installation 📥
 
  git clone https://github.com/kereajay/NodeThreads

