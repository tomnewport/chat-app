const Hapi = require('hapi');

const server = Hapi.server({
    host:'0.0.0.0',
    port:8000
});

var messages = [
{
  sender : "Andy",
  time : "2018-12-18T15:21:51.437Z",
  message : "🦎  + lizard"

},
{
  sender : "Leo",
  time : "2018-12-18T16:21:51.437Z",
  message : "🐳 + whale"
}
 ];

server.route(
  {
    'method': 'GET',
    path: '/messages',
    handler : function(){
      return messages
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
  }
)

server.route(
  {
    'method': 'POST',
    path: '/messages',
    handler : function(request){
      const newMessage = request.payload;
      messages.push(newMessage);

      return "okay"
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
  }
)
// Add a route
server.route({
    method:'GET',
    path:'/hello',
    handler:function(request,h) {

        return 'hello Alex';
    }
});

server.route({
    method:'POST',
    path:'/hello',
    handler:function(request,h) {

        return request["payload"]["hello"];
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
