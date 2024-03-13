## Technology Stack

- Node.js and npm
- Express.js
- MongoDB
- jsonwebtoken library for JWT generation and validation
- React.js
- Zod (for validation)
- Bcrypt.js
- Tailwind css

## Backend Implementation

### API Endpoints

1. **POST /signup:**
   - Validate input (username, password)
   - Check uniqueness of usernames 
   - Hash passwords securely
   - Store user data in the database

  ## Frontend Implementation

- **Signup Screen:**
  - Include fields for username/email, password.
  - Implement validation for required fields and email format using React state management and validation libraries.
  - Include terms and conditions checkbox.
  - Display clear error and success messages.

- **Login Screen:**
  - Include fields for username/email, password.
  - Implement validation for required fields and email format using React state management and validation libraries.
  - Display clear error and success messages.
  - Redirect to the post list screen after successful signup using React Router.

- **Post List Screen:**
  - Implement an infinite scroll for fetching and displaying posts.
  - This route is protected byt jwt token hence unauthorized user don't have any access to /posts route.

