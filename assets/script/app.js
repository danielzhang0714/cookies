'use strict';

const settingdialog = document.querySelector('.setting-dialog');

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const cookiedialog = document.querySelector('.cookie-dialog');
    cookiedialog.showModal();
  }, 2000);
})