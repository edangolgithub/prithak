# Prithak Fullstack Application

This project is a full-stack application with a React frontend, NestJS backend, and a MySQL database running in Docker containers.

## Project Structure
```
/project-root
├── /backend
├── /frontend
├── /dbscript
├── /dbvol
├── docker-compose.yml
├── README.md
```

## Prerequisites

- Docker: Install Docker from [here](https://docs.docker.com/get-docker/).
- Docker Compose: Install Docker Compose from [here](https://docs.docker.com/compose/install/).

## Setting Up the Application

### 1. Clone the Repository

Clone the repository to your local machine:
copy code below and paste in your terminal and hit ENTER.
```bash
git clone https://github.com/edangolgithub/prithak.git
cd prithak
docker-compose up

if there is issue with dbvol folder run=> sudo chown -R $USER $PWD

```
### Access the Application

* **Frontend**: [http://localhost:81](http://localhost:81)
* **Backend**: [http://localhost:3000](http://localhost:3000)
* **phpMyAdmin**: [http://localhost:8080](http://localhost:8080) (use `root` and `secrET123#@` as username and password)

### Application Details

#### Database Tables:

* The application has two tables, `user` and `task`.
* The `user` table stores user information, including email, password, and role.
* The `task` table stores task information, including title, description, and id.

#### Authentication:

* The application has an authentication module that uses JWT (JSON Web Tokens) for authentication.
* When a user logs in, the backend generates a JWT token that contains the user's role (admin or user).
* The frontend sends this token in the Authorization header for authenticated requests.
* Tasks routes and pages are only accessible after user authentication.
* New users can be regisrtered and roles can be assigned(To avoid too much complication, I left it like this).
* Only users with the role of admin can delete tasks. The backend checks the role in the JWT token before allowing the delete operation.

#### Validation:

* Adding Task has validation implemented using formik and Yup.


#### User Management:

* The application allows users to register and login.
* Passwords are stored in plain text(To save development time, I left it like this).

#### Task Management:

* Users can create, read, update, and delete tasks.
* Tasks are displayed in a paginated list on the frontend.

