import componentGenerator from './react-component/index.js';
import hooksGenerator from './react-hooks/index.js';
import pagesGenerator from './pages/index.js';
import storesGenerator from './stores/index.js'

export default function (plop) {
	plop.setGenerator('components', componentGenerator);
    plop.setGenerator('hooks', hooksGenerator);
    plop.setGenerator('pages', pagesGenerator);
    plop.setGenerator('stores', storesGenerator);
    plop.addHelper('curly', (object, open) => (open ? '{' : '}'));
};