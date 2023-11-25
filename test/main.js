import CustomConsentPopup from '../src/custom-consent-popup.js'
import './style.css'
import PopupCss from '../src/popup-css.js'

/**
 * An object `options`^ is used to pass user settings to a banner
 */
const options = {
  show: true,
  negativeButtonText: 'No',
  backgroundBlock: true,
  backgroundBlockOpacity: 0.8,
  expirationTimer: 5,
  hideBannerOnOverlayClick: false,
  hideBannerOnNegativeClick: true,
  position:PopupCss.BANNER_POSITION_1,
  bannerText: `We use cookies on this site to enhance your user experience, analyze site usage,
  and assist in our marketing efforts. By clicking "Accept", you consent to the 
  storing of cookies on your device. For more information on how we use cookies and your 
  related choices, please review our Cookie Policy.`,
  localStorageObjectName: 'Zig-Zag'
};

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('Loaded')
  CustomConsentPopup.init(options)
});


