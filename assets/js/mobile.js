const scriptURL = 'https://script.google.com/macros/s/AKfycbz0LB4pfJBkTbwtIJfL0__xrs-WSlcsltln7TGxuD8_pAq5EQinTPWay6pVX9bioMe1/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! Form is submitted" ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})