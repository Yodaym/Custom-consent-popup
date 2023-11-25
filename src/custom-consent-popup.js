import PopupCss from './popup-css';
/**
 * This class `CustomConsentPopup` is responsible for creating and managing a customizable confirmation banner.
 */
class CustomConsentPopup {
  /**
   * Default configuration options for the confirmation banner.
   * These options define the initial state and behavior of the banner,
   * and can be overridden by user-provided settings.
   *
   * @property {boolean} show - Banner state: shown if true, hidden if false.
   * @property {boolean} backgroundBlock - If true, the banner overlay is blocked; if false, it's interactive.
   * @property {number} backgroundBlockOpacity - Opacity intensity of the background (0 to 1) when backgroundBlock is true.
   * @property {array} backgroundBlockColor - Color of the background (zero element - red, first - green, second - blue)
   * when backgroundBlock is true
   * @property {string} position - A predefined stylesheet determining the banner's positioning and sizing.
   *                              Possible values: 'CustomConsentPopup.bannerPosition1', 'CustomConsentPopup.bannerPosition2',
   *                              'CustomConsentPopup.bannerPosition3'.
   * @property {number|boolean} expirationTimer - Time in seconds to automatically change 'show' from false to true
   *                                              after it's set to false by clicking the positive button. False to disable.
   * @property {number|boolean} expirationDate - The timestamp from which 'show' becomes true. Automatically calculated,
   *                                             should not be set manually.
   * @property {string} bannerHeaderText - Text displayed in the banner's textSpan (inside an <h3> element).
   * @property {string} bannerText - Text displayed in the banner's textSpan (inside a <p> element).
   * @property {string} positiveButtonText - Text for the positive (confirmation) button.
   * @property {string} negativeButtonText - Text for the negative (decline) button.
   * @property {boolean} hideBannerOnNegativeClick - Whether to hide the banner when the negative button is clicked.
   * @property {string} localStorageObjectName - A name for the local storage object where expiration timer is set
   */
  static defaultOptions = {
    show: false,
    backgroundBlock: false,
    backgroundBlockOpacity: 1,
    backgroundBlockColor: [200, 131, 0],
    position: PopupCss.BANNER_POSITION_1,
    hideBannerOnOverlayClick: false,
    expirationTimer: false,
    bannerHeaderText: 'Cookies & Privacy',
    bannerText: 'bannerText',
    positiveButtonText: 'Confirm',
    negativeButtonText: 'Decline',
    hideBannerOnNegativeClick: true,
    localStorageObjectName: 'custom-consent-popup-timer',
    onPositiveButtonClickСallback: function() {
      console.log('Positive button clicked');
    },
    onNegativeButtonClickCallback: function() {
      console.log('Negative button clicked');
    },
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
    this.options = Object.assign(CustomConsentPopup.defaultOptions, options);
    console.log(this.options);
  }

