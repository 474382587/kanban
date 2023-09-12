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