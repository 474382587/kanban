const fetch = require('node-fetch')
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
};


exports.handler = async function (event, context) {
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
      if (segments.length === 1) {
        console.log(segments[0])
        const email = segments[0]
        console.log(email)
        console.log(' ====================== ')
        if (email.includes('zksync.com')) {
          console.log('zksync.com is here', email)
          console.log('flagging', email)
          const res = await fetch('https://app.viral-loops.com/api/v3/campaign/participant/flag', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Apitoken": "k6Bd3pxyRcwYYvd10f76jEUvP0Q",
            },
            body: JSON.stringify({ "participants": [{ "email": email }] })
          })

          console.log('flagging', email)
          const data = await res.json()

          console.log('done!')
          return {
            statusCode: 201, // <-- Important!
            headers,
            body: JSON.stringify({
              msg: 'success with flagging',
              data
            })
          }
        }
      } else {
        return {
          statusCode: 201, // <-- Important!
          headers,
          body: JSON.stringify({
            msg: 'success'
          })
        }
      }
    case 'POST':
      const data = JSON.parse(event.body).data


      console.log('data data data')
      console.log(data)

      return {
        statusCode: 200, // <-- Important!
        headers,
        body: JSON.stringify({
          data
        }),
      };

    default:
      return {
        statusCode: 200, // <-- Important!
        headers,
        body: JSON.stringify({
          msg: 'success'
        })
      }
  }
}