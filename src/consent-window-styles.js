export default `
#custom-consent-popup-overlay {
    z-index: 10000;
    position: fixed;
    min-height: 100%;
    width: 100%;
    top: 0;
}
#custom-consent-popup-modalWindow {
    background-color: rgb(255, 255, 255); 
    z-index: 1000;
    padding: 16px;
    text-align: center;
    position: fixed;
    transform: translate(-50%, -50%);
    border: 2px solid rgb(62, 109, 236); 
    width: 448px;
}
#custom-consent-popup-modalWindow > * {
    text-align: center;
}
#custom-consent-popup-text-span {
    height: 70%;
    display: flex;
    flex-direction: column;
}
#custom-consent-popup-modalWindow h3 {
    margin: 0;
    font-size: 24px;
    color: rgb(62, 109, 236); 
}
#custom-consent-popup-modalWindow p {
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
    margin: 16px;
    cursor: pointer;
    line-height: 18px;
}
#custom-consent-popup-positive-button {
    background-color: rgb(62, 109, 236); 
    border: 2px solid rgb(62, 109, 236); 
    color: rgb(255, 255, 255); 
}
#custom-consent-popup-negative-button {
    background-color: rgb(255, 255, 255); 
    border: 2px solid rgb(62, 109, 236); 
    color: rgb(62, 109, 236); 
}
#custom-consent-popup-modalWindow[data-position = "center"] {
    top: 50%;
    left: 50%;
}
#custom-consent-popup-modalWindow[data-position = "bottom"] {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 0;
}
#custom-consent-popup-modalWindow[data-position = "top"] {
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-top: 0;
}
@media only screen and (max-width: 500px) {
    #custom-consent-popup-buttons-span {
        flex-direction: column;
        align-items: center;
    }
    .custom-consent-popup-buttons {
        margin: 5%;
        width: 80%;
    }
    #custom-consent-popup-positive-button {
        background-color: rgb(62, 109, 236); 
        border: 2px solid rgb(62, 109, 236); 
        color: rgb(255, 255, 255); 
    }
    #custom-consent-popup-negative-button {
        background-color: rgb(255, 255, 255); 
        border: 2px solid rgb(62, 109, 236); 
        color: rgb(62, 109, 236); 
    }
    #custom-consent-popup-modalWindow {
        max-height: 90%;
        width: 98%;
        box-sizing: border-box;
    }
}
`;
