/**
 *  * An object `options`^ is used to pass user settings to a banner
 */
const options = {
  show: true,
  negativeButtonText: 'No',
  backgroundBlock: true,
  backgroundBlockOpacity: 0.8,
  expirationTimer: 15,
  hideBannerOnOverlayClick: false,
  hideBannerOnNegativeClick: true,
};
/**
 * This class `ConfirmationFlag` is responsible for creating and managing a customizable confirmation banner.
 */
class ConfirmationFlag {
  static cssContentBasic = `
  #confirmation-banner-overlay{
      position: fixed;
      min-height: 100%;
      width: 100%;
      top: 0;
  }
  #confirmation-banner{
      background-color: var(--main_color);
      border-radius: 5px;
      z-index: 1000;
      padding: 16px;
      text-align: center;
      position: fixed;
      transform: translate(-50%, -50%);
      border: 2px solid var(--accent_color);
  }
  #confirmation-banner > *{
      text-align: center;
  }
  #text_span{
      height: 70%;
      display: flex;
      flex-direction: column;
  }
  #confirmation-banner h3{
      margin: 0;
      font-size: 24px;
      color: rgb(62,109,236);
  }
  #confirmation-banner p{
      margin: 16px 0 16px 0;
      text-align: left;
      font-family: sans-serif;
      font-size: 16px;
      color: rgb(0,0,0);
  }
  #buttons_span{
      margin: 0;
      display: flex;
      height: 30%;
      justify-content: center;
  }
  .confirmation-banner-buttons{
      font-family:sans-serif;
      width: 30%;
      height: 40px;
      border-radius: 5px;
      margin: 0 16px 0 16px;
      cursor: pointer;
  }
  #positive-button{
      background-color: var(--accent_color);
      border-color: var(--accent_color);
      color: var(--main_color);
  }
  #negative-button{
      background-color: var(--main_color);
      border-color: var(--accent_color);
      color: var(--accent_color);
  }`;
  static bannerPosition1 = `#confirmation-banner{
      top: 50%;
      left: 50%;
      width: 448px;
      height: 256px;
  }`;
  static bannerPosition2 = `#confirmation-banner{
      bottom: 0;
      left: 50%;
      width: 560px; 
      height: 200px; 
      transform: translateX(-50%);
  }`;
  static bannerPosition3 = `#confirmation-banner{
      top: 0;
      left: 50%;
      width: 560px; 
      height: 200px; 
      transform: translateX(-50%);
  }`;
  /**
   * Default configuration options for the confirmation banner.
   * These options define the initial state and behavior of the banner,
   * and can be overridden by user-provided settings.
   *
   * @property {boolean} show - Banner state: shown if true, hidden if false.
   * @property {boolean} backgroundBlock - If true, the banner overlay is blocked; if false, it's interactive.
   * @property {number} backgroundBlockOpacity - Opacity intensity of the background (0 to 1) when backgroundBlock is true.
   * @property {string} position - A predefined stylesheet determining the banner's positioning and sizing.
   *                              Possible values: 'ConfirmationFlag.bannerPosition1', 'ConfirmationFlag.bannerPosition2',
   *                              'ConfirmationFlag.bannerPosition3'.
   * @property {number|boolean} expirationTimer - Time in seconds to automatically change 'show' from false to true
   *                                              after it's set to false by clicking the positive button. False to disable.
   * @property {number|boolean} expirationDate - The timestamp from which 'show' becomes true. Automatically calculated,
   *                                             should not be set manually.
   * @property {string} bannerHeaderText - Text displayed in the banner's textSpan (inside an <h3> element).
   * @property {string} bannerText - Text displayed in the banner's textSpan (inside a <p> element).
   * @property {string} positiveButtonText - Text for the positive (confirmation) button.
   * @property {string} negativeButtonText - Text for the negative (decline) button.
   * @property {boolean} hideBannerOnNegativeClick - Whether to hide the banner when the negative button is clicked.
   */
  static defaultOptions = {
    show: false,
    backgroundBlock: false,
    backgroundBlockOpacity: 1,
    position: ConfirmationFlag.bannerPosition1,
    hideBannerOnOverlayClick: false,
    expirationTimer: false,
    expirationDate: false,
    bannerHeaderText: 'Cookies & Privacy',
    bannerText: `We use cookies on this site to enhance your user experience, analyze site usage,
                and assist in our marketing efforts. By clicking "Accept", you consent to the 
                storing of cookies on your device. For more information on how we use cookies and your 
                related choices, please review our Cookie Policy.`,
    positiveButtonText: 'Confirm',
    negativeButtonText: 'Decline',
    hideBannerOnNegativeClick: true,
  };
    /**
   * Creates an instance of the class with customized options.
   * This constructor merges the default options with the options provided by the user (if any).
   * The resulting options object (`this.options`) will be used throughout other methods of the class.
   *
   * Note: If a user provides an option, it overrides the corresponding default option.
   *
   * @param {object} [options] - An object with user-defined options. It may include a subset of the possible options.
   */
  constructor(options) {
    this.options = Object.assign(ConfirmationFlag.defaultOptions, options);
    console.log(this.options);
  }

