import lang from 'lang.js';
import messages from './translations_messages';

const Lang = new lang({
   messages: messages,
   locale: 'ru',
   fallback: 'en'
});

export default Lang;
