import './components/inicio';

export class InicioScreen extends HTMLElement {
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
        <h2>Iniciar sesión</h2>
        <inicio-sesion></inicio-sesion>
        <button id="a-registro">¿No tenés cuenta? Registrate</button>
      </div>
    `;
  }

  attachEvents() {
    this.shadow.getElementById('a-registro')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('cambiar-pantalla', {
        bubbles: true,
        composed: true,
        detail: 'registro'
      }));
    });

    this.shadow.querySelector('inicio-sesion')?.addEventListener('login-exitoso', () => {
  this.dispatchEvent(new CustomEvent('cambiar-pantalla', {
    bubbles: true,
    composed: true,
    detail: 'tareas'
  }));
});
  }


  
}

customElements.define('inicio-screen', InicioScreen);
