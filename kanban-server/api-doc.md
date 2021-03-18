# API Document

## <u>Register User</u>

Make a new user

- ### Url

  `/register`

- ### Method

  `POST`

- ### Url Params

  ##### Required: `none`

- ### Data Params

  ```javascript
  {
  	email : <String> (Required)
  	password : <String> (Required)
  }
  ```

- ### Succes Response

  #### `code: 201`

  ```javascript
  {
    message: 'Succes create a user'
    id: (user.id) <Integer>
    email: (user.email) <String>
  }
  ```

- ### Error Response

  #### `code: 400`

  ```javascript
  {
    message: "Invalid format of email",
  }
  ```

  **OR**

  ```javascript
  {
    message: "Password must be more than 6 characters long";
  }
  ```

  **OR**

  ```javascript
  message: "Email must be filled";
  ```

<br><br>

## <u>Login User</u>

Login a user to aplication

- ### Url

  `/login`

- ### Method

  `POST`

- ### Url Params

  ##### Required: `none`

- ### Data Params

  ```javascript
  {
  	email : <String> (Required)
  	password : <String> (Required)
  }
  ```

- ### Succes Response

  `Get an access token`

  #### `code: 200`

  ```javascript
  {
    access_token: <String>
  }
  ```

- ### Error Response

  #### `code: 400`

  ```javascript
  {
    message: "Wrong Email or Password";
  }
  ```

  #### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```

<br><br>

## <u>Show All Task</u>

Showing all Task from database

- ### Url

  `/tasks`

- ### Method

  `GET`

- ### Url Params

  ##### Required: `none`

- ### Data Params

  ```javascript
  None;
  ```

- ### Succes Response

  `Get all tasks from database for user logged in`

  #### `code: 200`

  ```javascript
  {
    tasks:
    [
      {
       id: (task id) <Integer>,
       title: (task title) <String>,
       description: (task desc) <String>,
       UserId: (user id) <Integer>
  	},
      {
       id: 1,
       title: Makan,
       description: Sarapan pagi,
       UserId: 1
    	}
    ]
  }
  ```

- ### Error Response

  #### `code: 500`

  ```javascript
  {
    message: "Internal server Error";
  }
  ```

<br><br>

## <u>Create Task</u>

Make a Task

- ### Url

  `/tasks`

- ### Method

  `POST`

- ### Url Params

  ##### Required: `none`

- ### Data Params

  ```javascript
  {
   title: <String> (Required)
   category: <String> (Required)
   description: <String>
  }
  ```

- ### Succes Response

  `Success create a Task`

  #### `code: 201`

  ```javascript
  {
   Task:
    {
      id: (task id) <Integer>
      title: (task title) <String>
      category: (task category) <String>
      description: (task description) <String>
    }
  }
  ```

- ### Error Response

  #### `code: 400`

  ```javascript
  {
    message: "Title must be filled";
  }
  ```

  **OR**

  ```javascript
  {
    message: "Category must be filled";
  }
  ```

  #### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```

<br><br>

## <u>Update Task By Id</u>

Update a Task by his Id

- ### Url

  `/tasks/:id`

- ### Method

  `PUT`

- ### Url Params

  ##### Required: `id:<Integer>`

- ### Data Params

  ```javascript
  {
    id: <Integer> (Required),
    title: <String>,
    category: <String>,
    description: <String>
  }
  ```

- ### Succes Response

  `Updated a Task By Id`

  #### `code: 200`

  ```javascript
  {
   Task:
    {
      id: (task id) <Integer>,
      title: (task title) <String>,
      category: (task category) <String>,
      description: (task description) <String>
    }
  }
  ```

- ### Error Response

  #### `code: 404`

  ```javascript
  {
    message: "Task not found";
  }
  ```

  #### `code: 400`

  ```javascript
  {
    message: "Title must be filled";
  }
  ```

  **OR**

  ```javascript
  {
    message: "Category must be filled";
  }
  ```

  #### `code:401`

  ```javascript
  {
    message: "Not authorized";
  }
  ```

  #### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```

<br><br>

## <u>Update Category Task By Id</u>

Update a Category of Task by his Id

- ### Url

  `/tasks/:id`

- ### Method

  `PATCH`

- ### Url Params

  ##### Required: `id:<Integer>`

- ### Data Params

  ```javascript
  {
    id: <Integer> (Required)
    category: <String> (Required)
  }
  ```

- ### Succes Response

  `Updated a category Task By Id`

  #### `code: 200`

  ```javascript
  {
   Task:
    {
      id: (task id) <Integer>,
      title: (task title) <String>,
      category: (task category) <String>,
      description: (task description) <String>
    }
  }
  ```

- ### Error Response

  #### `code: 404`

  ```javascript
  {
    message: "Task not found";
  }
  ```

  #### `code: 400`

  ```javascript
  {
    message: "Title must be filled";
  }
  ```

  **OR**

  ```javascript
  {
    message: "Category must be filled";
  }
  ```

  #### `code:401`

  ```javascript
  {
    message: "Not authorized";
  }
  ```

  #### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```

### <br><br>

## <u>Delete a Task By Id</u>

Delete a Task by his Id

- ### Url

  `/tasks/:id`

- ### Method

  `DELETE`

- ### Url Params

  ##### Required: `id:<Integer>`

- ### Data Params

  ```javascript
  {
    id: <Integer> (Required)
  }
  ```

- ### Succes Response

  `Delete a Task from database`

  #### `code: 200`

  ```javascript
  message: "Success delete a task";
  ```

- ### Error Response

  #### `code: 404`

  ```javascript
  {
    message: "Task not found";
  }
  ```

  #### `code:401`

  ```javascript
  {
    message: "Not authorized";
  }
  ```

  #### `code: 500`

  ```javascript
  {
    message: "Internal server error";
  }
  ```
