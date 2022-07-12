

let dataServer;
let pubKey = "pub-c-6f13f86f-1373-45d0-8d30-ebbea8f73496";
let subKey = "sub-c-5c7c93ad-42b7-4af3-9cce-e78ea25ba5c2";
let secretKey = "sec-c-ZmZjMTE2NWEtNzE3OS00ZWUwLWFiOGMtN2NlNDlkZDRkYmIy";

let channelName = "messageHistory";

let you;

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

    sendTheMessage();
    fetchMessages();

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
      drawMessages(response.channels.messageHistory);
    }
  );
   
}

function drawMessages(messageHistory) {

  console.log("in draw messages");
  background(255);
  textSize(80);
  text(messageHistory.length + " messages retrieved", windowWidth/2 , windowHeight/2);

}
  // PubNub logic below
function sendTheMessage() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish({
    channel: channelName,
    message: {
      messageText: "Entering the page"
    },
  });

}

function readIncoming(inMessage) {
  console.log(inMessage);
  fetchMessages();

}
