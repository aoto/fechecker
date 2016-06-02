function init() {
  var $check = document.getElementById('J_check');
  var $progress = document.getElementById('J_progress');
  $check.onclick = function () {
    var request = new XMLHttpRequest();
    request.open('GET', '/check', true);
    request.send('');
    request.onload = function () {
      $progress.style.display = 'none';
    }
    $progress.style.display = 'block';
  };
}

window.onload = init;
