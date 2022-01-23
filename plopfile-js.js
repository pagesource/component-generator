import componentGenerator from './react-component/js-template/index.js';
import hooksGenerator from './react-hooks/js-templates/index.js';
import pagesGenerator from './pages/js-templates/index.js';
import storesGenerator from './stores/js-templates/index.js'

export default function (plop) {
	
  plop.setGenerator('components', componentGenerator);
  plop.setGenerator('hooks', hooksGenerator);
  plop.setGenerator('pages', pagesGenerator);
  plop.setGenerator('stores', storesGenerator);
  plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};
