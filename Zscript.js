
//initialize default values for the following variables.
const DEFAULT_COLOR = '#333333'
const DEFAULT_MODE = 'color'
const DEFAULT_SIZE = 16
const offSize = 0;

//assign declared variables above to the following variables.
let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE


function setCurrentColor(newColor) {
    currentColor = newColor
  }//this function when called with an argument simply changes the value of the currentColor variable with the arg passed.
  
  function setCurrentMode(newMode) {
    activateButton(newMode)
    currentMode = newMode
  }//this function when called with an argument simply changes the value of currentMode to value of argument passed.
  
  function setCurrentSize(newSize) {
    currentSize = newSize
  }//this function when called with an argument simply changes the value of currentSize to value of argument passed.

  //select the following settings elements in the html document to be accessible in the DOM.
  const colorPicker = document.getElementById('colorPicker')
  const colorBtn = document.getElementById('colorBtn')
  const rainbowBtn = document.getElementById('rainbowBtn')
  const bloodBtn = document.getElementById('bloodBtn')
  const grayBtn = document.getElementById('grayBtn')
  const eraserBtn = document.getElementById('eraserBtn')
  const clearBtn = document.getElementById('clearBtn')
  const sizeValue = document.getElementById('sizeValue')
  const sizeSlider = document.getElementById('sizeSlider')

  //select the grid element container in the html document so it can be accessible in the DOM.
  const grid = document.getElementById('grid')

  //Add event handler properties to the following selected elements in the DOM.
  colorPicker.oninput = (e) => setCurrentColor(e.target.value)
  //this waits for an input event on the colorpicker button and triggers the event handler which calls the setCurrentColor
  //function and passes the input value as the functions argument.
  colorBtn.onclick = () => setCurrentMode('color')
  //this waits for a click event on the color mode button and triggers the event handler which calls the setCurrentMode
  //function and passes 'color' as value of the function argument.
  rainbowBtn.onclick = () => setCurrentMode('rainbow')
  //this waits for a click event on the rainbow mode button and triggers the event handler which calls the setCurrentMode
  //function and passes 'rainbow' as value of the function argument. This sets currentmode variable to 'rainbow'.
  eraserBtn.onclick = () => setCurrentMode('eraser')
  //same happens with the eraser button, when the function is called here it sets the value of current mode to 'eraser'
  clearBtn.onclick = () => {
    if(grid.innerHTML === '') return;
    reloadGrid()
  } 
  //when the event triggers here after a click on the clear button, it calls the reload grid function. which clears the
  //grid and sets it up again.
  
  //MY ADDED BUTTONS BEFORE THE SLIDER.
  bloodBtn.onclick = () => setCurrentMode('blood')
  grayBtn.onclick = () => setCurrentMode('gray')
  //end.
  
  sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value)//this waits for a mousemove event and fires the event
  //handler function in this case the updateSizeValue function which changes the sizeValue element content with the value
  //of the sizeSlider input element when the event fires.
  /*
  Lets look at what the e.target.value means.
  e refers to the event itself which is a mouseEvent. 
  
  The e.target then refers to the element that is being targeted by
  the event and in this case the input sizeSlider element.

  Now the e.target.value returns the value of the input sizeSlider element.
  */
  sizeSlider.oninput = (e) => changeSize(e.target.value)

//WHY use the oninput event for the colorpicker button/element and the onchange event for the sizeslider?

/*The difference is that the oninput event occurs immediately after the value of an element has changed while the 
onchange occurs when the element loses focus, after the content has been changed.*/


