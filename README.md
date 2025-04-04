# MERP Stack Mono Repo

Fullstack app using MongoDB, FastAPI, React, and Python

## Features

- **React**: Frontend library for building user interfaces.
- **Mantine**: React Component Framework
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

    python -m venv dev
    source dev/bin/activate  # On Windows: dev\Scripts\activate
    ```

3. Install dependencies (if you want to do it manually, see the note):

    ```bash
    pip install -r install.txt
    ```

4. Start the FastAPI server:

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
    npm start
    ```

note: These commands are replicated in the root project's package.json file.
You can look at the `script` block to review the commands available via `npm run ...`.  

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
2. Seed the database if necessary using scripts in the `database` folder.

### Database Script Execution

from the `server` directory execute the following in terminal with python virtual environment
activated.

* `pip -m app.seeds.createDB` : creates the exampleDB database
* `pip -m app.seeds.cleanDB` : removes all data and collections from database
* `pip -m app.seeds.seed` : seeds the User model of the database

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
