### Changes
- get('/') in userRoutes
- cors in app.js
- for checking get in userRoutes 
  ```js
  const user = await userModel.findById(decode._id);
  ```
  in authMiddleware.js
