function select() {
  var select = document.querySelector('.c-select select');

  select.onchange = function(event) {
    this.parentNode.setAttribute('data-value', event.target.value);
  };

  select.onfocus = function() {
    this.parentNode.classList.add('is-focused');
  };

  select.onblur = function() {
    this.parentNode.classList.remove('is-focused');
  };

  var event = new Event('change');
  select.dispatchEvent(event);
};


document.addEventListener('DOMContentLoaded', function() {
  select();
});
