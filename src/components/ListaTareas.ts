
interface Tarea {
  id: string;
  titulo: string;
  descripcion?: string;
  completada: boolean;
}

export class ListaTareas extends HTMLElement {
  shadow: ShadowRoot;
  tareas: Tarea[] = [];

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  render() {
    const pendientes = this.tareas.filter(t => !t.completada);
    const completadas = this.tareas.filter(t => t.completada);

    this.shadow.innerHTML = `
      <style>
        .contenedor { font-family: sans-serif; max-width: 600px; }
        .seccion { margin-bottom: 2rem; }
        .tarea { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
        .tarea span { flex: 1; }
        form { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
      </style>

      <div class="contenedor">
        <h2>Agregar nueva tarea</h2>
        <form id="form-tarea">
          <input type="text" name="titulo" placeholder="Título (obligatorio)" required />
          <textarea name="descripcion" placeholder="Descripción (opcional)"></textarea>
          <button type="submit">Agregar</button>
        </form>

        <div class="seccion">
          <h3>Pendientes</h3>
          ${pendientes.map(t => this.templateTarea(t)).join('')}
        </div>

        <div class="seccion">
          <h3>Completadas</h3>
          ${completadas.map(t => this.templateTarea(t)).join('')}
        </div>
      </div>
    `;
  }

  templateTarea(tarea: Tarea): string {
    return `
      <div class="tarea" data-id="${tarea.id}">
        <span>${tarea.titulo}</span>
        <button data-action="toggle">${tarea.completada ? 'Desmarcar' : 'Completar'}</button>
        <button data-action="eliminar">Eliminar</button>
      </div>
    `;
  }

  attachEvents() {
    const form = this.shadow.querySelector('#form-tarea') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const titulo = data.get('titulo') as string;
      const descripcion = data.get('descripcion') as string;

      if (!titulo.trim()) return;

      const nuevaTarea: Tarea = {
        id: crypto.randomUUID(),
        titulo,
        descripcion,
        completada: false,
      };

      this.tareas.push(nuevaTarea);
      this.render();
      this.attachEvents();
    });

    this.shadow.querySelectorAll('.tarea').forEach(div => {
      const id = div.getAttribute('data-id')!;
      div.querySelector('[data-action="toggle"]')?.addEventListener('click', () => {
        this.toggleTarea(id);
      });
      div.querySelector('[data-action="eliminar"]')?.addEventListener('click', () => {
        this.eliminarTarea(id);
      });
    });
  }

  toggleTarea(id: string) {
    const tarea = this.tareas.find(t => t.id === id);
    if (tarea) {
      tarea.completada = !tarea.completada;
      this.render();
      this.attachEvents();
    }
  }

  eliminarTarea(id: string) {
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.render();
    this.attachEvents();
  }
}

export default ListaTareas;
