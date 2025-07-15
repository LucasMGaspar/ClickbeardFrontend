export const statusLabel = {
  SCHEDULED: 'Agendado',
  COMPLETED: 'Concluído',
  CANCELLED: 'Cancelado',
} as const;

export const statusClass = {
  SCHEDULED: 'statusScheduled',
  COMPLETED: 'statusCompleted',
  CANCELLED: 'statusCancelled',
} as const;

export type StatusKey = keyof typeof statusLabel;
