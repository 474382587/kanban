const { v4: uuidv4 } = require('uuid');
const { default: mongoose } = require("mongoose");
const { Task, Column } = require('./Schema')
const jwt = require('jsonwebtoken');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

const uri = "mongodb+srv://jerkjoe:UkAoBt4swcR5YtJ7@cluster0.t5mtc.mongodb.net/kanban?retryWrites=true&w=majority";

// {
//   "isBase64Encoded": true|false,
//   "statusCode": httpStatusCode,
//   "headers": { "headerName": "headerValue", ... },
//   "multiValueHeaders": { "headerName": ["headerValue", "headerValue2", ...], ... },
//   "body": "..."
// }





const addNewTask = async (task) => {
  console.log(task)
  const newTask = new Task(task.data)

  await newTask.save()
}

const removeTask = async (id) => {
  await Task.findOneAndDelete({
    id
  })
}

const updateTask = async (id, updatedTask) => {
  console.log(updatedTask)
  await Task.findOneAndUpdate({
    id
  }, {
    id,
    ...updatedTask
  })
}

exports.handler = async function (event, context) {
  // your server-side functionality
  try {
    const db = await mongoose.connect(uri)







    const { httpMethod } = event

    const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
    const segments = path.split('/').filter(e => e)

    // console.log(event.headers)

    // parse cookie
    const { authorization } = event.headers

    if (!authorization || !authorization.split(' ')[1]) throw new Error('no access')
    const SECRET = 'b83f27a08cc039ab1a700d66c8e2ca6b1eb31b651f09f880e899348fb514899354cb81b275668480ab9b604eda0c4b74f595faa99bd25c6114fc078ff6418458'
    jwt.verify(authorization.split(' ')[1], SECRET, (err, user) => {
      if (err) {
        throw new Error('no access')
      }
      console.log(user)
    })



    switch (httpMethod) {
      case 'GET':
        console.log('this is get', segments.length)
        /* GET /.netlify/functions/api */
        // addNewColumn('To do')
        if (segments.length === 0) {
          const tasks = await Task.find()
          const columns = await Column.find()


          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              data: {
                tasks,
                columns
              }
            })
          };
        }

        if (segments.length === 1) {
          console.log(segments[0])
          const task = await Task.findOne({
            id: segments[0]
          })
          // 637318983e362aaff7513730
          // const task = await Task.findById(segments[0])

          console.log(task)

          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              data: {
                task
              }
            })
          };
        }

        break;

      case 'POST':
        console.log(123123123, typeof event.body)

        await addNewTask(JSON.parse(event.body))
        return {
          statusCode: 200, // <-- Important!
          headers,
          body: JSON.stringify({
            msg: 'success'
          })
        }
      case 'OPTIONS':
        return {
          statusCode: 200, // <-- Important!
          headers,
          body: JSON.stringify({
            msg: 'success'
          })
        }

      case 'PUT':
        if (segments.length === 1) {
          const id = segments[0]
          console.log()
          const updatedTask = JSON.parse(event.body).data

          await updateTask(id, updatedTask)

          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              msg: 'update success'
            })
          }
        }
        break

      case 'DELETE':
        if (segments.length === 1) {
          removeTask(segments[0])

          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              msg: 'delete success'
            })
          }
        } else {
          return {
            statusCode: 404, // <-- Important!
            headers,
            body: JSON.stringify({
              msg: 'not found'
            })
          }
        }
      default:
        break;
    }







  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        msg: error.message
      })
    }
  }




};
