/**
 * [Project description]
 */
function Item(obj) {
  this.name = obj.name;
  this.category = obj.category;
  this.description = obj.description;
  this.body = obj.body;
  this.displayed = false;
}

Item.prototype.display = function () {
  this.displayed = true;
};
