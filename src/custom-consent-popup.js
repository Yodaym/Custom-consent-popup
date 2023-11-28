import ConsentWindowStyles from './consent-window-styles';
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
   * @property {array} backgroundBlockColor - Color of the background (zero element - red, first - green, second - blue)
   * when backgroundBlock is true
   * @property {number} position - A predefined stylesheet determining the banner's positioning and sizing.
   *                              Possible values: 1, 2, 3.
   * @property {number|boolean} consentExpirationTime - Time in seconds to automatically change 'show' from false to true
   *                                              after it's set to false by clicking the positive button. False to disable.
   * @property {string} bannerHeaderText - Text displayed in the banner's header.
   * @property {string} bannerText - Text displayed in the banner.
   * @property {string} positiveButtonText - Text for the positive (confirmation) button.
   * @property {string} negativeButtonText - Text for the negative (decline) button.
   * @property {boolean} hideBannerOnNegativeClick - Whether to hide the banner when the negative button is clicked.
   * @property {string} localStorageObjectName - A name for the local storage object where expiration timer is set
   */
  static defaultOptions = {
    show: false,
    backgroundBlock: false,
    backgroundBlockColor: "rgba(0, 0, 0, 0.7)",
    position: 1,
    hideBannerOnOverlayClick: false,
    consentExpirationTime: null,
    bannerHeaderHTML: '<h3>Cookies & Privacy</h3>',
    bannerBodyHTML: '<p>bannerText<p>',
    positiveButtonText: 'Confirm',
    negativeButtonText: 'Decline',
    hideBannerOnNegativeClick: true,
    localStorageObjectName: 'custom-consent-popup-timer',
    blockScroll: true,
    removeAllContentOnNegativeClick: false,
    onPositiveButtonClickСallback: function(object) {
    },
    onNegativeButtonClickCallback: function(object) {
    },
    onPreviousConsentFoundCallback: function(object) {
    },
    onBannerRenderedCallback: function(object) {
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
    this.options = Object.assign({}, CustomConsentPopup.defaultOptions, options);
  }

  /**
     * Handles the behavior when the positive (confirmation) button is clicked.
     * Sets the consent date, updates the local storage, hides the banner, and calls the positive button click callback.
     * @param {event} event - The event object associated with the click event.
     * @private
     */
  _processPositiveButtonClick(event) {
    if (event.target.id === 'custom-consent-popup-positive-button') {
      this.consentDate = this.currentDateAndTime()
      localStorage.setItem(this.options.localStorageObjectName, this.consentDate);
      this.bannerOverlay.style.display = 'none';
      this.options.onPositiveButtonClickСallback(this);
      this.unblockScroll();
    }
  }
  /**
     * Handles the behavior when the negative (decline) button is clicked.
     * Hides the banner if configured to do so, and calls the negative button click callback.
     * @param {event} event - The event object associated with the click event.
     * @private
     */
  _processNegativeButtonClick(event) {
    if (event.target.id === 'custom-consent-popup-negative-button') {
      if (this.options.hideBannerOnNegativeClick === true) {
        this.bannerOverlay.style.display = 'none';
        this.options.onNegativeButtonClickCallback(this);
        this.unblockScroll();
      }
      if (this.options.removeAllContentOnNegativeClick) {
        document.body.innerHTML = ''
        console.log(document.body.innerHTML);
      }
    }
  }
  /**
     * Processes click events on the banner overlay.
     * Checks the conditions for hiding the banner when the overlay is clicked and executes the appropriate actions.
     * @param {event} event - The event object associated with the click event.
     * @private
     */
  _processOverlayClick(event) {
    if (event.target === this.bannerOverlay) {
      if (this.options.backgroundBlock === true && this.options.hideBannerOnOverlayClick === true) {
        this.bannerOverlay.style.display = 'none';
        this.unblockScroll();
      }
    }
  }
  /**
     * Restores the ability to scroll the page if it was previously blocked by the banner.
     * @private
     */
  unblockScroll() {
    if (this.options.blockScroll) {
      document.body.style.overflow = 'visible';
    }
  }
  /**
     * createBlobLinkCss merges basic css of a banner and optional into a Blob,
     * Creates a link which allows this Blob to be refered as stylesheet
     * @param {string} cssContentOptional - A string containing a piece of css optionaly chosen by user
     * @return {HTMLLinkElement}A link element that can be appended to a document to apply the combined CSS styles.
     * @private
     */
  static createBlobLinkCss(cssContentOptional) {
    const blob = new Blob([ConsentWindowStyles.CSSCONTENT_BASIC, cssContentOptional], {type: 'text/css'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    return link;
  }
  /**
   * @param {string} number
   * @returns {string}
   * @private
   */

  static hideBanner() {
    this.bannerOverlay.style.display = 'none';
    if (this.options.blockScroll){
      this.unblockScroll()
    }
  }
  extractPositionCss(number) {
    const cssGetMethodName = 'BANNER_POSITION_' + number;
    if (typeof ConsentWindowStyles[cssGetMethodName] === 'string') {
      return ConsentWindowStyles[cssGetMethodName];
    } else {
      console.log('CustomConsentPopup.choosePosition parameter is wrong');
    }
  }
  /**
   * Creates and appends an HTML element to a specified parent element based on given parameters.
   *
   * @param {string} type - The type of the HTML element to be created (e.g., 'div', 'span').
   * @param {Object} attributes - An object containing key-value pairs representing the attributes of the element.
   * @param {HTMLElement} parent - The parent element to which the newly created element will be appended.
   * @param {string} [innerHTML=null] - The inner HTML content of the created element. Optional.
   * @return {HTMLElement} The newly created and appended HTML element.
   * @private
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
     * Calculates and returns the current date and time as a Unix timestamp in seconds.
     * This is used for managing the consent expiration logic.
     * @return {number} The current date and time as a Unix timestamp in seconds.
     * @private
     */
  currentDateAndTime() {
    const currentDateAndTime = new Date;
    return Math.floor(currentDateAndTime.getTime());
  }
  /**
     * Manages the background blocking behavior of the banner.
     * Sets pointer events and background color based on the banner's configuration options.
     * @private
     */
  backgroundBlockManager() {
    if (!this.options.backgroundBlock) {
      this.bannerOverlay.style.pointerEvents = 'none';
      this.confirmationBanner.style.pointerEvents = 'auto';
    } else {
      if (this.options.backgroundBlockColor) {
        this.bannerOverlay.style.backgroundColor = this.options.backgroundBlockColor
        console.log(this.bannerOverlay.style.backgroundColor);
      }
    }
    if (this.options.blockScroll) {
      document.body.style.overflow = 'hidden';
    }
  }
  /**
     * Attaches event listeners for handling clicks on the positive and negative buttons, as well as the banner overlay.
     * @private
     */
  _assignButtonEvents() {
    this.bannerOverlay.addEventListener('click', (event) => {
      this._processOverlayClick(event);
      this._processNegativeButtonClick(event);
      this._processPositiveButtonClick(event);
    });
  }
  /**
     * Determines whether the banner should be displayed based on the stored consent date and the configured expiration timer.
     * This method helps in managing the display logic of the banner based on user's previous interactions.
     * @return {boolean} Returns true if the banner should be rendered, otherwise false.
     */
  shouldItBeRendered() {
    this.consentDate = parseInt(localStorage.getItem(this.options.localStorageObjectName) || '0');
    if (this.options.consentExpirationTime) {
      return this.show = ((this.consentDate + this.options.consentExpirationTime*1000) <= this.currentDateAndTime());
    } else {
      return this.show = false;
    }
    // what is consentExpirationTime is null, false and others shit
  }
  /**
     * Initializes a new instance of `CustomConsentPopup` with the provided options.
     * If the banner needs to be rendered, it calls the `render` method; otherwise, it invokes the callback for previously found consent.
     * @param {object} options - Configuration options provided by the user.
     * @static
     */
  static init(options) {
    const banner = new CustomConsentPopup(options);
    if (banner.shouldItBeRendered()) {
      banner.render();
    } else {
      banner.options.onPreviousConsentFoundCallback(this);
    }
  }

  /**
     * Renders the confirmation banner based on the user-defined options and the state object stored in local storage.
     * It creates the necessary HTML elements for the banner and appends them to the document body.
     * Also, it attaches event listeners for user interactions with the banner.
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
    textSpan.innerHTML = `${this.options.bannerHeaderHTML}${this.options.bannerBodyHTML}`
    const buttonsSpan = this.constructor.createAndAppendElement('span', {id: 'custom-consent-popup-buttons-span'}, this.confirmationBanner);
    this.constructor.createAndAppendElement('button', {id: 'custom-consent-popup-positive-button', class: 'custom-consent-popup-buttons'}, buttonsSpan, this.options.positiveButtonText);
    this.constructor.createAndAppendElement('button', {id: 'custom-consent-popup-negative-button', class: 'custom-consent-popup-buttons'}, buttonsSpan, this.options.negativeButtonText);
    this.bannerWrapper.appendChild(this.confirmationBanner);
    this.bannerOverlay.appendChild(this.bannerWrapper);
    document.body.appendChild(this.bannerOverlay);
    const linkElement = this.constructor.createBlobLinkCss(this.extractPositionCss(this.options.position));
    document.head.appendChild(linkElement);
    this.options.onBannerRenderedCallback();

    this._assignButtonEvents();
  }
}

export default CustomConsentPopup;
