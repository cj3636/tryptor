const { remote } = require('electron');

const customTitleBar = require('custom-electron-titlebar');

function setMenuColor() {
  // eslint-disable-next-line no-undef
  const themeActive = localStorage.getItem('themeFile');
  if (themeActive != null) {
    // eslint-disable-next-line no-cond-assign,eqeqeq
    if (themeActive === true) {
      return customTitleBar.Color.fromHex('#041013');
      // eslint-disable-next-line eqeqeq
    } else if (themeActive === false) {
      return customTitleBar.Color.fromHex('#b1bed6');
    }
  }
  return customTitleBar.Color.fromHex('#041013');
}

// eslint-disable-next-line no-new,no-unused-vars
const TryptorMainTitleBar = new customTitleBar.Titlebar({
  backgroundColor: setMenuColor(),
  icon: './img/lock.png',
  overflow: 'hidden',
  titleHorizontalAlignment: 'left',
  shadow: 'false',
});

const menu = new remote.Menu();

TryptorMainTitleBar.updateMenu(menu);
