import { NotificationType } from './NotificationType';

export interface Notification {
    notificationId?: string;
    notificationType?: NotificationType;
    createdOn?: number;
    userId?: string;
    isRead?: boolean;
    data?: any;
}
