import { auth } from '../firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

class Root extends HTMLElement {
  pantallaActual: string = 'inicio';

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    onAuthStateChanged(auth, (user: User | null) => {
      this.pantallaActual = user ? 'tareas' : 'inicio';
      this.render();
      this.attachEventHandlers();
    });

    this.render();
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = '';
    let screenElement: HTMLElement;

    switch (this.pantallaActual) {
      case 'inicio':
        screenElement = document.createElement('registro-screen');
        break;
      case 'tareas':
        screenElement = document.createElement('tareas-screen');
        break;
      case 'admin':
        screenElement = document.createElement('admin-screen');
        break;
      case 'editar-jardin':
        screenElement = document.createElement('jardin-screen');
        break;
      default:
        screenElement = document.createElement('div');
        screenElement.textContent = 'Pantalla no encontrada';
    }

    this.shadowRoot.appendChild(screenElement);
  }

  attachEventHandlers() {
    // Ejemplo: si los screens disparan eventos personalizados tipo "cambiar-pantalla"
    this.shadowRoot?.addEventListener('cambiar-pantalla', (event: Event) => {
      const detalle = (event as CustomEvent).detail;
      if (typeof detalle === 'string') {
        this.pantallaActual = detalle;
        this.render();
      }
    });
  }
}

customElements.define('root-app', Root);
export default Root;
