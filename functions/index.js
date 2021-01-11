const functions = require("firebase-functions");
const myrequest = require("request");
const admin = require("firebase-admin");

admin.initializeApp();

exports.twodapis = functions.https.onRequest((request, response) => {
  myrequest("", function(error, res, body) {
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
