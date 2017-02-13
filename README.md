# paintProgram

  USING: HTML5, Javascript
  
  // Sorry for messy code, tried to make it readable.
  
  The main gist of this program is to draw shapes via user clicks. The user clicks on the WebGL canvas (drawing space) and an (x, y) coordinate is stored into an array. I was able to store each click coordinate into the array like
  
  124,336,449,68
  where 124,336 is the first click
  and 449,68 is the second click etc.
     
How do I take those coordinates and use them as points to draw lines and shapes? Like the first two coords for a line, four to draw a rectangle (using lines), etc. 

Also,
I do have <.select> element dropdown menus for choosing the shape to draw and its color, with each option having a value. I have an event listener for both menus with switch statements correpsonding to each option. Do I need a button for the user to click in order to call the selected option's corresponding function [ i.e. user selects 'Draw Line' and in the switch statement it calls the function drawLine(x, y, color); ] How do I bring the user coordinates, shape, and color together?
