function component () {
  var element = document.createElement('div');
  element.innerHTML = [1, 2, 3].map(x => 'hello' + x)
  return element;
}

document.body.appendChild(component());
