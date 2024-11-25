export interface Notification {
    id_notificaciones: number;
    titulo: string;
    texto: string;
    tiempo_activo: Date; 
    create_at: Date;
    create_by: string;
    id_usuario: number;
  }
  