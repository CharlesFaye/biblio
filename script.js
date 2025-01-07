
const item = document.querySelector('.grid');
/**
 * Initializes an Isotope instance with the specified configuration.
 *
 * @param {Element} item - The container element for the Isotope instance.
 * @param {Object} options - Configuration options for the Isotope instance.
 * @param {string} options.itemSelector - CSS selector for the grid items.
 * @param {string} options.layoutMode - Layout mode for the grid items.
 */
const iso = new Isotope( item, {
  itemSelector: '.grid-item',
  layoutMode: 'masonry'
});


/**
 * A NodeList of all <span> elements that are children of the element with the ID 'filter'.
 * @type {NodeListOf<HTMLSpanElement>}
 */
const filters = document.querySelectorAll('#filter span');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');
    iso.arrange({ filter: filterValue });
  });
});

