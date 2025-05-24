import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export class InicioSesion extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render(errorMsg = '') {
    this.shadow.innerHTML = `
      <style>
        form { display: flex; flex-direction: column; gap: 0.5rem; }
        .error { color: red; font-size: 0.9rem; }
      </style>
      <form id="login-form">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar sesión</button>
        <p class="error">${errorMsg}</p>
      </form>
    `;
  }

  attachEvents() {
    const form = this.shadow.getElementById('login-form') as HTMLFormElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;

      try {
        await signInWithEmailAndPassword(auth, email, password);
        this.dispatchEvent(new CustomEvent('login-exitoso', {
          bubbles: true,
          composed: true,
        }));
      } catch (error: any) {
        let msg = 'Error desconocido.';
        if (error.code === 'auth/user-not-found') msg = 'Usuario no encontrado.';
        if (error.code === 'auth/wrong-password') msg = 'Contraseña incorrecta.';
        this.render(msg);
        this.attachEvents();
      }
    });
  }
}

customElements.define('inicio-sesion', InicioSesion);