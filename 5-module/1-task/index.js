function hideSelf() {
  // ваш код...
  const hideSelfButton = document.querySelector('.hide-self-button');
  hideSelfButton.onclick = () => {
    hideSelfButton.setAttribute('hidden', '');
  }
}
