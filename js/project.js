'use strict'

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

var articleList = {
  array: [],
  cats: [],
  artTemplate: function() {
    var source = $('#article-template').html();
    return Handlebars.compile(source);
  }(),

  //pull articles from articles.js and add buttons to left and right menus
  loadArticles: function() {
    var $articleSpace = $('#articleSpace');
    var $contents = $('#toc');
    var $navItems = $('#navItems');

    $articleSpace.on('click', 'button.close', function(event){
      console.log(event.target.parentNode);
      event.target.parentNode.remove();
    });

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
    });
    $('button[data-type="itemButton"]').on('click', function() {
      articleList.addArticle(this.getAttribute("data-name"));
    });
    articleList.changePage('home');
  },

   //Adds an article to the page.
  addArticle: function(name) {
    var $articleSpace = $('#articleSpace');
    var article;

    //cancel add if the article is already there
    if($('article[data-name="' + name + '"]').length) {
      console.log('attempted to add article ' + name + ' which already existed.');
      return;
    }

    //find and add the article from articleList.array
    for (var i = 0; i < articleList.array.length; i++) {
      if(articleList.array[i].name === name){
        article = articleList.array[i];
        var newArticle = article.toHtml();
        console.log($(newArticle));
        $(newArticle).on('click', 'button.close', function() {
          console.log('close clicked on ' + this);
          console.log(this.parentNode);
          // this.parentNode.removeThis();
        });
        $articleSpace.append(newArticle);
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

//returns an html version of this article through Handlebars.
Article.prototype.toHtml = function() {
  var newArticle = articleList.artTemplate(this);
  console.log(newArticle);

  return newArticle;
};


document.getElementById('toggleDisplay').addEventListener('click', function() {
  leftNav.toggleDisplay(); //wrapper to fix 'this'
});
