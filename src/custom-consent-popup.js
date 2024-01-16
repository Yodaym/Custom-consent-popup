import consentWindowStyles from './consent-window-styles.js';
/**
 * This class `CustomConsentPopup` is responsible for creating and managing a customizable confirmation modalWindow.
 */
class CustomConsentPopup {
  /**
   * Default configuration options for the confirmation modalWindow.
   * These options define the initial state and behavior of the modalWindow,
   * and can be overridden by user-provided settings.
   *
   * @property {boolean} show - modalWindow state: shown if true, hidden if false.
   * @property {boolean} backgroundBlock - If true, the modalWindow overlay is blocked; if false, it's interactive.
   * @property {string} backgroundBlockColor - Color of the background when backgroundBlock is true.
   * @property {number} position - A predefined stylesheet determining the modalWindow's positioning and sizing.
   *                              Possible values: "center", "bottom", "top".
    * @property {number|boolean} consentExpirationTime - Defines the behavior for displaying the consent modal window based on user interactions. 
 *     - If a number: Represents the time in seconds after which the modal window should reappear, calculated from the time consent was last given. 
 *       The modal will be displayed again after this duration has passed.
 *     - If false: The modal window is shown only once to the user. Once the user consents, it won't appear again in future sessions. 
 *       This is handled by storing the consent status in local storage.
 *     - If true: The modal window appears once per browser session. This means it will be shown once, and after the user consents, 
 *       it will not appear again until the browser is restarted or the session is otherwise reset. This is managed using session storage.
   * @property {string} modalWindowHeaderHTML - HTML content displayed in the modalWindow's header.
   * @property {string} modalWindowBodyHTML - HTML content displayed in the modalWindow.
   * @property {string} positiveButtonText - Text for the positive (confirmation) button.
   * @property {string} negativeButtonText - Text for the negative (decline) button.
   * @property {boolean} hidemodalWindowOnNegativeClick - Whether to hide the modalWindow when the negative button is clicked.
   * @property {string} localStorageObjectName - A name for the local storage object where consent date is stored.
   * @property {boolean} blockScroll - If true, page scrolling is blocked when the modalWindow is displayed.
   * @property {boolean} removeAllContentOnNegativeClick - If true, removes all content from the document body when the negative button is clicked.
   * @property {function} npm - Callback function invoked when the positive button is clicked.
   * @property {function} onNegativeButtonClickCallback - Callback function invoked when the negative button is clicked.
   * @property {function} onPreviousConsentFoundCallback - Callback function invoked when previous consent is found.
   * @property {function} onmodalWindowRenderedCallback - Callback function invoked when the modalWindow is rendered.
   */
  static defaultOptions = {
    backgroundBlock: false,
    backgroundBlockColor: 'rgba(0, 0, 0, 0.7)',
    position: 'center',
    hidemodalWindowOnOverlayClick: false,
    consentExpirationTime: 5,
    modalWindowHTML: `<h3>Cookies & Privacy</h3><p>Welcome to our website! To make your experience smooth and personalized, we use cookies and similar technologies. Here's a quick overview:

    Essential Cookies: These are necessary for the website's core functions and can't be turned off. They include things like security, network management, and accessibility.
    </p>`,
    positiveButtonText: 'Confirm',
    negativeButtonText: 'Decline',
    hidemodalWindowOnNegativeClick: true,
    localStorageObjectName: 'custom-consent-popup-timer',
    blockScroll: true,
    removeAllContentOnNegativeClick: false,
    onlyPositiveButtonOnModalWindow: false,
    onPositiveButtonClickCallback: function(object) {
    },
    onNegativeButtonClickCallback: function(object) {
    },
    onPreviousConsentFoundCallback: function(object) {
    },
    onmodalWindowRenderedCallback: function(object) {
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
     * Sets the consent date, updates the local storage, hides the modalWindow, and calls the positive button click callback.
     * @param {event} event - The event object associated with the click event.
     * @private
     */
  _processPositiveButtonClick(event) {
    if (event.target.id === 'custom-consent-popup-positive-button') {
      this.consentDate = this.currentDateAndTime();
      localStorage.setItem(this.options.localStorageObjectName, this.consentDate);
      this.modalWindowOverlay.style.display = 'none';
      if (this.options.consentExpirationTime === true) {sessionStorage.setItem(this.options.localStorageObjectName, true)}
      if (this.options.consentExpirationTime === false) {
        localStorage.setItem(this.options.localStorageObjectName, 'true');
      }
      this.options.onPositiveButtonClickCallback(this);
      this.unblockScroll();
    }
  }
  /**
     * Handles the behavior when the negative (decline) button is clicked.
     * Hides the modalWindow if configured to do so, and calls the negative button click callback.
     * @param {event} event - The event object associated with the click event.
     * @private
     */
  _processNegativeButtonClick(event) {
    if (event.target.id === 'custom-consent-popup-negative-button') {
      if (this.options.hidemodalWindowOnNegativeClick === true) {
        this.modalWindowOverlay.style.display = 'none';
        this.options.onNegativeButtonClickCallback(this);
        this.unblockScroll();
      }
      if (this.options.removeAllContentOnNegativeClick) {
        document.body.innerHTML = '';
      }
    }
  }
  /**
     * Processes click events on the modalWindow overlay.
     * Checks the conditions for hiding the modalWindow when the overlay is clicked and executes the appropriate actions.
     * @param {event} event - The event object associated with the click event.
     * @private
     */
  _processOverlayClick(event) {
    if (event.target === this.modalWindowOverlay) {
      if (this.options.backgroundBlock === true && this.options.hidemodalWindowOnOverlayClick === true) {
        this.modalWindowOverlay.style.display = 'none';
        this.unblockScroll();
      }
    }
  }
  /**
     * Restores the ability to scroll the page if it was previously blocked by the modalWindow.
     * @private
     */
  unblockScroll() {
    if (this.options.blockScroll) {
      document.body.style.overflow = 'visible';
    }
  }
  /**
     * createBlobLinkCss merges basic css of a modalWindow and optional into a Blob,
     * Creates a link which allows this Blob to be refered as stylesheet
     * @param {string} cssContentOptional - A string containing a piece of css optionaly chosen by user
     * @return {HTMLLinkElement}A link element that can be appended to a document to apply the combined CSS styles.
     * @private
     */
  static createBlobLinkCss() {
    const blob = new Blob([consentWindowStyles], {type: 'text/css'});
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
  /**
   * The method which might be used to manually hide modalWindow
   */
  static hidemodalWindow() {
    this.modalWindowOverlay.style.display = 'none';
    if (this.options.blockScroll) {
      this.unblockScroll();
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
     * Manages the background blocking behavior of the modalWindow.
     * Sets pointer events and background color based on the modalWindow's configuration options.
     * @private
     */
  backgroundBlockManager() {
    if (!this.options.backgroundBlock) {
      this.modalWindowOverlay.style.pointerEvents = 'none';
      this.confirmationmodalWindow.style.pointerEvents = 'auto';
    } else {
      if (this.options.backgroundBlockColor) {
        this.modalWindowOverlay.style.backgroundColor = this.options.backgroundBlockColor;
      }
    }
    if (this.options.blockScroll) {
      document.body.style.overflow = 'hidden';
    }
  }
  /**
     * Attaches event listeners for handling clicks on the positive and negative buttons, as well as the modalWindow overlay.
     * @private
     */
  _assignButtonEvents() {
    this.modalWindowOverlay.addEventListener('click', (event) => {
      this._processOverlayClick(event);
      this._processNegativeButtonClick(event);
      this._processPositiveButtonClick(event);
    });
  }
  /**
     * Determines whether the modalWindow should be displayed based on the stored consent date and the configured expiration timer.
     * This method helps in managing the display logic of the modalWindow based on user's previous interactions.
     * @return {boolean} Returns true if the modalWindow should be rendered, otherwise false.
     */
  shouldItBeRendered() {
    this.consentDate = parseInt(localStorage.getItem(this.options.localStorageObjectName) || '0');
    if (typeof this.options.consentExpirationTime === 'number' ) {
      return this.show = ((this.consentDate + this.options.consentExpirationTime*1000) <= this.currentDateAndTime());
    }
    if (this.options.consentExpirationTime === true){
      let x = sessionStorage.getItem(this.options.localStorageObjectName)
      if (x === null || x === false) {
        return this.show = true
      } else { 
        if (x === true) {
          return this.show = false
        }
      }
    }
    if (this.options.consentExpirationTime === false){ 
      const consentGiven = localStorage.getItem(this.options.localStorageObjectName);
      return consentGiven === null;
    }
    // what is consentExpirationTime is null, false and others shit
  }
  /**
     * Initializes a new instance of `CustomConsentPopup` with the provided options.
     * If the modalWindow needs to be rendered, it calls the `render` method; otherwise, it invokes the callback for previously found consent.
     * @param {object} options - Configuration options provided by the user.
     * @static
     */
  static init(options) {
    const modalWindow = new CustomConsentPopup(options);
    if (modalWindow.shouldItBeRendered()) {
      modalWindow.render();
    } else {
      modalWindow.options.onPreviousConsentFoundCallback(this);
    }
  }

  /**
     * Renders the confirmation modalWindow based on the user-defined options and the state object stored in local storage.
     * It creates the necessary HTML elements for the modalWindow and appends them to the document body.
     * Also, it attaches event listeners for user interactions with the modalWindow.
     */
  render() {
    this.modalWindowOverlay = document.createElement('div');
    this.modalWindowOverlay.id = 'custom-consent-popup-overlay';
    this.modalWindowWrapper = document.createElement('div');
    this.modalWindowWrapper.id = 'custom-consent-popup-wrapper';
    this.confirmationmodalWindow = document.createElement('div');
    this.confirmationmodalWindow.id = 'custom-consent-popup-modalWindow';
    this.confirmationmodalWindow.setAttribute('data-position', this.options.position);
    this.backgroundBlockManager();

    const textSpan = this.constructor.createAndAppendElement('span', {id: 'custom-consent-popup-text-span'}, this.confirmationmodalWindow);
    textSpan.innerHTML = `${this.options.modalWindowHTML}`;
    const buttonsSpan = this.constructor.createAndAppendElement('span', {id: 'custom-consent-popup-buttons-span'}, this.confirmationmodalWindow);
    this.constructor.createAndAppendElement('button', {id: 'custom-consent-popup-positive-button', class: 'custom-consent-popup-buttons'}, buttonsSpan, this.options.positiveButtonText);
    if (!this.options.onlyPositiveButtonOnModalWindow){
      this.constructor.createAndAppendElement('button', {id: 'custom-consent-popup-negative-button', class: 'custom-consent-popup-buttons'}, buttonsSpan, this.options.negativeButtonText);
    }
    this.modalWindowWrapper.appendChild(this.confirmationmodalWindow);
    this.modalWindowOverlay.appendChild(this.modalWindowWrapper);
    document.body.appendChild(this.modalWindowOverlay);
    const linkElement = this.constructor.createBlobLinkCss();
    document.head.appendChild(linkElement);
    this.options.onmodalWindowRenderedCallback();

    this._assignButtonEvents();
  }
}

export default CustomConsentPopup;
