import './components/register'

export class RegistroScreen extends HTMLElement {
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
        button { margin-top: 1rem; }
      </style>
      <div class="pantalla">
        <h2>Registro de cuenta</h2>
        <registro-sesion></registro-sesion>
        <button id="a-login">¿Ya tienes cuenta? Iniciá sesión</button>
      </div>
    `;
  }

  attachEvents() {
    this.shadow.getElementById('a-login')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('cambiar-pantalla', {
        bubbles: true,
        composed: true,
        detail: 'inicio'
      }));
    });


    this.shadow.querySelector('registro-sesion')?.addEventListener('registro-exitoso', () => {
  this.dispatchEvent(new CustomEvent('cambiar-pantalla', {
    bubbles: true,
    composed: true,
    detail: 'tareas'
  }));
});
  }
}

customElements.define('registro-screen', RegistroScreen);
