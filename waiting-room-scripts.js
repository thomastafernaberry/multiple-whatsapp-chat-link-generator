import { DOMElementsManager, QueryAccesor, Whatsapp } from './classes.js';

window.addEventListener('load', () => {
     const ANCHOR_ID = 'open-chat-anchor';
     const domElementsManager = new DOMElementsManager();
     const query = new QueryAccesor(document.URL);
     const whatsapp = new Whatsapp();
     const whatsappLink = whatsapp.generateLink(query.phoneValue, query.textValue);
     domElementsManager.setHrefAttribute(whatsappLink, ANCHOR_ID);
     window.addEventListener('focus', () => {
          window.location = whatsappLink;
     });
});


