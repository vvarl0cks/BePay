'use client';

import * as React from 'react';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockNotifications } from '@/lib/mockData';
import type { NotificationMessage } from '@/lib/types';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, Trash2, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const NotificationIcon = ({ type }: { type: NotificationMessage['type'] }) => {
  switch (type) {
    case 'info': return <Info className="h-5 w-5 text-blue-500" />;
    case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    case 'error': return <XCircle className="h-5 w-5 text-red-500" />;
    case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
    default: return <Bell className="h-5 w-5 text-muted-foreground" />;
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState<NotificationMessage[]>(mockNotifications);
  const { toast } = useToast();

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast({ title: "Notification Marked as Read" });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast({ title: "All Notifications Marked as Read" });
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
    toast({ title: "Notification Deleted", variant: "destructive" });
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    toast({ title: "All Notifications Deleted", variant: "destructive" });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div>
      <PageHeader 
        title="Notifications" 
        description="Your recent alerts and updates." 
        icon={Bell}
        action={
          <div className="flex gap-2">
            {notifications.length > 0 && unreadCount > 0 && (
                <Button variant="outline" onClick={markAllAsRead} className="shadow-sm hover:shadow-md transition-shadow">Mark All Read</Button>
            )}
            {notifications.length > 0 && (
                <Button variant="destructive" onClick={deleteAllNotifications} className="shadow-sm hover:shadow-md transition-shadow">Delete All</Button>
            )}
          </div>
        }
      />

      {notifications.length === 0 ? (
        <Card className="text-center py-12">
          <CardHeader>
            <Bell className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>No New Notifications</CardTitle>
            <CardDescription>You're all caught up!</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={cn(
                "shadow-md hover:shadow-lg transition-shadow duration-300",
                !notification.read && "bg-primary/5 border-primary/30"
              )}
            >
              <CardContent className="p-4 flex items-start gap-4">
                <div className="pt-1">
                  <NotificationIcon type={notification.type} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-semibold text-foreground">{notification.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <div className="mt-3 flex gap-2">
                    {!notification.read && (
                      <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                        <Eye className="mr-2 h-4 w-4" /> Mark as Read
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-600" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
