function addHandlers(){
   const main = document.getElementsByTagName("main")[0]
   main.addEventListener("click", collapsibleHeaders);
}

function collapsibleHeaders(e) {
   if(e.target && e.target.nodeName == "H2"){
      var c = e.target.nextElementSibling;
      e.target.classList.toggle("collapsed");
      if (c.style.display === "none") {
         c.style.display = "block";
      } else {
         c.style.display = "none";
      }
   }
}

window.addEventListener('load', addHandlers, false)