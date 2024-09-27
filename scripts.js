const $USER_NUMBERS = document.getElementById('local-numbers');
const $UPLOAD_BUTTON = document.getElementById('upload-button');
const $INTERNATIONAL_CODE = document.getElementById('international-code');
const $MESSAGE = document.getElementById('message');
const $LINKS_LIST = document.getElementById('links-list');

$UPLOAD_BUTTON.addEventListener('click', () => {
     const LOCAL_NUMBERS = [];
     let currentNumber = '';
     for (let i = 0; i <= $USER_NUMBERS.value.length; i++) {
          if ($USER_NUMBERS.value[i] === '\n' || $USER_NUMBERS.value[i] === ' ' && currentNumber !== '') {
               LOCAL_NUMBERS.push(currentNumber);
               currentNumber = '';
          } else if ($USER_NUMBERS.value[i] === undefined) {
               LOCAL_NUMBERS.push(currentNumber);
               break
          } else {
               currentNumber += $USER_NUMBERS.value[i];
          };
     };
     const INTERNATIONAL_NUMBERS = [];
     for (let i = 0; i < LOCAL_NUMBERS.length; i++) {
          INTERNATIONAL_NUMBERS.push($INTERNATIONAL_CODE.value + LOCAL_NUMBERS[i]);
     };
     const LINKS = [];
     for (let i = 0; i < INTERNATIONAL_NUMBERS.length; i++) {
          let baseUrl = new URL('https://api.whatsapp.com/send/');
          baseUrl.searchParams.append('phone', INTERNATIONAL_NUMBERS[i]);
          baseUrl.searchParams.append('text', $MESSAGE.value);
          LINKS.push(baseUrl.href);
     }
     for (let i = 0; i < LINKS.length; i++) {
          let anchor = document.createElement('a'); 
          anchor.setAttribute('target', '_blank');
          anchor.innerHTML = `Link for number ${INTERNATIONAL_NUMBERS[i]} <br>`
          $LINKS_LIST.appendChild(anchor)
               .setAttribute('href', LINKS[i])
     }
});
