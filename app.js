
var _ = require('lodash');
var MongoClient = require('mongodb').MongoClient;
// mongo url
var url = "mongodb://127.0.0.1:27017/";

 console.log("***********************script start************************");

MongoClient.connect(url, function(err, db) {
  if (err){
    console.log("Sorry unable to connect to MongoDB Error");
  }else{
    console.log("MongoDB connected...");
    // mongodb name
    var dbo = db.db("iebes_db")
    // specify collection you targeting
    var supportingDocCollections = dbo.collection("supportingdocument");
      
    supportingDocCollections.find({}).toArray(function(err,docs){
      if(err){
        console.log("Error unable to pull all documents");
      }else{
         console.log("successfully pull all documents...");
        //  console.log(docs);
        docs.forEach(doc => {
          //Your logic to be executed for each and every documents

          var checkStr ="http://41.76.213.201:3000";
          var isValidLink = _.startsWith(doc.documentstr,checkStr);
           // console.log("test",isValidLink);
          if(isValidLink){
             var strImage = doc.documentstr;
            var stringLength = checkStr.length;
            var subUrl = strImage.substring(stringLength, strImage.length); 
            // console.log("subUrl",subUrl);
            var newImage = "https://iebes-api.iebes.co.za"+ subUrl;
            console.log("NewImage",newImage);

            supportingDocCollections.updateOne({_id:doc._id},{ $set:{documentstr: newImage}},function(err, res){
            
                if(err){
                    console.log(err);
                  console.log("Error updating records id-->"+doc._id)
                }else{
                  console.log("Success updated record id-->"+doc._id)
                }
              })
          }


          var checkStr2 ="http://41.76.213.201:5000";
          var isValidLink2 = _.startsWith(doc.documentstr,checkStr2);
            // console.log("test",isValidLink);
          if(isValidLink2){
             var strImage = doc.documentstr;
            var string2Length = checkStr2.length;
            var subUrl = strImage.substring(string2Length, strImage.length); 
            //console.log("subUrl2",subUrl);
            var newImage = "https://iebes-api.iebes.co.za"+ subUrl;
            console.log("NewImage2",newImage);

            supportingDocCollections.updateOne({_id:doc._id},{ $set:{documentstr: newImage}},function(err, res){

                if(err){
                  console.log(err)
                  console.log("Error updating records id-->"+doc._id)
                }else{
                  console.log("Success updated record id-->"+doc._id)
                }
              })
          }
        
        });
      }
      // close mongo db
      db.close();
    });

  }

});

// console.log("***********************script end************************");
