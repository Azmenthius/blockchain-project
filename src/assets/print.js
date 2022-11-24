function PrintElem(elem) {
  var left = screen.width;
  var top = screen.height;

  var mywindow = window.open(
    "",
    "PRINT",
    "resizable=yes, width=" +
      1200 +
      ", height=" +
      650 +
      ", top=" +
      top +
      ", left=" +
      left
  );
  var css = '<link rel="stylesheet" href="assets/css-for-print.css" />';
  mywindow.document.write("<html><head><title>" + document.title + "</title>");
  mywindow.document.write("</head><body >");
  mywindow.document.write(document.getElementById(elem).innerHTML);
  // mywindow.document.write("</body></html>");
  mywindow.document.head.innerHTML = css;
  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();

  return true;
}
