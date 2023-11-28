import CustomConsentPopup from '../src/custom-consent-popup.js'
import './style.css'

/**
 * An object `options`^ is used to pass user settings to a banner
 */
const options1 = {
  backgroundBlock: true,
  consentExpirationTime: 5,
  hideBannerOnOverlayClick: false,
  hideBannerOnNegativeClick: true,
  position: 1,
};
const options2 = {
  backgroundBlock: true,
  consentTime: 5,
  hideBannerOnOverlayClick: false,
  hideBannerOnNegativeClick: true,
  position:2,
};

document.addEventListener('DOMContentLoaded', (event) => {
  CustomConsentPopup.init(options1)
});


