# MERP Stack Mono Repo

Fullstack app using MongoDB, FastAPI, React, and Python

## Features

- **React**: Frontend library for building user interfaces.
- **Mantine**: React Component Framework with support for Tailwind CSS
- **Tailwind**: CSS Framework for building responsive UIs.
- **FastAPI**: Backend framework for building APIs with Python.
- **Ariadne**: used to perform tasks using GraphQL
- **MongoDB**: NoSQL database for storing application data.
- **beanie**: An ODM for Python, similar to mongoose
- **Python**: Core programming language for backend logic.

## Folder Structure

```text
/D:/projects/2025/merp-github-ready/
├── server/         # FastAPI backend code
├── client/        # React frontend code
├── ./client/tests/        # client Unit and integration tests
├── ./server/tests/        # server Unit and integration tests
└── README.md        # Project documentation
```

## Prerequisites

- Node.js (v16+)
- Python (v3.9+)
- MongoDB (v5.0+)
- npm or yarn (for managing frontend dependencies)

## Setup Instructions

### Backend

1. Navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Create a virtual environment and activate it:

    ```bash
    # navigate to your project folder first
    # https://docs.python.org/3/library/venv.html or
    # https://www.geeksforgeeks.org/create-virtual-environment-using-venv-python/

    # here we are creating a virtual python environment named dev

    python -m venv dev
    source dev/bin/activate  # On Windows: dev\Scripts\activate
    ```

3. Install dependencies (if you want to do it manually, see the note):

    ```bash
    pip install -r install.txt
    ```

4. Start the FastAPI server (Express equivalent):

    ```bash
    uvicorn main:app --reload
    ```

### Frontend

1. Navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm run dev
    ```

note: These commands are replicated in the root project's package.json file.
You can look at the `script` block to review the commands available via `npm run ...`.  See next section below.

### Available Scripts

The `scripts` block in the root `package.json` provides the following commands:

- **start-app**: Starts both the frontend and backend servers concurrently for development.
- **start-client**: Starts the React development server located in the `client` directory.
- **start-server**: Starts the FastAPI backend server using `uvicorn`.
- **test-client**: Runs unit and integration tests for the React frontend.
- **test-server**: Runs unit and integration tests for the FastAPI backend using `pytest`.
- **lint**: Runs linting tools for both frontend and backend code to ensure code quality.
- **build-client**: Builds the React frontend for production.
- **clean**: Cleans up temporary files and build artifacts from the project.

Refer to the `package.json` file for the exact implementation of these commands.

### Database

1. Ensure MongoDB is running locally or provide a connection string in the environment variables.

    As an example, the following could be set up in your ./server/env file.

    ```bash
    # .env file 
    JWT_SECRET=shared_jwt_secret
    MONGO_URL=mongodb://localhost:27017
    MONGO_USERNAME=""
    MONGO_PASSWORD=""
    MONGO_DBNAME="exampleDB"
    ```

2. Seed the database if necessary using scripts in the `database` folder.

### Database Script Execution (SEEDING)

from the `server` directory execute the following in terminal with python virtual environment
activated.

- `python -m app.seeds.createDB` : creates the exampleDB database
- `python -m app.seeds.cleanDB` : removes all data and collections from database
- `python -m app.seeds.seed` : seeds the User model of the database

### graphQL and REST APIs

- both graphQL and REST APIs are available in this application
- to view graphQL playground using Ariadne (the python equivalent of Apollo),
      - you can start the server side directly from the root folder with
      - `npm run start-server`, then use a browser and browse to
      - `http://localhost:8000/graphql` to see the `araidne playground` which is
      the same thing as the *Apollo Playground*
- the resolvers, queries and mutations are found in the ./server/graphql folder.

![alt text](./docs/images/ariadne-preview.png)

- to use REST API, The vite config server is defined to send requests through
  - `http://localhost:8000/api` ; a test GET Request is available through
    `http://localhost:8000/api/hello` and is used in the sample react component `HelloFromServer.tsx`

## Testing

1. Navigate to the `tests` directory:

    ```bash
    cd ./server/tests
    ```

2. Run the test suite:

    ```bash
    # navigate to root project folder first 
    # if you are not there already, then

    PYTHONPATH=server pytest server/tests
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
