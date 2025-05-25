import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export class RegistroSesion extends HTMLElement {
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
      <form id="registro-form">
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
        <p class="error">${errorMsg}</p>
      </form>
    `;
  }

  attachEvents() {
    const form = this.shadow.getElementById('registro-form') as HTMLFormElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        this.dispatchEvent(new CustomEvent('registro-exitoso', {
          bubbles: true,
          composed: true,
        }));
      } catch (error: any) {
        let msg = 'Error al registrarse.';
        if (error.code === 'auth/email-already-in-use') msg = 'El email ya está en uso.';
        if (error.code === 'auth/weak-password') msg = 'La contraseña es muy débil.';
        this.render(msg);
        this.attachEvents();
      }
    });
  }
}

export default RegistroSesion;