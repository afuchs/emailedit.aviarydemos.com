var UPLOADS_DIR = './public/uploads';
var ROOT_URL = 'http://morning-tundra-1770.herokuapp.com';

var config = {
  sengridUser: process.env.SENDGRID_USER,
  sendgridKey: process.env.SENDGRID_PASSWORD,
  aviaryKey: process.env.AVIARY_KEY,
  aviarySecret: process.env.AVIARY_SECRET
}

var express = require('express')
  , port = process.env.PORT || 8000
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , config = require('./config')
  , Aviary = require('aviary').Aviary
  , SendGrid = require('sendgrid').SendGrid;

console.log('sanity');
console.log(config);

// Configure server
var app = express();
app.configure(function() {
  app.use(express.bodyParser({ keepExtensions: true, uploadDir:  UPLOADS_DIR }));
  app.use(express.static(path.join(__dirname, 'public')));
});

// Sendgrid object
sendgrid = new SendGrid(
  config.sendgridUser,
  config.sendgridKey
);

// Aviary object
aviary = new Aviary(
  config.aviaryKey,
  config.aviarySecret
);

// listen to posts to /email from sendgrid
app.get('/email', function(req, resp) {
  console.log('test');
});
app.post('/email', function(req, resp) {
  console.log('email received');
  if (req.files) {
    var from = JSON.parse(req.body.envelope).from;

    var imageUrl = ROOT_URL + req.files.attachment1.path.substring(6);
    console.log(imageUrl);

    // render image
    aviary.renderAndWait({
      url: imageUrl,
      actionList: {"metadata":{"imageorigsize":[597,712]},"actionlist":[{"action":"setfeathereditsize","width":597,"height":712},{"action":"effects","jsonstring":"{\"displayName\":\"Dean\",\"identifier\":\"default1\",\"minVersion\":\"1.0.0\",\"processors\":[{\"name\":\"vignette\",\"parameters\":{\"color\":{\"a\":204,\"r\":0,\"g\":0,\"b\":0},\"shape\":{\"scaling\":\"stretch\",\"vignetteScale\":1},\"blendMode\":\"overlay\"}},{\"name\":\"flare\",\"parameters\":{\"fScale\":1.6,\"color\":{\"a\":80,\"r\":0,\"g\":130,\"b\":220},\"type\":\"blob2\",\"dx\":0,\"dy\":0,\"dsx\":1,\"dsy\":1,\"blendMode\":\"overlay\"}},{\"name\":\"flare\",\"parameters\":{\"fScale\":1.08,\"color\":{\"a\":127,\"r\":0,\"g\":130,\"b\":220},\"type\":\"cornerFlares\",\"dx\":0,\"dy\":0,\"dsx\":1,\"dsy\":1,\"blendMode\":\"overlay\"}},{\"name\":\"flare\",\"parameters\":{\"fScale\":1.08,\"color\":{\"a\":127,\"r\":0,\"g\":0,\"b\":0},\"type\":\"cornerFlares\",\"dx\":0,\"dy\":0,\"dsx\":1,\"dsy\":1,\"blendMode\":\"normal\"}},{\"name\":\"colorMatrixTransform\",\"parameters\":{\"operations\":[{\"operation\":\"brightness\",\"value\":1.12},{\"operation\":\"contrast\",\"value\":1.05}]}},{\"name\":\"histogramMapping\",\"parameters\":{\"histMap\":{\"r\":[0,0,1,1,1,2,2,2,3,3,4,4,4,5,5,5,6,6,7,7,7,8,8,9,9,10,10,11,11,12,12,13,14,14,15,15,16,17,17,18,19,19,20,21,22,23,23,24,25,26,27,28,29,29,30,31,32,33,34,35,36,37,38,39,41,42,43,44,45,46,47,48,50,51,52,53,54,56,57,58,59,61,62,63,65,66,67,69,70,71,73,74,75,77,78,79,81,82,84,85,87,88,89,91,92,94,95,97,98,100,101,102,104,105,107,108,110,111,113,114,116,117,119,120,122,123,125,126,128,129,131,132,134,135,137,138,140,141,143,144,146,147,149,150,151,153,154,156,157,159,160,162,163,165,166,167,169,170,172,173,174,176,177,178,180,181,183,184,185,186,188,189,190,192,193,194,195,197,198,199,200,202,203,204,205,206,207,208,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,226,227,228,229,230,231,231,232,233,234,234,235,236,236,237,238,238,239,240,240,241,241,242,242,243,244,244,245,245,246,246,247,247,248,248,248,249,249,250,250,251,251,252,252,252,253,253,254,254,255,255],\"g\":[0,1,1,2,2,3,3,4,5,5,6,6,7,8,8,9,9,10,11,11,12,12,13,14,14,15,16,16,17,17,18,19,19,20,21,21,22,23,24,24,25,26,26,27,28,29,29,30,31,32,33,33,34,35,36,37,38,39,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,60,61,62,63,64,65,67,68,69,70,71,73,74,75,76,78,79,80,82,83,84,86,87,88,90,91,92,94,95,97,98,99,101,102,104,105,106,108,109,111,112,113,115,116,118,119,121,122,124,125,126,128,129,131,132,134,135,137,138,139,141,142,144,145,147,148,149,151,152,154,155,157,158,159,161,162,163,165,166,168,169,170,172,173,174,176,177,178,180,181,182,183,185,186,187,189,190,191,192,193,195,196,197,198,199,200,201,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,219,220,221,222,223,224,225,225,226,227,228,228,229,230,231,231,232,233,234,234,235,236,236,237,238,238,239,240,240,241,242,242,243,243,244,245,245,246,246,247,248,248,249,249,250,250,251,252,252,253,253,254,254,255],\"b\":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,5,6,8,9,11,13,14,16,17,19,21,22,24,25,27,28,30,31,33,35,36,38,39,41,42,44,45,47,49,50,52,53,55,56,58,59,61,62,64,65,67,68,70,71,73,74,76,77,79,80,81,83,84,86,87,89,90,91,93,94,96,97,98,100,101,103,104,105,107,108,109,111,112,113,115,116,117,118,120,121,122,124,125,126,127,128,130,131,132,133,134,136,137,138,139,140,141,142,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,167,168,169,170,171,172,173,173,174,175,176,177,177,178,179,180,181,181,182,183,184,184,185,186,186,187,188,188,189,190,190,191,192,192,193,194,194,195,196,196,197,197,198,199,199,200,200,201,202,202,203,203,204,204,205,206,206,207,207,208,208,209,209,210,210,211,211,212,212,213,213,214,214,215,215,216,216,217,217,218,218,218,219,219,220,220,221,221,222,222,223,223,223,224,224,225,225,226,226,227,227,227,228,228,229,229,230,230]}}}]}","name":"default1","flatten":true,"seed":1887976405,"intensity":1,"border":true}]}
    }, function(err, data) {
      console.log(err);
      if (typeof err === 'undefined') {
        // send email
        sendEmail(from, data);
      }
    });
  }
});

function sendEmail(to, body) {
  var emailParams = {
    to: to,
    from: 'ari+sendgrid@aviary.com',
    subject: 'Rendered!!',
    text: body
  };
  console.log(emailParams);

  sendgrid.send(emailParams, function(success, message) {
    console.log(success);
    if (!success) {
      console.log(message);
    }
  });
}

http.createServer(app).listen(port, function(){
  console.log("Express server listening on port " + port);
});
