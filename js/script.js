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

window.addEventListener('load', addHandlers, false)