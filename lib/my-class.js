
/**
 * this is MyClass description.
 */

module.exports = MyClass;

/**
 * this is MyClass constructor description.
 * @param {string} [name="anonymous"] - this is name description.
 */
function MyClass() {

}

/**
 * this is sayMyName description
 * @returns {string} this is return description.
 */
MyClass.prototype.sayMyName = function() {
  return `My name is ${this._name}`;
};
