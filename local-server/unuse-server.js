const tf = require('@tensorflow/tfjs');
var express = require('express');
var multer = require('multer');
const {createCanvas, loadImage} = require('canvas')
const fetch = require("node-fetch");
var upload = multer({dest: 'uploadss/'})
// var upload = multer()
var app = express();
var canvas = createCanvas(224,224)
var ctx = canvas.getContext('2d')
app.get('/test',(req,res)=>{
          const img = new Image();
          img.src = src;
          img.onload = () => resolve(tf.fromPixels(img));
          img.onerror = (err) => reject(err);
})
app.get('/:path',(req,res)=>{
    res.sendFile(req.params.path,{root:'uploadss'})
    
})
app.post('/upload',upload.single('files'), function(req, res, next) {
    console.log(req.file)

    model = tf.loadLayersModel("http://localhost:5555/tfjs-models/VGG16/model.json");

    let image = req.file
   
    let imageX = loadImage(image)


    let tensor = tf.node.decodeImage(imageX)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .expandDims();
    
    
    let predictions =  model.predict(tensor).data();
    let top5 = Array.from(predictions)
            .map(function (p,i){
                return {
                    probability: p,
                    className: IMAGENET_CLASSES[i]
                }
            }).sort(function (a,b){
                return b.probability - a.probability
            }).slice(0,5)
            res.send(top5)
    })
    
    

app.listen(5555, function() {
	console.log('App running on port 5555');
});