  /**
   * This function is intended to be overridden with custom behavior when the positive button is clicked.
   */
  onPositiveButtonClick() {
    this.options.onPositiveButtonClickСallback();
  }
  /**
 * This function is intended to be overridden with custom behavior when the negative button is clicked.
 */
  onNegativeButtonClick() {
    this.options.onNegativeButtonClickCallback();
  }
  /**
     * createBlobLinkCss merges basic css of a banner and optional into a Blob,
     * Creates a link which allows this Blob to be refered as stylesheet
     * @param {string} cssContentOptional - A string containing a piece of css optionaly chosen by user
     * @return {HTMLLinkElement}A link element that can be appended to a document to apply the combined CSS styles.
     */
  static createBlobLinkCss(cssContentOptional) {
    const blob = new Blob([PopupCss.CSSCONTENT_BASIC, cssContentOptional], {type: 'text/css'});
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
 * Calculates the current date and time in seconds.
 * This method converts the current date and time to a Unix timestamp in seconds.
 *
 * @return {number} The current date and time as a Unix timestamp in seconds.
 */
  currentDateAndTimeInSeconds() {
    const currentDateAndTime = new Date;
    const currentDateAndTimeInSeconds = Math.floor(currentDateAndTime.getTime()/1000);
    return currentDateAndTimeInSeconds;
  }
  /**
 * Manages the background block behavior of the banner.
 * This method sets the pointer events and background color based on the options.
 * If `backgroundBlock` is false, pointer events are disabled, otherwise, the background color is set based on `backgroundBlockColor` and `backgroundBlockOpacity`.
 */
  backgroundBlockManager() {
    if (!this.options.backgroundBlock) {
      this.bannerOverlay.style.pointerEvents = 'none';
      this.confirmationBanner.style.pointerEvents = 'auto';
    } else {
      if (this.options.backgroundBlockOpacity || this.options.backgroundBlockColor) {
        this.bannerOverlay.style.backgroundColor = `rgba(${this.options.backgroundBlockColor[0]},
        ${this.options.backgroundBlockColor[1]},${this.options.backgroundBlockColor[2]}, ${this.options.backgroundBlockOpacity})`;
      }
    }
  }
  /**
 * Sets up event listeners for click events on the banner.
 * This method handles the functionality when the overlay, positive, or negative buttons are clicked.
 * It includes hiding the banner and invoking respective callback functions for positive and negative button clicks.
 */
  onClickProcessor() {
    this.bannerOverlay.addEventListener('click', (event) => {
      if (event.target === this.bannerOverlay) {
        if (this.options.backgroundBlock === true && this.options.hideBannerOnOverlayClick === true) {
          this.bannerOverlay.style.display = 'none';
        }
      }
      if (event.target.id === 'custom-consent-popup-negative-button') {
        if (this.options.hideBannerOnNegativeClick === true) {
          this.bannerOverlay.style.display = 'none';
          console.log('1');
          this.onNegativeButtonClick();
        }
      }

      if (event.target.id === 'custom-consent-popup-positive-button') {
        this.consentDate = this.currentDateAndTimeInSeconds();
        localStorage.setItem(this.options.localStorageObjectName, this.consentDate);
        console.log('2');
        this.bannerOverlay.style.display = 'none';
        this.onPositiveButtonClick();
      }
    });
  }
  /**
 * Determines whether the banner should be rendered based on the consent date and expiration timer.
 * It retrieves the old consent date from local storage and compares it with the current time and expiration timer to decide if the banner should be shown.
 * If the banner needs to be shown, it calls the `render` method.
 */
  shouldItBeRendered() {
    let oldConsentDate = localStorage.getItem(this.options.localStorageObjectName) || 0;
    oldConsentDate = (oldConsentDate && oldConsentDate !== 0) ? parseInt(oldConsentDate) : 0;
    this.options.show = (oldConsentDate + this.options.expirationTimer <= this.currentDateAndTimeInSeconds());
    if (this.options.show) {
      this.render();
    }
  }
  /**
   * After DOMcontent is loaded initilizes a new CustomConsentPopup instance based on options provided by user.
   * And then calls a render function on the newly created object
   * @param {object} options - An object with settings provided by user
   */
  static init(options) {
    const banner = new CustomConsentPopup(options);
    banner.shouldItBeRendered();
  }

  /**
   * Renders the confirmation banner based on options defined by a user and state object which is stored in localstorage.
   * Firstly, this method retrieves the 'CustomConsentPopup' from local storage to determine banner's behaviour.
   * Some of CustomConsentPopup.options get updated.
   * Note: ways of banner's behaviour are desribed right above defaultOptions constant
   * Then it creates banner HTML elements and appends them to the document body.
   * Event listeners are attached to positive and negative buttons to the banner for user interaction.
  */
  render() {
    this.bannerOverlay = document.createElement('div');
    this.bannerOverlay.id = 'custom-consent-popup-overlay';
    this.bannerWrapper = document.createElement('div');
    this.bannerWrapper.id = 'custom-consent-popup-wrapper';
    this.confirmationBanner = document.createElement('div');
    this.confirmationBanner.id = 'custom-consent-popup-banner';

    this.backgroundBlockManager();

    const textSpan = this.constructor.createAndAppendElement('span', {id: 'custom-consent-popup-text-span'}, this.confirmationBanner);
    this.constructor.createAndAppendElement('h3', {}, textSpan, this.options.bannerHeaderText);
    this.constructor.createAndAppendElement('p', {}, textSpan, this.options.bannerText);
    const buttonsSpan = this.constructor.createAndAppendElement('span', {id: 'cu4stom-consent-popup-buttons-span'}, this.confirmationBanner);
    this.constructor.createAndAppendElement('button', {id: 'custom-consent-popup-positive-button', class: 'custom-consent-popup-buttons'}, buttonsSpan, this.options.positiveButtonText);
    this.constructor.createAndAppendElement('button', {id: 'custom-consent-popup-negative-button', class: 'custom-consent-popup-buttons'}, buttonsSpan, this.options.negativeButtonText);
    this.bannerWrapper.appendChild(this.confirmationBanner);
    this.bannerOverlay.appendChild(this.bannerWrapper);
    document.body.appendChild(this.bannerOverlay);
    const linkElement = this.constructor.createBlobLinkCss(this.options.position);
    document.head.appendChild(linkElement);

    this.onClickProcessor();
  }
}

export default CustomConsentPopup;
