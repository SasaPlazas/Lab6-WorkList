import { AppDispatcher } from './Dispatcher';
import {
  Action,
  ActionTypes,
  loginUsuario,
  logoutUsuario,
  registroUsuario,
  cargarTareas,
  agregarTarea,
  completarTarea,
  eliminarTarea,
  setError,
  setLoading
} from './Actions';

type Callback = () => void;

export type Tarea = {
  id: string;
  titulo: string;
  descripcion?: string;
  completada: boolean;
};

export type State = {
  user: any;
  tareas: Tarea[];
  error: string | null;
  loading: boolean;
};

type Listener = (state: State) => void;

class Store {
  private _myState: State = {
    user: null,
    tareas: [],
    error: null,
    loading: false,
  };

  private _listeners: Listener[] = [];

  constructor() {
    AppDispatcher.register(this._handleActions.bind(this));
  }

  getState() {
    return this._myState;
  }

  _handleActions(action: Action): void {
    switch (action.type) {
      case ActionTypes.LOGIN_USUARIO:
      case ActionTypes.REGISTRO_USUARIO:
        this._myState.user = action.payload;
        this._myState.error = null;
        this._emitChange();
        break;

      case ActionTypes.LOGOUT_USUARIO:
        this._myState.user = null;
        this._myState.tareas = [];
        this._emitChange();
        break;

      case ActionTypes.CARGAR_TAREAS:
        this._myState.tareas = action.payload;
        this._emitChange();
        break;

      case ActionTypes.AGREGAR_TAREA:
        this._myState.tareas.push(action.payload);
        this._emitChange();
        break;

      case ActionTypes.MARCAR_TAREA_COMO_COMPLETADA:
        this._myState.tareas = this._myState.tareas.map(t =>
          t.id === action.payload ? { ...t, completada: true } : t
        );
        this._emitChange();
        break;

      case ActionTypes.ELIMINAR_TAREA:
        this._myState.tareas = this._myState.tareas.filter(t => t.id !== action.payload);
        this._emitChange();
        break;

      case ActionTypes.SET_ERROR:
        this._myState.error = action.payload;
        this._emitChange();
        break;

      case ActionTypes.SET_LOADING:
        this._myState.loading = action.payload;
        this._emitChange();
        break;

      default:
        break;
    }

    this.persist();
  }

  private _emitChange(): void {
    const state = this.getState();
    for (const listener of this._listeners) {
      listener(state);
    }
  }

  subscribe(listener: Listener): void {
    this._listeners.push(listener);
    listener(this.getState());
  }

  unsubscribe(listener: Listener): void {
    this._listeners = this._listeners.filter(l => l !== listener);
  }

  persist(): void {
    localStorage.setItem('flux:state', JSON.stringify(this._myState));
  }

  load(): void {
    const persistedState = localStorage.getItem('flux:state');
    if (persistedState) {
      this._myState = JSON.parse(persistedState);
      this._emitChange();
    }
  }
}

export const store = new Store();
