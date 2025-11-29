'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const settingdialog = document.querySelector('.setting-dialog');
  const cookiedialog = document.querySelector('.cookie-dialog');
  const acceptbtn = document.querySelector('.accept');
  const settingbtn = document.querySelector('.setting');
  const savebtn = document.querySelector('.savebtn');
  const browsercheck = document.getElementById('browsercheck');
  const oscheck = document.getElementById('oscheck');
  const widthcheck = document.getElementById('widthcheck');
  const heightcheck = document.getElementById('heightcheck');
  const haveCookie = getCookies('userCookies');
  const unselect = document.querySelector('.unselect');

  if (!haveCookie) {
    setTimeout(() => {
      cookiedialog.showModal();
    }, 2000);
  }


acceptbtn.addEventListener('click', () => {
  saveAllCookies();
  cookiedialog.close();
});

settingbtn.addEventListener('click', () => {
  cookiedialog.close();
  settingdialog.showModal();
})

savebtn.addEventListener('click', () => {
  saveSelectedCookies();
  settingdialog.close();
})

unselect.addEventListener('click', () => {
  unselectAll();
})

cookiedialog.addEventListener('click', (e) => {
  const rect = cookiedialog.getBoundingClientRect();
  if(e.clientY < rect.top || e.clientY > rect.bottom ||
    e.clientX < rect.left || e.clientX > rect.right
  ){
    cookiedialog.close();
  }
  if (!haveCookie) {
    setTimeout(() => {
      cookiedialog.showModal();
    }, 5000);
  }
})

function saveAllCookies() {
    setCookie('userCookies', 'fully-accepted');
    setCookie('browser', getBrowser());
    setCookie('os', getOS());
    setCookie('screenWidth', screen.width);
    setCookie('screenHeight', screen.height);
  }

function saveSelectedCookies() {
    setCookie('userCookies', 'partially-accepted');
    if (browsercheck.checked) {
      setCookie('browser', getBrowser());
    }
    if (oscheck.checked) {
      setCookie('os', getOS());
    }
    if (widthcheck.checked) {
      setCookie('screenWidth', screen.width);
    }
    if (heightcheck.checked) {
      setCookie('screenHeight', screen.height);
    }

    if (!browsercheck.checked && !oscheck.checked && !widthcheck.checked && !heightcheck.checked) {
      setCookie('userCookies', 'rejected');
    }
  }

  function unselectAll() {
    browsercheck.checked = false;
    oscheck.checked = false;
    widthcheck.checked = false;
    heightcheck.checked = false;
  }


function setCookie(name, value) {
  const date = new Date();
  date.setSeconds(date.getSeconds() + 20);
  const expire = "expires=" + date.toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; expires=${expire}; SameSite=Lax`;
}

function getCookies(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
    if(decodeURIComponent(cookieName) === name) return decodeURIComponent(cookieValue);
  }
  return null;
}

function getBrowser() {
  const ua = navigator.userAgent;
  if(ua.includes('Chrome')) return 'Chrome';
  if(ua.includes('Firefox')) return 'Firefox';
  if(ua.includes('Safari')) return 'Safari';
  if(ua.includes('Edge')) return 'Edge';
    return 'Unknown Browser';
}

  function getOS() {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac')) return 'MacOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Unknown OS';
  }


})