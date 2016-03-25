exports.setName = function(name) {
  this.name = name;
}
exports.hello = function() {
  console.log('Hello,', this.name);
}
