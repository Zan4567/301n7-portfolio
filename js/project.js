'use strict'

/**
 * An individual item to display in the main space.
 */
function Item(obj) {
  this.name = obj.name;
  this.category = obj.category;
  this.image = obj.image;
  this.description = obj.description;
  this.body = obj.body;
  this.displayed = false;
}

Item.prototype.display = function () {
  //display to the page
  this.displayed = true;
};

var nav = {
  items: [],
  display: false, //should be displayed even if screen width is low.
  element: document.getElementById('navMenu'),
  // toggles whether the nav element should be displayed in a small-screen view.
  toggleDisplay: function() {
    if(this.display === true) {
      this.element.className = 'hiddenMenu';
      this.display = false;
    } else {
      this.element.className = '';
      this.display = true;
    }
  }
}

function NavItem(name, link) {
  this.name = name;
  this.link = link;
}

document.getElementById('toggleDisplay').addEventListener('click', function() {
  nav.toggleDisplay(); //wrapper to fix 'this'
});
