const router = require("express").Router();
const ObjectID = require("mongodb").ObjectId;
const db = client.db(lcredux);
const bucket = new mongodb.GridFSBucket(db, { bucketName: 'songBucket' });



//GET - get all songs
//http://localhost:5002/api/v1/redux/get/all/songs
router.get("http://localhost:5002/api/v1/redux/get/all/songs", async(req,res)=>{
    if(bucket){
        const cursor = bucket.find();
        return res.status(200).send(cursor)
    }else{
        return res.status(400).send({})
    }
})


//POST - upload a song
//http://localhost:5002/api/v1/redux/new/song/:song
router.post("http://localhost:5002/api/v1/redux/new/song/:song", async(req,res)=>{
    const newSong = req.params.song
    fs.createReadStream(newSong).pipe(bucket.openUploadStream(newSong, {
        chunkSizeBytes: 1048576,
        metadata: {
            field: 'myfield',
            value: 'myvalue'
        }
    }))

})



















module.exports = router;