import CustomConsentPopup from '../src/custom-consent-popup.js'
import './style.css'

/**
 * An object `options`^ is used to pass user settings to a banner
 */
const defaultOptions = {}
const options1 = {
  consentExpirationTime: 5,
  position: "center",
  backgroundBlock: true,
  backgroundBlockColor:'rgba(255, 0, 255, 0.5)',
  blockScroll: true,
  positiveButtonText: 'Off course baby Off course baby',
  onlyPositiveButtonOnModalWindow: false
};
const options2 = {
  position: 'top',
  backgroundBlockColor:'rgba(0, 255, 0, 0.5)',
  backgroundBlock: true
}
const options3 = {
  position: 'bottom',
  onPositiveButtonClickCallback: function(){console.log('Hello from button №3!');}
}

document.addEventListener('DOMContentLoaded', (event) => {
  const optionsNumber = localStorage.getItem('optionsNumber');
  let options;
  switch (optionsNumber) {
    case '1':
      options = options1;
      break;
    case '2':
      options = options2;
      break;
    case '3':
      options = options3;
      break;
    case '4':
      options = {};
      break;
    default:
      options = defaultOptions;
  }
  CustomConsentPopup.init(options);
});

///////
const first_button = document.getElementById("first-demonstration-button")
first_button.addEventListener('click', (event)=>{
  localStorage.setItem('optionsNumber', 1)
})

const second_button = document.getElementById("second-demonstration-button")
second_button.addEventListener('click', (event)=>{
  localStorage.setItem('optionsNumber', 2)
})

const third_button = document.getElementById("third-demonstration-button")
third_button.addEventListener('click', (event)=>{
  localStorage.setItem('optionsNumber', 3)
})
const forth_button = document.getElementById("forth-demonstration-button")
forth_button.addEventListener('click', (event)=>{
  localStorage.setItem('optionsNumber', 4)
})

