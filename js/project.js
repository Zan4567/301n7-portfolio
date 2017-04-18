'use strict'

var articleList = {
  array: [],
  loadArticles: function() {
    var $articleSpace = $('#articleSpace');
    articleData.forEach(function(data) {
      articleList.array.push(new Article(data));
    });
    this.array.forEach(function(art) {
      console.log(art);
      $articleSpace.append(art.toHtml());
    });
    console.log();
  }
}

/**
 * An individual item to display in the main space.
 */
function Article(obj) {
  this.name = obj.name;
  this.category = obj.category;
  this.image = obj.image;
  this.description = obj.description;
  this.body = obj.body;
  this.displayed = true;
}

Article.prototype.display = function () {
  //display to the page
  this.displayed = true;
};

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();


  $newArticle.removeClass('template');
  $newArticle.find('article').attr('data-category', this.category);
  $newArticle.find('h2').html(this.name);
  $newArticle.find('.description').html(this.description);
  $newArticle.find('.body').html(this.body);

  console.log($newArticle);
  return $newArticle;
}

/**
 * Object for the nav bar on the left of the page.
 */
var nav = {
  items: [], //array of nav items.
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
