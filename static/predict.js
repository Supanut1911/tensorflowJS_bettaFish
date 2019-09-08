$("#image-selector").change(function () {
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();
    }
    let file = $("#image-selector").prop("files")[0];
    reader.readAsDataURL(file);
    console.log(file)
}); 

var done = false

let model;
(async function () {
    model = await tf.loadModel("http://localhost:9999/tfjs-models/Betta/model.json");
    $(".progress-bar").hide();
})();

$('#predict-button').click(async function(){
    console.log("stuck1")
    let image = $("#selected-image").get(0);
    console.log("stuck2")
    let tensor = await tf.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        // .sub(meanImageNetRGB)
        .reverse(2)
        .expandDims();

        console.log("stuck3")
    let predictions = await model.predict(tensor).data();
    console.log(">>>",predictions)
    let top5 = Array.from(predictions)
        .map(function (p,i){
            return {
                probability: p,
                className: IMAGENET_CLASSES[i]
            }
        }).sort(function (a,b){
            return b.probability - a.probability
        }).slice(0,1)
        console.log("stuck5")
    $("#prediction-list").empty();
    top5.forEach(function (p) {
        // $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
        $("#prediction-list").append(`<li>${p.className}</li>`);
    });

})