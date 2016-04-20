// See http://en.wikipedia.org/wiki/Comma-separated_values
(() => {
"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

const resultTemplate = `
<div class="contenido">
      <table class="center" id="result">
          <% _.each(rows, (row) => { %>
          <tr class="<%=row.type%>">
              <% _.each(row.items, (name) =>{ %>
              <td><%= name %></td>
              <% }); %>
          </tr>
          <% }); %>
      </table>
  </p>
</div>
`;

/* Volcar la tabla con el resultado en el HTML */
const fillTable = (data) => {
  $("#finaltable").html(_.template(resultTemplate, { rows: data.rows }));
};

/* Volcar en la textarea de entrada
 * #original el contenido del fichero fileName */
const dump = (fileName) => {
  $.get(fileName, function(data){
    $("#original").val(data);
 });
};

const handleFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  var inputFiles = evt.target.files;
  var fr = new FileReader();
  fr.onload = (event) => {
    $("#original").val(event.target.result);
  };
  fr.readAsText(inputFiles[0]);
}

/* Drag and drop: el fichero arrastrado se vuelca en la textarea de entrada */
const handleDragFileSelect = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  var fileList = evt.dataTransfer.files; // FileList object.

  var fr = new FileReader();
  fr.onload = (event) => {
    $("#original").val(event.target.result);
    evt.target.style.background = "white";
  };
  fr.readAsText(fileList[0]);
}

const handleDragOver = (evt) => {
  evt.stopPropagation();
  evt.preventDefault();
  evt.target.style.background = "orange";

}

$(document).ready(() => {
    let original = document.getElementById("original");
    if (window.localStorage && localStorage.original) {
      original.value = localStorage.original;
    }


   /* botones para rellenar el textarea */
   $('.example').click(function(){
     dump('../ejemplos/'+($(this).val() )+ '.txt');
   })

    // Setup the drag and drop listeners.
    //var dropZone = document.getElementsByClassName('drop_zone')[0];
    let dropZone = $('.drop_zone')[0];
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleDragFileSelect, false);
    let inputFile = $('.inputfile')[0];
    inputFile.addEventListener('change', handleFileSelect, false);


 });
})();
