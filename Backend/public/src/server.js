const express= require("express");
const mongodb=require("mongodb").MongoClient;
const app=express();
const cors=require("cors");
const constr="mongodb://127.0.0.1:27017";
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/get-admin", async(req,res)=>{
 try{
      const client= await mongodb.connect(constr);
      const database= client.db("Video_Library");
      const collection= database.collection("tbladmin");
      collection.find({}).toArray().then(document=>{
        res.json(document);  
      })
 }
 catch(error){
   res.status(500).json({msg:error + "server error"});   
 }
});

 app.get("/get-videos", async(req,res)=>{
  try{
       const client= await mongodb.connect(constr);
       const database= client.db("Video_Library");
       const collection= database.collection("tblvideo");
       collection.find({}).toArray().then(document=>{
         res.json(document);  
       })
  }
  catch(error){
    res.status(500).json({msg:error + "server error"});   
  }
 });

 app.get("/get-video/:id", async(req,res)=>{
  try{
       const client= await mongodb.connect(constr);
       const database= client.db("Video_Library");
       const collection= database.collection("tblvideo");
       collection.findOne({videoid:parseInt(req.params.id)}).then(document=>{
         res.json(document);  
       })
  }
  catch(error){
    res.status(500).json({msg:error});   
  }
 });

 app.get("/filter-video/:categoryid", async(req,res)=>{
  try{
       const client= await mongodb.connect(constr);
       const database= client.db("Video_Library");
       const collection= database.collection("tblvideo");
       collection.find({categoryid:parseInt(req.params.categoryid)}).toArray().then(document=>{
         res.json(document);  
       })
  }
  catch(error){
    res.status(500).json({msg:error});   
  }
 });

 app.put("/edit-video/:id", async(req,res)=>{
  const video={
    videoid:parseInt(req.body.videoid),
    title:req.body.title,
    url:req.body.url,
    description:req.body.description,
    likes:parseInt(req.body.likes),
    dislikes:parseInt(req.body.dislikes),
    views:parseInt(req.body.views),
    categoryid:parseInt(req.body.categoryid),
    comments:req.body.comments
   } 
  try{
       const client= await mongodb.connect(constr);
       const database= client.db("Video_Library");
       const collection= database.collection("tblvideo");
       collection.updateOne({videoid:parseInt(req.params.id)},{$set:video}).then(document=>{
         res.json(document);  
       })
  }
  catch(error){
    res.status(500).json({msg:error + "server error"});   
  }
 });

 app.delete("/delete-video/:id", async(req,res)=>{
  try{
       const client= await mongodb.connect(constr);
       const database= client.db("Video_Library");
       const collection= database.collection("tblvideo");
       collection.deleteOne({videoid:parseInt(req.params.id)}).then(document=>{
         res.json(document);  
       })
  }
  catch(error){
    res.status(500).json({msg:error + "server error"});   
  }
 });
 app.post("/add-video", async(req,res)=>{
  const video={
    videoid:parseInt(req.body.videoid),
    title:req.body.title,
    url:req.body.url,
    description:req.body.description,
    likes:parseInt(req.body.likes),
    dislikes:parseInt(req.body.dislikes),
    views:parseInt(req.body.views),
    categoryid:parseInt(req.body.categoryid),
    comments:[req.body.comments]
   } 
  try{
   const client= await mongodb.connect(constr);
   const database= client.db("Video_Library");
   const collection=database.collection("tblvideo");
   collection.insertOne(video).then(document=>{
     res.status(200).json(document);
   })
  } 
  catch(error){
   res.status(400).json({error:'client side error'});
  }
 });

 app.get("/get-categories", async(req,res)=>{
  try{
       const client= await mongodb.connect(constr);
       const database= client.db("Video_Library");
       const collection= database.collection("tblcategory");
       collection.find({}).toArray().then(document=>{
         res.json(document);  
       })
  }
  catch(error){
    res.status(500).json({msg:error + "server error"});   
  }
 });

 app.post("/add-category", async(req,res)=>{
  const category={
   categoryid:parseInt(req.body.categoryid),
   categoryname:req.body.categoryname,
  } 
  try{
   const client= await mongodb.connect(constr);
   const database= client.db("Video_Library");
   const collection=database.collection("tblcategory");
   collection.insertOne(category).then(document=>{
     res.status(200).json(document);
   })
  } 
  catch(error){
   res.status(400).json({error:'client side error'});
  }
 });

 app.put("/edit-category/:id", async(req,res)=>{
  const category={
   categoryid:parseInt(req.body.categoryid),
   categoryname:req.body.categoryname,
  } 
  try{
   const client= await mongodb.connect(constr);
   const database= client.db("Video_Library");
   const collection=database.collection("tblcategory");
   collection.updateOne({categoryid:parseInt(req.params.id)},{$set:category}).then(document=>{
     res.status(200).json(document);
   })
  } 
  catch(error){
   res.status(400).json({error:'client side error'});
  }
 });


 app.delete("/delete-category/:id", async(req,res)=>{
  try{
   const client= await mongodb.connect(constr);
   const database= client.db("Video_Library");
   const collection=database.collection("tblcategory");
   collection.deleteOne({categoryid:parseInt(req.params.id)}).then(document=>{
     if(document){
      res.status(200).json(document);
     }
     else{
      res.send("Recored not found");
     }
   })
  } 
  catch(error){
   res.status(400).json({msg:error});
  }
 });
 app.get("/get-users", async(req,res)=>{
  try{
   const client= await mongodb.connect(constr);
   const database= client.db("Video_Library");
   const collection=database.collection("tblusers");
   collection.find({}).toArray().then(document=>{
    res.status(200).json(document);
   })
  } 
  catch(error){
   res.status(400).json({error:'client side error'});
  }
 });
 app.patch("/like/:videoid",(req,res)=>{
  const like={
    likes:parseInt(req.body.likes)
  }
  mongodb.connect(constr).then(client=>{
    let database=client.db("Video_Library");
    database.collection("tblvideo").updateOne({videoid:parseInt(req.params.videoid)},{$set:like}).then(response=>{
      res.status(200).json({msg:"like updated"})
    })
    .catch(error=>{
      res.status(404).json({msg:error})
    })
  })
 });

 app.patch("/dislike/:videoid",(req,res)=>{
  const like={
    dislikes:parseInt(req.body.dislikes)
  }
  mongodb.connect(constr).then(client=>{
    let database=client.db("Video_Library");
    database.collection("tblvideo").updateOne({videoid:parseInt(req.params.videoid)},{$set:like}).then(response=>{
      res.status(200).json({msg:"like updated"})
    })
    .catch(error=>{
      res.status(404).json({msg:error})
    })
  })
 })

 app.get("/get-user/:userid", async(req,res)=>{
  try{
   const client= await mongodb.connect(constr);
   const database= client.db("Video_Library");
   const collection= database.collection("tblusers");
   const document= await collection.findOne({userid:req.params.userid});
   if(document){
    res.status(200).json(document);
   }
   else{
    res.status(404).json({Error:"User not found"});
   }
  } 
  catch(error){
   res.status(400).json({error:'client side error'});
  }
 });

app.post("/register-user", async(req,res)=>{
 const user={
  userid:req.body.userid,
  username:req.body.username,
  password:req.body.password,
  email:req.body.email,
  mobile:req.body.mobile
 } 
 try{
  const client= await mongodb.connect(constr);
  const database= client.db("Video_Library");
  const collection=database.collection("tblusers");
  collection.insertOne(user).then(document=>{
    res.status(200).json(document);
  })
 } 
 catch(error){
  res.status(400).json({error:'client side error'});
 }
});



app.listen(8000,()=>{
    console.log("server created at post 8000");    
})