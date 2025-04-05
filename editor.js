// object for rich text editor
var richTextEditor = new (function() {
  this.init = function(args) {
    console.log("It's working", args)
    // load the assets
    this.loadAssets();

    // disable div
    document.getElementById(args.selector).style.display='none'

    const defaultElements = [
      {command:'bold', type: 'button', innerHTML: '<i class="fas fa-bold"></i>'},
      {command:'italic', type: 'button', innerHTML:  '<i class="fas fa-italic"></i>'},
      {command:'underline', type: 'button', innerHTML:  '<i class="fas fa-underline"></i>'},
      {command:'strikeThrough', type: 'button', innerHTML: '<i class="fas fa-strikethrough"></i>'},
    ]

    // Container
    const container = document.createElement("div")
    container.setAttribute('id', 'richTextEditorContainer')
    container.appendAfter(document.getElementById(args.selector))

    //Iframe editable
    const contentEditable = document.createElement('iframe')
    contentEditable.setAttribute('name', 'richTextEditorField')
    contentEditable.setAttribute('id', 'richTextEditorField')
    contentEditable.style.width = '100%';
    contentEditable.style.border = 'solid 1px lightgrey'

    container.appendChild(contentEditable)

    //create the iframe editor in the browser
    
    // contentEditable.contentDocument.designMode = 'on'
    contentEditable.onload = function() {
      const doc = contentEditable.contentDocument || contentEditable.contentWindow.document
      doc.designMode = 'on'
      doc.body.innerHTML = '<p>Start typing here....</p>'
    }

    this.loadButtons(defaultElements, contentEditable)
  
  }

  Element.prototype.appendBefore = function(element) {
    element.parentNode.insertBefore(this, element)
  };

  Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
  };

  this.loadButtons = function(defaultElements, contentEditable) {
    let initialElement=undefined
    let element=undefined
    for (let el=0; el< defaultElements.length; el++) {
      // if the index is greater than zero than provide the initial element
      if (el > 0) {
        initialElement = element
      }
      
      element = document.createElement(defaultElements[el].type);
      element.setAttribute('title', defaultElements[el].command);
      element.setAttribute('data-name', defaultElements[el].command);
      element.innerHTML = `${defaultElements[el].innerHTML} ${defaultElements[el].command}`
      element.style.margin = '0 5px 5px 0'

      //if it is button
      let command=undefined
      let arguments=undefined

      // if this is a button
      if (defaultElements[el].type.indexOf('button') !== -1) {
        // this part will be added for the upcoming functionality
        element.onclick = function() {
          command = this.getAttribute('title');
          const doc = contentEditable.contentDocument || contentEditable.contentWindow.document
          doc.execCommand(command, false, arguments);
        }
      }

      //append
      if (el > 0) {
        element.appendAfter(initialElement);
      } else {
        element.appendBefore(contentEditable);
      }
    }
  }

  this.loadAssets = function() {
    console.log("load assets")
    // https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/fontawesome.min.css
    const stylesheet = document.createElement('link');
    stylesheet.href='https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.6.0/css/fontawesome.min.css';
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';

    document.head.appendChild(stylesheet);
  }
  
})