  /**
   * This function is intended to be overridden with custom behavior when the positive button is clicked.
   */
  onPositiveButtonClickСallback() {
    console.log('Positive button clicked');
  }
  /**
 * This function is intended to be overridden with custom behavior when the negative button is clicked.
 */
  onNegativeButtonClickCallback() {
    console.log('Negative button clicked');
  }
  /**
     * createBlobLinkCss merges basic css of a banner and optional into a Blob,
     * Creates a link which allows this Blob to be refered as stylesheet
     * @param {string} cssContentOptional - A string containing a piece of css optionaly chosen by user
     * @return {HTMLLinkElement}A link element that can be appended to a document to apply the combined CSS styles.
     */
  static createBlobLinkCss(cssContentOptional) {
    const blob = new Blob([ConfirmationFlag.cssContentBasic, cssContentOptional], {type: 'text/css'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    return link;
  }
  /**
   * Creates and appends an HTML element to a specified parent element based on given parameters.
   *
   * @param {string} type - The type of the HTML element to be created (e.g., 'div', 'span').
   * @param {Object} attributes - An object containing key-value pairs representing the attributes of the element.
   * @param {HTMLElement} parent - The parent element to which the newly created element will be appended.
   * @param {string} [innerHTML=null] - The inner HTML content of the created element. Optional.
   * @return {HTMLElement} The newly created and appended HTML element.
   */
  static createAndAppendElement(type, attributes, parent, innerHTML = null) {
    const element = document.createElement(type);
    Object.entries(attributes).forEach(([key, value]) =>{
      element.setAttribute(key, value);
    });
    if (innerHTML) element.innerHTML = innerHTML;
    parent.appendChild(element);
    return element;
  }
  /**
   * After DOMcontent is loaded initilizes a new ConfirmationFlag instance based on options provided by user.
   * And then calls a render function on the newly created object
   * @const {object} options - An object with settings provided by user
   */
  static init() {
    // document.addEventListener('DOMContentLoaded', function() {
    const bannerFlag = new ConfirmationFlag(options);
    bannerFlag.render();
    // }); eventlistener is dead because we're alredy using one in main js
  }

  /**
   * Renders the confirmation banner based on options defined by a user and state object which is stored in localstorage.
   * Firstly, this method retrieves the 'confirmationFlag' from local storage to determine banner's behaviour.
   * Some of confirmationFlag.options get updated.
   * Note: ways of banner's behaviour are desribed right above defaultOptions constant
   * Then it creates banner HTML elements and appends them to the document body.
   * Event listeners are attached to positive and negative buttons to the banner for user interaction.
  */
  render() {
    let flag = JSON.parse(localStorage.getItem('confirmationFlag'));
    console.log(this.options.expirationTimer);
    const currentDateAndTime = new Date;
    const currentDateAndTimeInSeconds = Math.floor(currentDateAndTime.getTime()/1000);
    /*
      if (this.changeExpirationDateWhenTimerChanges){
        if (this.options.expirationTimer!==flag.options.expirationTimer) {
          flag.options.expirationDate = currentDateAndTimeInSeconds + this.options.expirationTimer;
          console.log('tut',flag.options.expirationDate);
        }
      }
      */
    if (flag) {
      const actualShow = flag.options.show;
      const actualExpirationDate = (this.options.expirationTimer!==flag.options.expirationTimer)?
        currentDateAndTimeInSeconds + this.options.expirationTimer:
        flag.options.expirationDate;
      flag = this;
      flag.options.show = actualShow;
      flag.options.expirationDate = actualExpirationDate;
      console.log('tut', flag.options.expirationDate, actualExpirationDate);
      //
      if (flag.options.expirationDate) {
        flag.options.show = (flag.options.expirationDate <= currentDateAndTimeInSeconds)? true: false;
        console.log('1');
        localStorage.setItem('confirmationFlag', JSON.stringify(flag));
      }
      console.log(flag.options.expirationDate, currentDateAndTimeInSeconds, flag.options.show );
      //
    } else {
      flag = this;
      flag.options.expirationDate = currentDateAndTimeInSeconds + this.options.expirationTimer;
    }
    console.log(flag);

    if (flag.options.show === true) {
      const bannerOverlay = document.createElement('div');
      bannerOverlay.id = 'confirmation-banner-overlay';
      const bannerWrapper = document.createElement('div');
      bannerWrapper.id = 'confirmation-banner-wrapper';
      const confirmationBanner = document.createElement('div');
      confirmationBanner.id = 'confirmation-banner';

      if (flag.options.backgroundBlock === false ) {
        bannerOverlay.style.pointerEvents = 'none';
        confirmationBanner.style.pointerEvents = 'auto';
      } else {
        if (flag.options.backgroundBlockOpacity) {
          bannerOverlay.style.backgroundColor = `rgba(125, 125, 125, ${flag.options.backgroundBlockOpacity})`;
        }
      }


      const textSpan = this.constructor.createAndAppendElement('span', {id: 'text_span'}, confirmationBanner);
      this.constructor.createAndAppendElement('h3', {}, textSpan, flag.options.bannerHeaderText);
      this.constructor.createAndAppendElement('p', {}, textSpan, flag.options.bannerText);
      const buttonsSpan = this.constructor.createAndAppendElement('span', {id: 'buttons_span'}, confirmationBanner);
      this.constructor.createAndAppendElement('button', {id: 'positive-button', class: 'confirmation-banner-buttons'}, buttonsSpan, flag.options.positiveButtonText);
      this.constructor.createAndAppendElement('button', {id: 'negative-button', class: 'confirmation-banner-buttons'}, buttonsSpan, flag.options.negativeButtonText);
      bannerWrapper.appendChild(confirmationBanner);
      bannerOverlay.appendChild(bannerWrapper);
      document.body.appendChild(bannerOverlay);
      const linkElement = this.constructor.createBlobLinkCss(flag.options.position);
      document.head.appendChild(linkElement);

      bannerOverlay.addEventListener('click', function(event) {
        if (event.target === bannerOverlay) {
          if (flag.options.backgroundBlock === true && flag.options.hideBannerOnOverlayClick === true) {
            bannerOverlay.style.display = 'none';
          }
        }
        if (event.target.id === 'negative-button') {
          // колбэк перед но
          if (flag.options.hideBannerOnNegativeClick) {
            bannerOverlay.style.display = 'none';
            console.log('1');
            flag.onNegativeButtonClickCallback();
          }
        }

        if (event.target.id === 'positive-button') {
          flag.options.show = false;
          flag.options.expirationDate = (flag.options.expirationDate)? currentDateAndTimeInSeconds + flag.options.expirationTimer: null;
          localStorage.setItem('confirmationFlag', JSON.stringify(flag));
          console.log('2');
          bannerOverlay.style.display = 'none';
          flag.onPositiveButtonClickСallback();
        }
      });
    }
  }
}

export default ConfirmationFlag;
