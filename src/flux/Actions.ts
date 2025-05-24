import { AppDispatcher } from './Dispatcher';


export enum ActionTypes {
  LOGIN_USUARIO = 'LOGIN_USUARIO',
  LOGOUT_USUARIO = 'LOGOUT_USUARIO',
  REGISTRO_USUARIO = 'REGISTRO_USUARIO',

  CARGAR_TAREAS = 'CARGAR_TAREAS',
  AGREGAR_TAREA = 'AGREGAR_TAREA',
  MARCAR_TAREA_COMO_COMPLETADA = 'MARCAR_TAREA_COMO_COMPLETADA',
  ELIMINAR_TAREA = 'ELIMINAR_TAREA',

  SET_ERROR = 'SET_ERROR',
  SET_LOADING = 'SET_LOADING'
}

//  Tipado para una acción
export interface Action {
  type: ActionTypes;
  payload?: any;
}

//  Acciones de sesión
export const loginUsuario = (user: any): Action => ({
  type: ActionTypes.LOGIN_USUARIO,
  payload: user
});

export const logoutUsuario = (): Action => ({
  type: ActionTypes.LOGOUT_USUARIO
});

export const registroUsuario = (user: any): Action => ({
  type: ActionTypes.REGISTRO_USUARIO,
  payload: user
});

// ✅ Acciones de tareas
export const cargarTareas = (tareas: any[]): Action => ({
  type: ActionTypes.CARGAR_TAREAS,
  payload: tareas
});

export const agregarTarea = (tarea: any): Action => ({
  type: ActionTypes.AGREGAR_TAREA,
  payload: tarea
});

export const completarTarea = (id: string): Action => ({
  type: ActionTypes.MARCAR_TAREA_COMO_COMPLETADA,
  payload: id
});

export const eliminarTarea = (id: string): Action => ({
  type: ActionTypes.ELIMINAR_TAREA,
  payload: id
});

//  Acciones globales
export const setError = (mensaje: string): Action => ({
  type: ActionTypes.SET_ERROR,
  payload: mensaje
});

export const setLoading = (estado: boolean): Action => ({
  type: ActionTypes.SET_LOADING,
  payload: estado
});


