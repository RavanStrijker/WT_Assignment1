function addHandlers(){
   const main = document.getElementsByTagName("main")[0];
   main.addEventListener("click", collapsibleHeaders);
   collapseArticleHeaders();
}

function collapsibleHeaders(e) {
   if(e.target && e.target.nodeName == "H2"){
      const c = e.target.nextElementSibling;
      e.target.classList.toggle("collapsed");
      if (c.style.display === "none") {
         c.style.display = "block";
      } else {
         c.style.display = "none";
      }
   }
}

function collapseArticleHeaders() {
   // Default behaviour to have article headers collapsed, to 
   // 1. Make articles less walls of text and 
   // 2. To provide a contrast with aside headers which aren't collapsed, to teach visitors that headers can be (un)collapsed
   const hs = document.getElementsByTagName('h2');
   for (let i=0; i<hs.length; i++) {
      if (hs[i].parentElement.nodeName !== "ASIDE") {
         hs[i].classList.toggle("collapsed");
         hs[i].nextElementSibling.style.display="none";
      }
   }
}


function fillSelector(){
   var selector = document.getElementById('selector');

   var mainElements = [];
   var sections = [];
   var whitelist = ["SECTION","BODY","MAIN","NAV","ARTICLE","ASIDE","FOOTER"]

   domWalk(whitelist, mainElements, sections);

   var mainGroup = document.createElement("optgroup");
   mainGroup.label = "Main parts";
   selector.add(mainGroup);
   addArrayElements(selector, mainElements, undefined);

   if(sections.length) {
      var sectionGroup = document.createElement("optgroup");
      sectionGroup.label = "Sections";
      selector.add(sectionGroup);
      addArrayElements(selector, sections, undefined);
   }
}

function domWalk (whitelist, mainElements, sections) {
   for (elem of document.getElementsByTagName("html")[0].childNodes){
      if (elem.nodeType == 1){
         recursiveDomWalk(elem, whitelist, mainElements, sections);
      }
   }
}

function recursiveDomWalk(elem, whitelist, mainElements, sections) {
   if (elem.nodeType == 1 && whitelist.includes(elem.nodeName)){
      if (elem.id !== "main-section" && elem.nodeName === "SECTION") {
         sections.push(elem.id);
      }
      else {
         mainElements.push(elem.id);
      }
      for (i of elem.childNodes) {
         recursiveDomWalk(i, whitelist, mainElements, sections);
      }
   }
}

function enableEditor(){
   var editor = document.getElementById('editor');
   editor.addEventListener('change',changeSelected, false);
}

function fillEditor(){
   var editor = document.getElementById('editor');
   var fontsizeoptions = ["25%","50%","75%","100%","125%","150%","175%","200%"];
   var coloroptions = ["Black", "White", "Orange", "Red", "Green", "Blue", "Yellow"];

   var fontsizegroup = document.createElement("optgroup");
   fontsizegroup.label = "Font size";
   editor.add(fontsizegroup);
   addArrayElements(editor, fontsizeoptions, "Font-size");

   var colorgroup = document.createElement("optgroup");
   colorgroup.label = "Text color";
   editor.add(colorgroup);
   addArrayElements(editor, coloroptions, "Text-color");

   var bgcolorgroup = document.createElement("optgroup");
   bgcolorgroup.label = "Background";
   editor.add(bgcolorgroup);
   addArrayElements(editor, coloroptions, "Background");
}

function addArrayElements(editor, array, category) {
   for (let i = 0; i < array.length; i++){
      var option = array[i];
      var toAdd = document.createElement("option");
      toAdd.textContent = option[0].toUpperCase() + option.substr(1);
      toAdd.value = option;
      toAdd.category = category;
      editor.add(toAdd);
   }
}

function changeSelected(){
   var selector = document.getElementById('selector');
   var selectedOption = selector.options[selector.selectedIndex];
   if(selectedOption !== null){
      var selectedValue = document.getElementById(selectedOption.value);
      var editor = document.getElementById('editor');
      var change = editor.options[editor.selectedIndex];
      if(change.category == "Font-size"){
         selectedValue.style.fontSize = change.value;
      }
      else if(change.category == "Text-color"){
         selectedValue.style.color = change.value;
      }
      else if(change.category == "Background"){
         selectedValue.style.backgroundColor = change.value;
      }
   }
}

function initialise() {
   addHandlers();
   fillSelector();
   fillEditor();
   enableEditor();
}

window.addEventListener('load', initialise, false);