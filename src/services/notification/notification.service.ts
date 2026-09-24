import { Injectable, signal, computed } from '@angular/core';

export interface AppNotification {
  id: string;
  titleKey: string;
  messageKey: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  timeKey: string;
  read: boolean;
  link?: string;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    titleKey: 'notificationGradeTitle',
    messageKey: 'notificationGradeMsg',
    icon: 'pi pi-file-edit',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-700',
    timeKey: 'justNow',
    read: false,
    link: '/subjects'
  },
  {
    id: 'notif-2',
    titleKey: 'notificationEnrollTitle',
    messageKey: 'notificationEnrollMsg',
    icon: 'pi pi-user-plus',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    timeKey: 'twoHoursAgo',
    read: false,
    link: '/students'
  },
  {
    id: 'notif-3',
    titleKey: 'notificationAttendanceTitle',
    messageKey: 'notificationAttendanceMsg',
    icon: 'pi pi-calendar-check',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    timeKey: 'twoHoursAgo',
    read: true,
    link: '/subjects'
  },
  {
    id: 'notif-4',
    titleKey: 'notificationSubjectTitle',
    messageKey: 'notificationSubjectMsg',
    icon: 'pi pi-book',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    timeKey: 'yesterday',
    read: true,
    link: '/subjects'
  }
];

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  public notifications = signal<AppNotification[]>(INITIAL_NOTIFICATIONS);

  public unreadCount = computed(() => {
    return this.notifications().filter(n => !n.read).length;
  });

  public markAllAsRead() {
    this.notifications.update(list => list.map(n => ({ ...n, read: true })));
  }

  public markAsRead(id: string) {
    this.notifications.update(list =>
      list.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  }

  public addNotification(notif: Omit<AppNotification, 'id' | 'read'>) {
    const newNotif: AppNotification = {
      ...notif,
      id: 'notif-' + Date.now(),
      read: false
    };
    this.notifications.update(list => [newNotif, ...list]);
  }
}
