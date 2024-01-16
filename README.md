# CustomConsentPopup

## Overview
The `CustomConsentPopup` class is designed for creating and managing a customizable confirmation modal window. This modal window can be used for various purposes, such as user consent for cookies, terms of service, or other custom notifications.

## Features
- **Customizable Appearance**: The modal window's position and text can be customized.
- **Flexible Consent Management**: Offers various ways to manage user consent, including once per session, once per lifetime, or never showing the modal again.
- **Interactive Options**: Includes functionalities for positive and negative responses, with customizable callback functions.

## Configuration Options
The modal window's behavior and appearance can be configured with the following properties:

- `show`: Determines if the modal window is initially visible (true) or hidden (false).
- `backgroundBlock`: If true, the modal window overlay is non-interactive; if false, it allows interaction.
- `backgroundBlockColor`: Sets the color of the background overlay when `backgroundBlock` is true.
- `position`: A predefined stylesheet value ("center", "bottom", or "top") determining the modal window's position and size.
- `consentExpirationTime`: Manages the display of the consent modal based on user interactions.
  - If a number, represents the time in seconds to reappear after consent.
  - If false, shown only once per lifetime.
  - If true, shown once per browser session.
- `modalWindowHeaderHTML`: HTML content for the modal window's header.
- `modalWindowBodyHTML`: HTML content for the main body of the modal window.
- `positiveButtonText`: Text for the positive (confirmation) button.
- `negativeButtonText`: Text for the negative (decline) button.
- `hidemodalWindowOnNegativeClick`: Whether to hide the modal window on clicking the negative button.
- `localStorageObjectName`: Name for the local storage object to store consent date.
- `blockScroll`: Blocks page scrolling when the modal window is displayed if set to true.
- `removeAllContentOnNegativeClick`: If true, removes all content from the document body on a negative button click.
- `onlyPositiveButtonOnModalWindow`: If true, removes negative button from the modal window. False is default. 
- `onPositiveButtonClickcallback`: Callback function for when the positive button is clicked.
- `onNegativeButtonClickCallback`: Callback function for when the negative button is clicked.
- `onPreviousConsentFoundCallback`: Callback function for when previous consent is found.
- `onmodalWindowRenderedCallback`: Callback function for when the modal window is rendered.

## Usage
You can find demonstrational sample in examples/main.js
To use `CustomConsentPopup`, create an instance with your custom settings and initialize it when the DOM is fully loaded. This can be done using the `DOMContentLoaded` event:

```javascript
document.addEventListener('DOMContentLoaded', (event) => {
  // Define your custom settings 
  const options = {
    // Your options here
    position: 'center',
    consentExpirationTime: true,
    // ... other options ...
  };

  // Initialize the CustomConsentPopup with your options
  CustomConsentPopup.init(options);
  })
```
## Example
```javascript
examples/main.js
const options = {
  consentExpirationTime: 5,
  position: 'top',
  backgroundBlock: true,
  backgroundBlockColor:'rgba(125, 125, 125, 0.5)',
  blockScroll: false,
  onPositiveButtonClickCallback: function() {
    console.log('hey-hey');
  }
};

myConsentPopup.init(options);
```
## Installation

### Step 1: Install the Package
Open your terminal or command prompt and install `CustomConsentPopup` by running:
```bash
npm install custom-consent-popup@0.9.0
```
### Step 2: Importing in Your Project
Import `CustomConsentPopup` in your JavaScript or TypeScript project after installation.

#### JavaScript:
```
import CustomConsentPopup from 'custom-consent-popup';
```
### Step 3: Implement in HTML

To use ES6 modules like the import statement in a browser, ensure your HTML script tag includes type="module":
```
<script type="module" src="path/to/your/script.js"></script>
```