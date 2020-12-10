const xs = '575';
const sm = '575';
const md = '768';
const lg = '992';
const xl = '1200';

const genMediaQuery = (viewPort, specificSize) => {
   switch (viewPort) {
      case 'xs':
         return `@media (max-width  : ${specificSize || xs}px )`;

      case 'sm':
         return `@media (max-width  : ${specificSize || sm}px)`;

      case 'md':
         return `@media (max-width  : ${specificSize || md}px)`;

      case 'lg':
         return `@media (max-width  : ${specificSize || lg}px)`;

      case 'xl':
         return `@media (max-width  : ${specificSize || xl}px)`;
      default:
         return `@media (max-width  : ${specificSize || lg}px)`;
   }
};

const bitch = 'Mother fucker';

export { genMediaQuery, bitch };
