function toggleText() {
  const text = document.getElementById('text');
  const toggleTextButton = document.querySelector('.toggle-text-button');
  toggleTextButton.onclick = () => {
    text.attributes[1] ? text.removeAttribute('hidden') : text.setAttribute('hidden', '');
  }
}
