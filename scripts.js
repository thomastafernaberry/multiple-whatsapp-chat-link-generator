function getLocalPhoneNumbersArray(localPhoneNumbersTextarea) {
     const TEXTAREA_VALUES = localPhoneNumbersTextarea.value;
     const LOCAL_NUMBERS_ARRAY = [];
     let currentLocalNumber = '';
     for (const CHAR of TEXTAREA_VALUES) {
          if (CHAR === '\n' || CHAR === ' ' && currentLocalNumber) {
               LOCAL_NUMBERS_ARRAY.push(currentLocalNumber);
               currentLocalNumber = '';
          } else if (CHAR) {
               currentLocalNumber += CHAR;
          }
     }
     if (currentLocalNumber) {
          LOCAL_NUMBERS_ARRAY.push(currentLocalNumber);
     }
     return LOCAL_NUMBERS_ARRAY;
}

function getInternationalPhoneNumbersArray(localPhoneNumbersArray, internationalCode) {
     const INTERNATIONAL_NUMBERS_ARRAY = [];
     for (const LOCAL_NUMBER of localPhoneNumbersArray) {
          const INTERNATIONAL_NUMBER = internationalCode + LOCAL_NUMBER;
          INTERNATIONAL_NUMBERS_ARRAY.push(INTERNATIONAL_NUMBER);
     }
     return INTERNATIONAL_NUMBERS_ARRAY;
}

function getWaitingRoomLinksArray(internationalPhoneNumbersArray, text) {
     const LINKS_ARRAY = [];
     for (const PHONE_NUMBER of internationalPhoneNumbersArray) {
          let baseUrl = new URL('/waiting-room.html', document.URL);
          baseUrl.searchParams.append('phone', PHONE_NUMBER);
          baseUrl.searchParams.append('text', text);
          LINKS_ARRAY.push(baseUrl.href);
     }
     return LINKS_ARRAY;
}

function openAllDocumentLinks() {
     const $DOCUMENT_ANCHORS_ARRAY = Array.from(document.getElementsByTagName('a'));
     for (const ANCHOR of $DOCUMENT_ANCHORS_ARRAY) {
          const ANCHOR_LINK = ANCHOR.href;  
          window.open(ANCHOR_LINK);
     }
}

function removeAllChildrenFromElement(htmlElementId) {
     const $ELEMENT = document.getElementById(htmlElementId);
     const CHILDREN_ARRAY = Array.from($ELEMENT.children);
     for (const CHILD of CHILDREN_ARRAY) {
          $ELEMENT.removeChild(CHILD);
     }
}

function appendWaitingRoomLinksToElement(htmlElementId, waitingRoomLinksArray, internationalPhoneNumbersArray) {
     const $PARENT_ELEMENT = document.getElementById(htmlElementId);
     const UL_ELEMENT = document.createElement('ul');
     UL_ELEMENT.style.listStyleType = 'none';
     for (let i = 0; i < waitingRoomLinksArray.length; i++) {
          const LI_ELEMENT = document.createElement('li');
          const A_ELEMENT = document.createElement('a');
          A_ELEMENT.setAttribute('target', '_blank');
          A_ELEMENT.setAttribute('href', waitingRoomLinksArray[i]);
          A_ELEMENT.innerHTML = `Link for number ${internationalPhoneNumbersArray[i]}`;
          LI_ELEMENT.appendChild(A_ELEMENT);
          UL_ELEMENT.appendChild(LI_ELEMENT);
     }
     $PARENT_ELEMENT.appendChild(UL_ELEMENT);
}

window.addEventListener('load', () => {
     const $GENERATE_LINKS_BUTTON = document.getElementById('generate-links-button');
     $GENERATE_LINKS_BUTTON.addEventListener('click', () => {
          const $LOCAL_NUMBERS_TEXTAREA = document.getElementById('local-numbers');
          const $INTERNATIONAL_CODE = document.getElementById('international-code').value;
          const $MESSAGE = document.getElementById('message').value;
          const LOCAL_NUMBERS_ARRAY = getLocalPhoneNumbersArray($LOCAL_NUMBERS_TEXTAREA);
          const INTERNATIONAL_NUMBERS_ARRAY = getInternationalPhoneNumbersArray(LOCAL_NUMBERS_ARRAY, $INTERNATIONAL_CODE);
          const WAITING_ROOM_LINKS_ARRAY = getWaitingRoomLinksArray(INTERNATIONAL_NUMBERS_ARRAY, $MESSAGE);
          appendWaitingRoomLinksToElement('links-section', WAITING_ROOM_LINKS_ARRAY, INTERNATIONAL_NUMBERS_ARRAY);
     });
});
