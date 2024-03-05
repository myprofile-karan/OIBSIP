## Technology Stack

- Node.js and npm
- Express.js
- MongoDB
- jsonwebtoken library for JWT generation and validation
- React.js
- Zod validation
- Bcrypt.js
- Tailwind css

## Backend Implementation

### API Endpoints

1. **POST /signup:**
   - Validate input (username, email, password)
   - Check uniqueness of usernames and emails
   - Hash passwords securely
   - Store user data in the database

  ## Frontend Implementation

- **Signup Screen:**
  - Include fields for username/email, password, and optional fields.
  - Implement validation for required fields and email format using React state management and validation libraries.
  - Include terms and conditions checkbox.
  - Display clear error and success messages.
  - Redirect to the post list screen after successful signup using React Router.

- **Post List Screen:**
  - Implement an infinite scroll for fetching and displaying posts.

