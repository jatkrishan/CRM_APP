  var Client = require('node-rest-client').Client;

    var client = new Client();

    module.exports = (ticketId, subject, content, emailIds, requester) =>{
        var reqBody = {
            ticketId: ticketId,
            subject: subject,
            content: content,
            recepientEmails: emailIds,
            requester: requester
        }

        var args  = {
            data: reqBody,
            headers: {"Content-Type": "application/json"}
        }

      client.post("http://localhost:7777/notifaction/api/v1/notifaction" , args ,async function (data, response) {

      console.log(data)

      })

    }