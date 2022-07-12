

let dataServer;
let pubKey = "pub-c-6f13f86f-1373-45d0-8d30-ebbea8f73496";
let subKey = "sub-c-5c7c93ad-42b7-4af3-9cce-e78ea25ba5c2";
let secretKey = "sec-c-ZmZjMTE2NWEtNzE3OS00ZWUwLWFiOGMtN2NlNDlkZDRkYmIy";

let channelName = "parameters";

let you;

let history;

var url = new URL(window.location.href);
let params = url.searchParams.get("params");
console.log(params);

if (params == null) {

  params = false;

}

function preload() { 

  // logic to create a random UUID
    you = random(0,1000000); 
    console.log(you);
    you = int(you);
    console.log(you);
    you = you.toString();
  
}


function setup() {

    createCanvas(windowWidth, windowHeight);

    dataServer = new PubNub({
      subscribeKey: subKey,
      publishKey: pubKey,
      uuid: you,
      secretKey: secretKey,
      heartbeatInterval: 0,
    });

     // listen for messages coming through the subcription feed on this specific channel. 

    dataServer.subscribe({ channels: [channelName] });
    dataServer.addListener({ message: readIncoming });
   
    textAlign(CENTER);
    textSize(40);

    sendTheMessage();
}
  
function draw() {
 
if (params == false) {
  text("You did not add a parameter!", windowWidth/2, windowHeight/2);
} else {
  text("Message in parameter sent :)", windowWidth/2, windowHeight/2);
}

}

function fetchMessages() {
console.log("fetching");

  dataServer.fetchMessages(
    {
        channels: [channelName],
        end: '15343325004275466',
        count: 100
    },
    (status, response) => {
    // console.log(response.channels.history);
      drawMessages(response.channels.history);
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");

  console.log(messageHistory);
  textSize(80);
  for (let i = 0; i < messageHistory.length; i++) {
    
      console.log(messageHistory[i]);
      text(messageHistory[i].message.messageText, windowWidth/2, 100 * (i+1));

  }

}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: params,
  });

}

function readIncoming(inMessage) {
  console.log(inMessage);
}
