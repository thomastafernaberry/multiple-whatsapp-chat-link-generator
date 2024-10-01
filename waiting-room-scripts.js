function getPhoneQueryValue(url) {
     const CURRENT_URL = new URL(url);
     return CURRENT_URL.searchParams.get('phone');
}

function getTextQueryValue(url) {
     const CURRENT_URL = new URL(url);
     return CURRENT_URL.searchParams.get('text');
}

function getWhatsappChatLink(phone, text) {
     const WHATSAPP_CHAT_LINK = new URL('https://web.whatsapp.com/send/');
     WHATSAPP_CHAT_LINK.searchParams.append('phone', phone);
     WHATSAPP_CHAT_LINK.searchParams.append('text', text);
     return WHATSAPP_CHAT_LINK.href;
}

function setAnchorHrefAttribute(anchorElement) {
     const CURRENT_URL = document.URL;
     const PHONE = getPhoneQueryValue(CURRENT_URL);
     const TEXT = getTextQueryValue(CURRENT_URL);
     const WHATSAPP_CHAT_LINK = getWhatsappChatLink(PHONE, TEXT);
     anchorElement.setAttribute('href', WHATSAPP_CHAT_LINK);
}

window.addEventListener('load', () => {
     const $OPEN_CHAT_ANCHOR = document.getElementById('open-chat-anchor');
     setAnchorHrefAttribute($OPEN_CHAT_ANCHOR);
});

window.addEventListener('focus', () => {
     const PHONE_NUMBER = getPhoneQueryValue(document.URL);
     const TEXT = getTextQueryValue(document.URL);
     window.location = getWhatsappChatLink(PHONE_NUMBER, TEXT);
});
