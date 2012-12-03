var WEBCAM = 
{
  init: function () 
  {
    "use strict";
    
    function onWebcamFail() 
    {
      alert('There are problems with the webcam stream. Please try the latest Google Chrome');
    }

    function hasGetUserMedia() 
    {
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    if (!hasGetUserMedia()) 
    {
      alert('getUserMedia() is not supported in your browser. Please try the latest Google Chrome');
    }

    var self = this,
        video  = document.querySelector('video'),
        canvas = document.getElementById('myCanvas'),
        ctx    = canvas.getContext('2d'),
        captureTimer;

        self.video  = video;
        self.canvas = canvas;
        self.ctx    = canvas.getContext('2d');
        self.img    = document.querySelector('img');

    if (navigator.getUserMedia) 
    {
      navigator.getUserMedia({video: true}, function (stream) 
      {
        self.video.src = stream;
        self.localMediaStream = stream;
      }, onWebcamFail);
    } 
    
    /*

    //  this doesn't work : (   --  with FF only the first frame loaded then freezing 

    else if (navigator.mozGetUserMedia) 
    {
      navigator.mozGetUserMedia({video: true}, function (stream) 
      {
        self.video.mozSrcObject = stream;
        self.localMediaStream = stream;
      }, onWebcamFail);
    } 
    */

    else if (navigator.webkitGetUserMedia) 
    {
      navigator.webkitGetUserMedia({video: true}, function (stream) 
      {
        self.video.src = window.webkitURL.createObjectURL(stream);
        self.localMediaStream = stream;
      }, onWebcamFail);
    } 
    else 
    {
      onWebcamFail();
    }
  }
};

WEBCAM.init();