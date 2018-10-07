/**
 * Updates the text within an HTML element.
 *
 * @param {String} text String being sent to HTML element.
 * @param {String} htmlID The ID of an html element.
 */
function sendTextToHTML(text, htmlID) {
  // Updating the HTML from current clicked points
  document.getElementById(htmlID).innerHTML = text;
}
