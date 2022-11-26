const { v4: uuidv4 } = require('uuid');
const { default: mongoose } = require('mongoose');
const { Column } = require('../tasks/Schema');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
};

const uri =
  'mongodb+srv://jerkjoe:UkAoBt4swcR5YtJ7@cluster0.t5mtc.mongodb.net/kanban?retryWrites=true&w=majority';

const addNewColumn = async ({ colName, id }) => {
  const newCol = new Column({
    title: colName,
    id
  });

  await newCol.save();
};

const updateColumn = async (id, updatedCol) => {
  await Column.findOneAndUpdate(
    {
      id,
    },
    {
      id,
      ...updatedCol,
    }
  );
};

const removeColumn = async (id) => {
  await Column.findOneAndDelete({
    id
  })
}


exports.handler = async function (event, context) {
  // your server-side functionality
  try {
    const db = await mongoose.connect(uri);

    const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
    const segments = path.split('/').filter((e) => e);

    switch (event.httpMethod) {
      case 'OPTIONS':
        return {
          statusCode: 200, // <-- Important!
          headers,
          body: JSON.stringify({
            msg: 'success'
          })
        }
      case 'GET':
        const columns = await Column.find();

        return {
          statusCode: 200, // <-- Important!
          headers,
          body: JSON.stringify({
            data: {
              columns,
            },
          }),
        };
      case 'POST':
        await addNewColumn(JSON.parse(event.body).data);

        return {
          statusCode: 200, // <-- Important!
          headers,
          body: JSON.stringify({
            msg: 'add success',
          }),
        };

      case 'DELETE':
        if (segments.length === 1) {
          removeColumn(segments[0])

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

      case 'PUT':
        if (segments.length === 1) {
          const updatedColumn = await JSON.parse(event.body).data;
          await updateColumn(segments[0], updatedColumn)


          return {
            statusCode: 200, // <-- Important!
            headers,
            body: JSON.stringify({
              msg: 'add success',
            }),
          };
        }

        break
      default:
        break;
    }
  } catch (err) { }
};
