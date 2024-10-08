import { DOMElementsManager, PhoneNumbersProcessor, WaitingRoomManager } from './classes.js';

window.addEventListener('load', () => {
     const LINKS_SECTION_ID = 'links-section';
     const LINKS_CLASS_NAME = 'waiting-room-link';
     const domElementsManager = new DOMElementsManager();
     const generateLinksButton = document.getElementById('generate-links-button');
     const openAllLinksButton = document.getElementById('open-all-links-button');
     const removeAllLinksButton = document.getElementById('remove-all-links-button');
     generateLinksButton.addEventListener('click', () => {
          const localNumbersTextarea = document.getElementById('local-numbers');
          const countryCodeInput = document.getElementById('international-code');
          const messageToSend = document.getElementById('message').value;
          const phoneNumbers = new PhoneNumbersProcessor(localNumbersTextarea, countryCodeInput);
          const waitingRoom = new WaitingRoomManager(phoneNumbers.internationalNumbersArray, messageToSend);
          domElementsManager.appendLinksToElement(waitingRoom.linksArray, LINKS_CLASS_NAME, LINKS_SECTION_ID);
     });
     openAllLinksButton.addEventListener('click', () => {
          domElementsManager.openAllLinks(LINKS_CLASS_NAME);
     })
     removeAllLinksButton.addEventListener('click', () => {
          domElementsManager.removeAllChildrenFromElement(LINKS_SECTION_ID);
     })
});
