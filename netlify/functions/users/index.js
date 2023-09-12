const axios = require('axios')
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
          console.log('zksync.com is here')
          axios.post('https://app.viral-loops.com/api/v3/campaign/participant/flag', {
            "participants": [{ "email": email }]
          }, {
            headers: {
              "Accept": "application/json",
              "Apitoken": "k6Bd3pxyRcwYYvd10f76jEUvP0Q",
              "Content-Type": "application/json"
            }
          }).then(res => {
            console.log('res', res.data)
          }).catch(e => {
            console.log('err code', e.response.status)
          })
        }
      }
      return {
        statusCode: 200, // <-- Important!
        headers,
        body: JSON.stringify({
          msg: 'success'
        })
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