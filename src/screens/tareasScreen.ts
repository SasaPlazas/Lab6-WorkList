import './components/ListaTareas';

export class TareasScreen extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        .pantalla { padding: 2rem; font-family: sans-serif; }
        button { margin-bottom: 1rem; }
      </style>
      <div class="pantalla">
        <button id="cerrar-sesion">Cerrar sesión</button>
        <lista-tareas></lista-tareas>
      </div>
    `;
  }

  attachEvents() {
    this.shadow.getElementById('cerrar-sesion')?.addEventListener('click', () => {
      // Aquí limpiarías la sesión y redirigirías al login
      this.dispatchEvent(new CustomEvent('cambiar-pantalla', {
        bubbles: true,
        composed: true,
        detail: 'inicio'
      }));
    });
  }
}

customElements.define('tareas-screen', TareasScreen);
