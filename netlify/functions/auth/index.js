const { v4: uuidv4 } = require('uuid');
const { default: mongoose } = require('mongoose');
const { Column } = require('../tasks/Schema');
const { User } = require('./UserSchema');
const cookie = require('cookie')
const jwt = require('jsonwebtoken');


const hour = 3600000
const tenWeeks = 70 * 24 * hour


const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

const uri =
  'mongodb+srv://jerkjoe:UkAoBt4swcR5YtJ7@cluster0.t5mtc.mongodb.net/kanban?retryWrites=true&w=majority';

const SECRET = 'b83f27a08cc039ab1a700d66c8e2ca6b1eb31b651f09f880e899348fb514899354cb81b275668480ab9b604eda0c4b74f595faa99bd25c6114fc078ff6418458'
function generateAccessToken(username) {
  return jwt.sign({ username }, SECRET, { expiresIn: '90d' });
}

const addNewUser = async ({ username, password }) => {
  const newUser = new User({
    username,
    password,
    id: uuidv4(),
  });

  const res = await User.find({
    username
  })
  console.log(res)

  if (res.length > 0) throw new Error('User Already Exists')

  await newUser.save();

  return generateAccessToken(username)
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
  console.log('here')
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
        console.log('adding new user')
        const token = await addNewUser(JSON.parse(event.body).data);
        console.log(token)
        const myCookie = cookie.serialize('access_token', token, {
          // secure: true,
          httpOnly: true,

          path: '/',
          maxAge: tenWeeks,
        })
        console.log(myCookie)
        return {
          statusCode: 200, // <-- Important!
          headers: {
            ...headers,
            'Set-Cookie': myCookie,
          },
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
  } catch (err) {

    return {
      statusCode: 200, // <-- Important!
      headers,
      body: JSON.stringify({
        msg: err.message,
      }),
    };
  }
};