export class PhoneNumbersProcessor {
     constructor(localPhoneNumbersTextarea, countryCodeInput) {
          this.localPhoneNumbersTextarea = localPhoneNumbersTextarea.value;
          this.countryCode = countryCodeInput.value;
     }
     get localNumbersArray() {
          return this.localPhoneNumbersTextarea
               .split(/\s+/)
               .filter(number => number.trim() !== '');
     }
     get internationalNumbersArray() {
          const internationalPhoneNumbersArray = [];
          for (const localNumber of this.localNumbersArray) {
               const internationalNumber = this.countryCode + localNumber;
               internationalPhoneNumbersArray.push(internationalNumber);
          }
          return internationalPhoneNumbersArray;
     }
}

export class WaitingRoomManager {
     constructor(internationalPhoneNumbersArray, textToSend) {
          this.internationalPhoneNumbersArray = internationalPhoneNumbersArray;
          this.textToSend = textToSend;
     }
     get linksArray() {
          const linksArray = [];
          for (const phoneNumber of this.internationalPhoneNumbersArray) {
               let baseUrl = new URL('/waiting-room.html', document.URL);
               baseUrl.searchParams.append('phone', phoneNumber);
               baseUrl.searchParams.append('text', this.textToSend);
               linksArray.push(baseUrl.href);
          }
          return linksArray;
     }
}

export class DOMElementsManager {
     openAllLinks(linksClassName) {
          const links = Array.from(document.getElementsByClassName(linksClassName));
          links.forEach(link => {
               window.open(link);
          });
     }
     removeAllChildrenFromElement(elementId) {
          const element = document.getElementById(elementId);
          element.innerText = '';
     }
     appendLinksToElement(linksArray, linkClassName, elementId) {
          const parentElement = document.getElementById(elementId);
          const ulElement = document.createElement('ul');
          ulElement.style.listStyleType = 'none';
          linksArray.forEach(link => {
               const liElement = document.createElement('li');
               const aElement = document.createElement('a');
               aElement.setAttribute('target', '_blank');
               aElement.setAttribute('href', link);
               aElement.className = linkClassName;
               aElement.text = `Link: ${link}`;
               liElement.appendChild(aElement);
               ulElement.appendChild(liElement);
          });
          parentElement.appendChild(ulElement);
     }
     setHrefAttribute(link, elementId) {
          const element = document.getElementById(elementId);
          element.setAttribute('href', link);
     }
}

export class QueryAccesor {
     constructor(url) {
          this.url = url;
     }
     get phoneValue() {
          const url = new URL(this.url);
          return url.searchParams.get('phone');
     }
     get textValue() {
          const url = new URL(this.url);
          return url.searchParams.get('text');
     }
}

export class Whatsapp {
     generateLink(internationalPhone, message) {
          const baseUrl = new URL('https://web.whatsapp.com/send/');
          baseUrl.searchParams.append('phone', internationalPhone);
          baseUrl.searchParams.append('text', message);
          return baseUrl.href;
     }
}
