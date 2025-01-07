/**
 * A reference to the DOM element with the class 'current-year'.
 * This element is expected to display or use the current year.
 * @type {Element}
 */
const currentYear = document.querySelector('.current-year');
const date = new Date();
const getDate = date.getFullYear();
currentYear.textContent = getDate;
