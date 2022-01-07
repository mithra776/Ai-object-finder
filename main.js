objects = [];
object_name = "";
staatus = "";

function setup()
{
    canvas = createCanvas(350 , 350);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(350 , 350);
    video.hide();
}

function draw()
{
    image(video , 0 , 0 , 480 , 380);
    if( staatus != "")
    {
        objectDetector.detect( video , gotResult);

        for(i = 0 ; i<objects.length ; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object detected";

             red = random(0 , 255);
             blue = random(0 , 255);
             green = random(0 , 255);

            fill(red , green , blue);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y );
            noFill();
            stroke(red , green , blue);
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
            
            if(objects[i].label == object_name)
    {
        video.stop();
        objectDetector.detect(gotResult);
        
        document.getElementById("object_status").innerHTML = object_name + "Found";
       
       synth = window.speechSynthesis;

       var utterThis = new SpeechSynthesisUtterance(object_name + "found");

      synth.speak(utterThis);
    }

    else
    {
        document.getElementById("status").innerHTML = object_name + " not found";
    }
        }
    }
} 

function start()
{
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

    


function modelLoaded()
{
    console.log("model loaded");
    staatus = true;
}

function gotResult(error , results)
{
    if(error)
    {
        console.error(error);
    }

    else
    {
        console.log(results);
        objects = results;
    }
}