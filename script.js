'use strict';

var list = document.querySelector('.finder-body__list');
var lastClickedLi = null;
var toggles = document.querySelector('.finder-head__toggles');
var finderWindowHead = document.querySelector('.finder-head')

list.onclick = function(e) {
  var li = e.target;
  var clearLis = li.parentNode.querySelectorAll('li');
  
  if (li.tagName != "LI") {
  	for (var i = 0; i < clearLis.length; i++) {
      clearLis[i].classList.remove('choosen');
    }
    return;
  };
  
  if (e.ctrlKey || e.metaKey) {
    li.classList.toggle('choosen');
  } else if (e.shiftKey) {
  
  	var startLi = lastClickedLi || list.children[0];
    
    var isLastLiBefore = startLi.compareDocumentPosition(li) & 4;
    if (isLastLiBefore) {
    	for (var i = startLi; i != li; i = i.nextElementSibling) {
      	i.classList.add('choosen');
      }
    } else {
    	for (var i = startLi; i != li; i = i.previousElementSibling) {
      	i.classList.add('choosen');
      }
    }
    i.classList.add('choosen');
  } else {
    for (var i = 0; i < clearLis.length; i++) {
      clearLis[i].classList.remove('choosen');
    }  
    li.className = ('choosen');
  }
  lastClickedLi = li;
};

list.onmousedown = function() {
  return false;
};

toggles.onclick = function(e) {
	e.preventDefault();
	var target = e.target;
  var links = this.querySelectorAll('a');
  
  if (target.tagName != 'A') return;
  
  for (var i = 0; i < links.length; i++) {
  	links[i].classList.remove('finder-head__toggles-active');
  }
  if (target.classList.contains('finder-head__toggle-grid')) {
  	list.className = 'finder-body__list grid';
  } else if (target.classList.contains('finder-head__toggle-list')) {
  	list.className = 'finder-body__list list';
  }
  
  target.classList.add('finder-head__toggles-active');
}

finderWindowHead.onmousedown = function(e) {
  var target = e.target;

  var finderWindowHeadFind = target.closest('.finder-head');
  if(finderWindowHeadFind.classList.contains('.finder-head')) return;

  var finderWindow = finderWindowHead.parentNode;
  var coords = getCoords(finderWindow);
  var shiftX = e.pageX - coords.left;
  var shiftY = e.pageY - coords.top;

  finderWindow.style.position = 'absolute';
  moveAt(e);

  function moveAt(e) {
    finderWindow.style.left = e.pageX - shiftX + 'px';
    finderWindow.style.top = e.pageY - shiftY + 'px';
  }

  document.onmousemove = function(e) {
    moveAt(e);
    if (finderWindow.offsetTop < 0) finderWindow.style.top = 0 + 'px';
  };

  finderWindow.onmouseup = function() {
    document.onmousemove = null;
    finderWindow.onmouseup = null;
  }
}

finderWindowHead.ondragstart = function() {
  return false;
}

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}