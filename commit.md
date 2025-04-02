feat(authorization): create basic REST API with JWT authorization

- Create postgresql db
- Create prisma schema with roles to store Users, Posts and Comments.
- Orginize folders and files in project.
- Implement authorization and authentication with JWT
- Add middleware to handle errors
- Add sign-up and login route with validation

feat(auth): implement JWT authentication and project setup

- Set up PostgreSQL database
- Create Prisma schema with roles for Users, Posts, and Comments
- Organize project structure (folders and files)
- Implement authentication and authorization using JWT
- Add middleware for error handling
- Add sign-up and login routes with validation

//Moze byc problem ze userid nie wysylam dobrze. Ze zamiast req.user.userId mam req.userId

feat(posts): implement routes for posts CRUD

- Change Users route for Auth route
- Add users role informations in JWT
- Create methods to check users permission
