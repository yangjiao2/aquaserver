
Parse.Cloud.define('hello', function(req, res) {
  res.success('Hi');
});


Parse.Cloud.define("sendAnnouncement", function(request, response) {
  var msg = request.params.message;
  Parse.Push.send({
    where: {
      "deviceType": { "$in": [ "android"  ]  }
    },
    data: {
      alert: msg
    }
  }, {
    success: function() {
      // Push was successful
      response.success("sendAnnouncement sent");
    },
    error: function(error) {
      // Handle error
      response.error("error with sendAnnouncement: " + error);
    },
    useMasterKey: true
  });
});

// Parse.Push.send({
//   where: {
//     "deviceType": { "$in": [ "ios",  "android"  ]  }
//   },
//   data: {
//     "title": "Ant-man",
//     "alert": "This is awesome. It is awesome."
//   }
// }, { useMasterKey: true });


Parse.Cloud.afterSave("Report", function(request,response) {


  //
  // var pushQuery = new Parse.Query(Parse.Installation);
  // targeting iOS devices only

  console.log("received!");
  Parse.Push.send({
    where: new Parse.Query(Parse.Installation),
    data: {
      alert: "Message: We recieved a water leakage warning in your area!"
    }
  }, {
    useMasterKey: true
  });
});

// var location = request.object.get("location");
// var user = request.object.get("user");
// var reportId = report.id;
// var report = new Parse.Query("Report");
//
//
// if (!request.object.createdAt) {
//   var report = new Parse.Query("Report");
//   report.include("user");
//   report.limit(30);
//   report.find({
//     success: function(results) {
//       var pushUsers = [];
//       var pushUserIds = [];
//
//       for (var i = 0; i < results.length; i++) {
//         var object = results[i];
//         // if (!(user.objectId === object.get("user").objectId)) {
//         //   if (pushUserIds.indexOf(object.get("user").objectId) == -1) {
//         //     pushUserIds.push(object.get("user").objectId);
//         //     pushUsers.push(object.get("user"));
//         //   }
//         // }
//
//         pushUserIds.push(object.get("user").objectId);
//         pushUsers.push(object.get("user"));
//       }
//
//       var pushQuery = new Parse.Query(Parse.Installation);
//       pushQuery.containedIn("user", pushUsers);
//
//       Parse.Push.send({
//         where: pushQuery, // Set our Installation query
//
//         data: {
//           alert: "We found a nearby water leakage. Let us know more!"
//         }
//       });
//     }
//   })
// }
// });

//
//
// if (!request.object.createdAt) {
//   report.fetch({
//     success: function(report) {
//       var query = new Parse.Query(Report);
//       // query.greaterThan("report", report);
//       // query.lessThan();
//       query.include("user");
//       query.limit(30); // limit to at most 10 results
//       query.find({
//         success: function(results) {
//           var pushUsers = [];
//           var pushUserIds = [];
//
//           for (var i = 0; i < results.length; i++) {
//             var object = results[i];
//             if (!(author.id === object.get("user").id)) {
//               if (pushUserIds.indexOf(object.get("user").id) == -1) {
//                 pushUserIds.push(object.get("user").id);
//                 pushUsers.push(object.get("user"));
//               }
//             }
//           }
//           console.log("printing comment pushUsers");
//           console.log(pushUserIds);
//
//
//
//           var pushQuery = new Parse.Query(Parse.Installation);
//           pushQuery.containedIn("user", pushUsers);
//
//           Parse.Push.send({
//             where: pushQuery, // Set our Installation query
//
//             data: {
//               alert: "New Comment",
//               reportObjectID: reportId
//             }
//           }, {
//             success: function() {
//               // Push was successful
//             },
//             error: function(error) {
//               // Handle error
//             }
//           });
//           response.success();
//
//         },
//
//         error: function(error) {
//           console.log("Got an error " + error.code + " : " + error.message);
//         }
//       });
//     }
//   });
// }
// response.success();
