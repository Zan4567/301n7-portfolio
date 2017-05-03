'use strict'

var articleList = {
  array: [],
  cats: [],
  loadArticles: function() {
    var $articleSpace = $('#articleSpace');
    var $contents = $('#toc');
    var $navItems = $('#navItems');

    //set on-click event for left menu
    $navItems.on('click', 'li', function(event) {
      console.log(event.target.getAttribute('data-cat'));
      articleList.changePage(event.target.getAttribute('data-cat'));
    });

    articleData.forEach(function(data) {
      var newArt = new Article(data);
      if(articleList.cats.indexOf(newArt.category) < 0) {
        articleList.cats.push(newArt.category);
      }
      articleList.array.push(newArt);
    });
    articleList.cats.forEach(function(cat) {
      $navItems.append('<li data-cat="' + cat + '">' + cat + '</li>');
    });
    this.array.forEach(function(art) {
      $contents.append('<li><button data-type="itemButton" data-name="' + art.name + '" data-cat="' + art.category + '" class="lightButton">' + art.name + '</button></li>');
      $articleSpace.append(art.toHtml());
    });
    $('button[data-type="itemButton"]').on('click', function() {
      articleList.addArticle(this.getAttribute("data-name"));
    });
    articleList.changePage('home');
  },
  addArticle: function(name) {
    var $articleSpace = $('#articleSpace');
    var article;

    //cancel add if the article is already there
    if($('article[data-name="' + name + '"]').length) {
      // console.log('attempted to add article ' + name + ' which already existed.');
      return;
    }

    //find and add the article from articleList.array
    for (var i = 0; i < articleList.array.length; i++) {
      if(articleList.array[i].name === name){
        article = articleList.array[i];
        $articleSpace.append(article.toHtml());
        break;
      }
    }
    if(article === undefined) {
      console.log('failed to find article ' + name);
      return;
    }
  },
  //hide navigation items that don't match current pseudo-page
  changePage: function(page) {
    $('#toc button').each(function() {
      if($(this).attr('data-cat') === page) {
        $(this).removeClass('hidden');
      }
      else {
        $(this).addClass('hidden');
      }
    });

    //close all articles, then open all articles on this page.
    $('button.close').click();
    $('#toc button').not('.hidden').click();
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

// Article.prototype.display = function(dis) {
//   //display to the page
//   this.displayed = dis;
// };

Article.prototype.toHtml = function() {
  var $newArticle = $('article.template').clone();

  $newArticle.removeClass('template');
  $newArticle.attr('data-name', this.name);
  $newArticle.attr('data-category', this.category);
  $newArticle.find('h2').html(this.name);
  $newArticle.find('.description').html(this.description);
  $newArticle.find('.body').html(this.body);
  $newArticle.on('click', 'button.close', function() {
    // console.log('close clicked on ' + this);
    // console.log(this.parentNode);
    this.parentNode.remove();
  });

  // console.log($newArticle);
  return $newArticle;
};

/**
 * Removes this article from the page.
 */
Article.prototype.removeThis = function() {
  $('article[data-name="' + this.name + '"]').remove();
};

/**
 * Object for the nav bar on the left of the page.
 */
var leftNav = {
  items: [], //array of nav items (strings)
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
  },
  addNav: function(name) {
    if(this.items.indexOf(name) >= 0) return; //prevent duplicates
    this.items.push(name);
    element.append('<li>' + name + '</li>');
  }
}

document.getElementById('toggleDisplay').addEventListener('click', function() {
  leftNav.toggleDisplay(); //wrapper to fix 'this'
});
