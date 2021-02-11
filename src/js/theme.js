function initPage() {
  let themeKey = localStorage.getItem('themeFile');
  if (themeKey != null) {
    changeThemeFile(themeKey);
  }
}

//todo make themes modular and allow user to add more
function changeTheme(option, color) {

  let cssFile = 'css/style.css';
  if (option === 1) {
    cssFile = 'css/styleLight.css';
    localStorage.setItem('themeColor', '#041013');
  } else if (option === 0) {
    cssFile = 'css/style.css';
    localStorage.setItem('themeColor', '#b1bed6');
  } else if (option === 2) {
    localStorage.setItem('themeKey', null);
    localStorage.setItem('themeColor', null);
    location.reload();
  } else {
    return;
  }
  localStorage.setItem('themeFile', cssFile);
  localStorage.setItem('themeColor', null);
  changeThemeFile(cssFile);
}

function changeThemeFile(cssFile) {
  let oldLink = document.getElementById('themeStyle');
  let newLink = document.createElement('link');
  newLink.setAttribute('id', 'themeStyle');
  newLink.setAttribute('rel', 'stylesheet');
  newLink.setAttribute('type', 'text/css');
  newLink.setAttribute('href', cssFile);
  document.getElementsByTagName('head')
    .item(0)
    .replaceChild(newLink, oldLink);
}
