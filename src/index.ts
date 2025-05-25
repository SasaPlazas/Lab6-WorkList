import Root from './Root/root';

customElements.define('the-root', Root); 

import { InicioSesion } from './components/inicio';
import { RegistroSesion } from './components/register';
import  {ListaTareas} from './components/ListaTareas';

customElements.define('lista-tareas', ListaTareas);
customElements.define('inicio-sesion', InicioSesion);
customElements.define('registro-sesion', RegistroSesion);