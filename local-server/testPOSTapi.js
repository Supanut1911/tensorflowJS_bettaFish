const tf = require('@tensorflow/tfjs');
const {createCanvas, loadImage, Image} = require('canvas')

function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(tf.fromPixels(img));
      img.onerror = (err) => reject(err);
    });
  }


  console.log(loadImage('http://localhost:5555/067c58d924b736a3c5d465ac4328e765'))