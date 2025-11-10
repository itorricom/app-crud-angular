export enum Priority {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAJA = 'BAJA'
}

export enum Status {
  PENDIENTE = 'PENDIENTE',
  EN_PROCESO = 'EN_PROCESO',
  COMPLETADA = 'COMPLETADA'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdBy: string;
}
