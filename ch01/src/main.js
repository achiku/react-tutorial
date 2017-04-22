function component () {
  var element = document.createElement('div');
  element.innerHTML = [1, 2, 3, 4, 20].map(x => 'hello' + x)
  return element;
}

document.body.appendChild(component());
