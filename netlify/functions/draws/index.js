const { v4: uuidv4 } = require('uuid');
const { default: mongoose } = require("mongoose");

const jwt = require('jsonwebtoken');
const { Draw } = require('./schema');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

const uri = "mongodb+srv://jerkjoe:UkAoBt4swcR5YtJ7@cluster0.t5mtc.mongodb.net/kanban?retryWrites=true&w=majority";


const addNewDraw = async ({ title, elements, description = '' }) => {

  const newDraw = new Draw({
    id: uuidv4(),
    elements: JSON.stringify(elements),
    title,
    description
  })

  await newDraw.save()
}

const updateDraw = async (id, updatedDraw) => {

  console.log(updatedDraw)
  await Draw.findOneAndUpdate({
    id
  }, {
    id,
    elements: JSON.stringify(updatedDraw.elements),
    title: updatedDraw.title,
    description: updatedDraw.description
  })
}


// const addNewTask = async (task) => {
//   console.log(task)
//   const newTask = new Task(task.data)

//   await newTask.save()
// }

exports.handler = async function (event, context) {
  // your server-side functionality
  try {
    const db = await mongoose.connect(uri)







    const { httpMethod } = event

    const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
    const segments = path.split('/').filter(e => e)

    switch (httpMethod) {
      case 'GET':
        console.log('this is get', segments.length)
        /* GET /.netlify/functions/api */
        // addNewColumn('To do')
        if (segments.length === 0) {
          const draws = await Draw.find()

          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              draws
            })
          };
        }


        if (segments.length === 1) {
          console.log(segments[0])
          const draw = await Draw.findOne({
            id: segments[0]
          })

          console.log(draw)

          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              draw
            })
          };
        }

        break;

      case 'POST':
        console.log(123123123, typeof event.body)

        await addNewDraw(JSON.parse(event.body).data)
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
          const updatedDraw = JSON.parse(event.body).data

          await updateDraw(id, updatedDraw)

          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              msg: 'update success'
            })
          }
        }
        break

      // case 'DELETE':
      //   if (segments.length === 1) {
      //     removeTask(segments[0])

      //     return {
      //       statusCode: 200, // <-- Important!
      //       headers,
      //       body: JSON.stringify({
      //         msg: 'delete success'
      //       })
      //     }
      //   } else {
      //     return {
      //       statusCode: 404, // <-- Important!
      //       headers,
      //       body: JSON.stringify({
      //         msg: 'not found'
      //       })
      //     }
      //   }
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
