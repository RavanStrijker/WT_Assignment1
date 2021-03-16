function addHandlers(){
   const main = document.getElementsByTagName("main")[0]
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
   for (i=0; i<hs.length; i++) {
      if (hs[i].parentElement.nodeName !== "ASIDE") {
         hs[i].classList.toggle("collapsed");
         hs[i].nextElementSibling.style.display="none";
      }
   }
}

window.addEventListener('load', addHandlers, false);

function fillSelector(){
   var selector = document.getElementById('selector');
   var body = document.createElement("option");
   var nav = document.createElement("option");
   var article = document.createElement("option");
   var section = document.createElement("option");
   var aside = document.createElement("option");
   var footer = document.createElement("option");
   var optgroup0 = document.createElement("optgroup")
   var optgroup1 = document.createElement("optgroup");

   optgroup0.label = "Main-parts";
   body.value = "body";
   body.text = "Body";
   nav.value = "nav";
   nav.text = "Navigation";
   section.value = "section";
   section.text = "Main-section";
   article.value = "article";
   article.text = "Article";
   aside.value = "aside";
   aside.text = "Aside";
   footer.value = "footer";
   footer.text = "Footer";
   optgroup1.label = "Sections";

   selector.add(optgroup0);
   selector.add(body);
   selector.add(nav);
   selector.add(section);
   selector.add(article);
   selector.add(aside);
   selector.add(footer);
   if(document.getElementsByTagName('section').length > 1) {
      selector.add(optgroup1);
   }

   for(i=1; i<document.getElementsByTagName('section').length; i++) {
      var option = document.createElement("option");
      option.value = document.getElementsByTagName('section')[i].id;
      option.text = document.getElementsByTagName('section')[i].id;
      selector.add(option);
   }
}

window.addEventListener('load', fillSelector, false);

function enableEditor(){
   var editor = document.getElementById('editor');
   editor.addEventListener('change',changeSelected, false);
}

function changeSelected(){
   var selector = document.getElementById('selector');
   var selectedOption = selector.options[selector.selectedIndex];
   if(selectedOption !== null){
      var selectedValue = document.getElementById(selectedOption.value);
      var editor = document.getElementById('editor');
      var change = editor.options[editor.selectedIndex];
      if(change.parentElement.label == "Font-size"){
         selectedValue.style.fontSize = change.value;
      }
      else if(change.parentElement.label == "Text-color"){
         selectedValue.style.color = change.value;
      }
      else if(change.parentElement.label == "Background"){
         selectedValue.style.backgroundColor = change.value;
      }
   }
}

window.addEventListener('load', enableEditor, false);