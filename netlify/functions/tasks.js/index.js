exports.handler = async function (event, context) {
  // your server-side functionality


  const { httpMethod } = event

  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '')
  const segments = path.split('/').filter(e => e)

  switch (httpMethod) {
    case 'GET':
      /* GET /.netlify/functions/api */
      if (segments.length === 0) {
        return []
      }

      break;

    default:
      break;
  }

};
