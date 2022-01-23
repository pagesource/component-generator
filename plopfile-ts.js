import componentGenerator from './react-component/ts-templates/index.js';
import hooksGenerator from './react-hooks/ts-templates/index.js';
import pagesGenerator from './pages/ts-templates/index.js';
import storesGenerator from './stores/ts-templates/index.js'

export default function (plop) {
	
  plop.setGenerator('components', componentGenerator);
  plop.setGenerator('hooks', hooksGenerator);
  plop.setGenerator('pages', pagesGenerator);
  plop.setGenerator('stores', storesGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
