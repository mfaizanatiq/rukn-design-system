/**
 * Apply theme before first paint to avoid a light-mode flash.
 * Default is dark; only skips dark when the user explicitly chose light.
 */
(function () {
  var root = document.documentElement;
  try {
    var stored = localStorage.getItem('rukn-dark-mode');
    if (stored === 'false') {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
  } catch (e) {
    root.classList.add('dark');
  }
})();
