const functions = require("firebase-functions");
const myrequest = require("request");
const admin = require("firebase-admin");

admin.initializeApp();

exports.twodapis = functions.https.onRequest((request, response) => {
  myrequest("http://myanmar2d3d.xyz/my2d/live.php?fbclid=IwAR1aQ0OK84LgqlZU9A8GNLER7PJNF3M0uqLN16MchvjhvzFZHgU25QcHHzM", function(error, res, body) {
    if (res.statusCode == 200) {
      admin.firestore().collection("2d3d").doc("update")
          .set({original: ""+body})
          .then(() => {
            response.send("data is updated to firestore");
          })
          .catch(() =>{
            response.send("error");
          });
    } else {
      response.send("error occur" + error);
    }
  });
});
