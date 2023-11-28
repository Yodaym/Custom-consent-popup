class ConsentWindowStyles {
    static get CSSCONTENT_BASIC() {
        return `
            #custom-consent-popup-overlay {
                position: fixed;
                min-height: 100%;
                width: 100%;
                top: 0;
            }
            #custom-consent-popup-banner {
                background-color: rgb(255, 255, 255); /* Main color */
                border-radius: 5px;
                z-index: 1000;
                padding: 16px;
                text-align: center;
                position: fixed;
                transform: translate(-50%, -50%);
                border: 2px solid rgb(62, 109, 236); /* Accent color */
            }
            #custom-consent-popup-banner > * {
                text-align: center;
            }
            #custom-consent-popup-text-span {
                height: 70%;
                display: flex;
                flex-direction: column;
            }
            #custom-consent-popup-banner h3 {
                margin: 0;
                font-size: 24px;
                color: rgb(62, 109, 236); /* Accent color */
            }
            #custom-consent-popup-banner p {
                margin: 16px 0;
                text-align: left;
                font-family: sans-serif;
                font-size: 16px;
                color: rgb(0, 0, 0);
            }
            #custom-consent-popup-buttons-span {
                margin: 0;
                display: flex;
                height: 30%;
                justify-content: center;
            }
            .custom-consent-popup-buttons {
                font-family: sans-serif;
                width: 30%;
                height: 40px;
                border-radius: 5px;
                margin: 16px;
                cursor: pointer;
            }
            #custom-consent-popup-positive-button {
                background-color: rgb(62, 109, 236); /* Accent color */
                border-color: rgb(62, 109, 236); /* Accent color */
                color: rgb(255, 255, 255); /* Main color */
            }
            #custom-consent-popup-negative-button {
                background-color: rgb(255, 255, 255); /* Main color */
                border-color: rgb(62, 109, 236); /* Accent color */
                color: rgb(62, 109, 236); /* Accent color */
            }
        `;
    }

    static get BANNER_POSITION_1() {
        return `
            #custom-consent-popup-banner {
                top: 50%;
                left: 50%;
                width: 448px;
                height: 256px;
            }
        `;
    }

    static get BANNER_POSITION_2() {
        return `
            #custom-consent-popup-banner {
                bottom: 0;
                left: 50%;
                width: 560px; 
                height: 200px; 
                transform: translateX(-50%);
            }
        `;
    }

    static get BANNER_POSITION_3() {
        return `
            #custom-consent-popup-banner {
                top: 0;
                left: 50%;
                width: 560px; 
                height: 200px; 
                transform: translateX(-50%);
            }
        `;
    }
}

export default ConsentWindowStyles;