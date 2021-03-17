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
   var whitelist = ["SECTION","BODY","MAIN","NAV","ARTICLE","ASIDE","FOOTER"];

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
   for (let elem of document.getElementsByTagName("html")[0].childNodes){
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
      for (let i of elem.childNodes) {
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
   doAFew();
   addHandlers();
   fillSelector();
   fillEditor();
   enableEditor();
}

function doAFew(){
   if (document.title === "Assessment"){
      for (let i = 0; i < 4; i++){
         createArticle(i);
      }
   }
}

function createArticle(nr){
   let mainSection = document.getElementById("main-section");
   let testArticle = document.createElement("ARTICLE");
   testArticle.setAttribute('id','question'+nr);

   let testHeading = document.createElement("H3");
   testHeading.textContent = "Q" + nr + ": How much wood would a woodchuck chuck if a woodchuck could chuck wood?";
   testArticle.appendChild(testHeading);

   var testForm = document.createElement("FORM");

   answ = ["Yes","No","Maybe","I don't know"];
   answ.shuffle();
   createAnswers(testForm, answ, nr)

   testArticle.appendChild(testForm);

   mainSection.appendChild(testArticle);
}

function createAnswers(form, answerArray, nr){
   for (let i=0; i<answerArray.length; i++){
      var input = document.createElement("INPUT");
      input.setAttribute('type','radio');
      input.setAttribute('name','answer'+nr);
      input.setAttribute('value','answer'+i);
      input.setAttribute('id','answer'+nr+i); // will need a way to identify whether it's the correct answer or not
      var label = document.createElement("LABEL");
      label.setAttribute('for','answer'+nr+i);
      label.appendChild(document.createTextNode(answerArray[i]));
      form.appendChild(document.createElement("BR"));
      form.appendChild(input);
      form.appendChild(label);
   }
   form.addEventListener('click',ping);
}

// for fill in the blanks we could designate one or more split locations with a character such as #, and then String.split('#');

function ping(e){
   if(e.target && e.target.nodeName == "INPUT"){
      console.log(e.target.id + ' ' + e.target.value);
   }
}

function fillAssessment(){
   let mainSection = document.getElementById("main-section");
   var testArticle = document.createElement("ARTICLE");

   let testHeading = document.createElement("H3")
   var testText = document.createTextNode("This is a test text element");
   testHeading.textContent = "Heading";
   testArticle.appendChild(testHeading);
   testArticle.appendChild(testText);
   mainSection.appendChild(testArticle);
}

Array.prototype.shuffle = function() {
   // Fisher-Yates shuffle
   for (let i = this.length - 1; i; i--){
      let j = Math.floor(Math.random()*(i+1));
      let temp = this[j];
      this[j] = this[i];
      this[i] = temp;
   }
}

// todo

class Question {
   constructor(description) {
      this.description = description;
   }
}

class MultipleChoice extends Question {
   constructor(){
      super(description)
   }

}


function domQuestion(q){

}


window.addEventListener('load', initialise, false);