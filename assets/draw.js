(function () 
{
  
  //  we add processing as an object to javascript.
  //  this way we can handle native canvas (for video)
  //  and processing syntax nice & clean together

  "use strict";
  function sketchProc(processing) 
  {
    var p                     = processing,
      ctx                     = WEBCAM.ctx,
      nb                      = 320,
      width                   = window.innerWidth,
      height                  = window.innerHeight* 0.9,
      drawPosition            = -nb/2;
  
    var frameRate=25;  
  
    p.setup = function () 
    {
      p.size(width, height);
      p.background(0);
      p.smooth();
      p.frameRate(frameRate);
    }

     p.draw = function () 
     {
      var val;

      if (WEBCAM.localMediaStream) 
      {
        //  mirror video feed dimensions
        p.pushMatrix();
        p.scale(-1,1);
        p.translate(-nb,0);
        ctx.drawImage(WEBCAM.video, 0, 0, nb, nb / 1.3);
        
        p.popMatrix();
      }

      p.pushMatrix();
      p.translate(width, 0);
      p.scale(-1, 1);
      p.loadPixels();
      p.popMatrix();
    
        for (var i = 0; i <= nb; i += 1) 
        {
          //  get color value of each pixel in the middle vertical axis on the live video feed
          val = p.pixels.getPixel((i%height) * width + nb/2);

          //  draw an ellipse according to each pixel value
          p.noStroke();
          p.fill(val);
          p.ellipse(drawPosition,i*height/(nb/1.3),5,5);
        }

        //  indicate line where scanline is on the webcam image
        //  native canvas gfx code, p5 had some problems...
        ctx.beginPath();
        ctx.moveTo(nb/2+1,0);
        ctx.lineTo(nb/2+1,nb/1.3);
        ctx.strokeStyle = '#000';
        ctx.stroke();

        //  increase position of our drawing line
        drawPosition ++;
        if(drawPosition>width)drawPosition=0; 
  }
}  
    //  make & bind our processing instance
    var canvas = document.getElementById("myCanvas"),
    p = new Processing(canvas, sketchProc);

}());


