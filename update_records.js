
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
    var docCollections = dbo.collection("candidates");
      
    docCollections.find({}).toArray(function(err,docs){
      if(err){
        console.log("Error unable to pull all documents");
      }else{
         console.log("successfully pull all documents...");
        //  console.log(docs);
        docs.forEach(doc => {
          //Your logic to be executed for each and every documents

             var category = _.capitalize(doc.category);

             docCollections.updateOne({_id:doc._id},{ $set:{category}},function(err, res){
            
                if(err){
                    console.log(err);
                  console.log("Error updating records id-->"+doc._id)
                }else{
                  console.log("Success updated record id-->"+doc._id)
                }
              })
          
        
        });
      }
      // close mongo db
      db.close();
    });

  }

});

// console.log("***********************script end************************");