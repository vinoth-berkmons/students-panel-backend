# University Student Admin Panel


## Design Doc
you can access the design doc [here](./docs/Design.md)

## Run the Application

# Step 1:
    Please make sure you have change the sample.env file to .env
    Please mention the mongo credentials in .env

# Step 2: 
    If you don't have nodejs and npm in your system please install  [Node >= 14.0.0 and npm >= 5.6](https://nodejs.org/en/)

# Step 3:
    Run the following commands to migrate data to the DB
    
    - In root folder

        `
        node migrations/courses.js
        node migrations/students.js
        node user.js
        `
# Step 4:
    Run the following commands to run the backend App:

    - In root folder
        `
            ## npm install
            ## npm start
        `





The page will reload if you make edits.
You will also see any lint errors in the console.