/*The selected input elements above which are the colorPicker element and sizeSlider element have default values
stated in the html document. 

This values can also be changed on the webpage. For instance the colorPicker button when clicked can be used to change 
the default value that has been set. 

Now the oninput event handler property assigned to the colorPicker button waits for the input event which is fired at 
the point of value change.

Once the event fires on the colorPicker button the event handler function is called which is the setCurrentColor function,
which sets the currentColor value to the value the element/button is holding at the time.
*/

  function changeSize(value) {
    setCurrentSize(value)
    updateSizeValue(value)
    if(grid.innerHTML === '')return;
    reloadGrid()
  }

  function updateSizeValue(value) {//this when called anywhere in the code updates the sizeValue element innerHTML 
    //with value passed in as argument.
    sizeValue.innerHTML = `${value} x ${value}`
  }

  function reloadGrid() {//this function calls the clearGrid function which sets the grid innerHTML value to empty.
    clearGrid()
    setupGrid(currentSize)//then setups the grid again with current size value.
  }
  
  function clearGrid() {//this sets the grid innerHTML value to empty.
    grid.innerHTML = ''//investigate grid innerHTML later.
  }

  function setupGrid(size) {//this sets up the grid 
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridElement = document.createElement('div')
      gridElement.classList.add('grid-element')
      gridElement.style.backgroundColor = '#ffffff'
      grid.appendChild(gridElement)
      gridElement.addEventListener('mouseover', changeColor)
      //gridElement.addEventListener('mousedown', changeColor)
    }
  }

 

  let mouseDown;
  window.onmousedown = () => (mouseDown = true)//this waits for a mousedown event on the document and when the event 
  //occurs it sets mouseDown = true.
  window.onmouseup = () => (mouseDown = false)//this waits for a mouseup event on the document and when the event
  //occurs it sets mouseDown = false.

//the first if simply says if the event type that fires the changecolor function is a mouseover event and the mouse is
//not down do not run.
  function changeColor(e) {
    if (e.type === 'mouseover' && mouseDown == false) return;
    if (currentMode === 'rainbow') {
      const randomR = Math.floor(Math.random() * 256)
      const randomG = Math.floor(Math.random() * 256)
      const randomB = Math.floor(Math.random() * 256)
      e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`
    } else if (currentMode === 'color') {
      e.target.style.backgroundColor = currentColor
    } else if (currentMode === 'eraser') {
      e.target.style.backgroundColor = '#fefefe'
    }else if (currentMode === 'blood') {
      e.target.style.backgroundColor = '#da1616'
    }else if (currentMode === 'gray') {
      e.target.style.backgroundColor = '#A9A9A9'
    }
  }

/*so a quick explanation down here. This activateButton here is called in this code only when the settings mode is being
changed. It simply adds and removes active class on the mode buttons.

This mode is being changed when the setCurrentMode function is being called after a click event on each mode
button. The setCurrentMode function when called also calls the activate button function. 

Now when the activateButton function is being called the value passed in the setCurrentMode function parameter is 
being passed to the activateButton function parameter.

*/
  function activateButton(newMode) {//this function adds and removes active class on each button accordingly.
    if (currentMode === 'rainbow') {
      rainbowBtn.classList.remove('active')
    } else if (currentMode === 'color') {
      colorBtn.classList.remove('active')  //this area removes active from the current mode before adding active to the
    } else if (currentMode === 'eraser') { //new mode.
      eraserBtn.classList.remove('active')
    }else if (currentMode === 'blood') {
      bloodBtn.classList.remove('active')
    }else if (currentMode === 'gray') {
      grayBtn.classList.remove('active')
    }
  
    if (newMode === 'rainbow') {
      rainbowBtn.classList.add('active')
    } else if (newMode === 'color') {
      colorBtn.classList.add('active')
    } else if (newMode === 'eraser') {
      eraserBtn.classList.add('active')
    }else if (newMode === 'blood'){
      bloodBtn.classList.add('active')
    }else if (newMode === 'gray') {
      grayBtn.classList.add('active')
    }
  }

  const displayGrid = document.querySelector('#displayBtn')
  displayGrid.addEventListener('click', (e)=>{
    setupGrid(DEFAULT_SIZE)
  })
  
 const offGrid = document.querySelector('#offBtn')
 offGrid.addEventListener('click', (e)=>{
  clearGrid()
 });