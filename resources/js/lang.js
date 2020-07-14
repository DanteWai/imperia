import lang from 'lang.js';
import ru from './lang/ru/ru';

const Lang = new lang({
   messages: ru,
   locale: 'ru',
   fallback: 'en'
});

export default Lang;