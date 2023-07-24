import { PropsWithChildren, createContext, useEffect, useState } from "react";

export const NotificationContext = createContext<{
  notification: Notification[];
  pushNotification: (new_notification: Notification) => void;
}>({
  notification: [],
  pushNotification: () => {
    console.log("function yet to define");
  },
});

export type Notification = {
  message: string;
  type: "success" | "error";
};

export const NotificationProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification[]>([]);

  const pushNotification = (new_notification: Notification) => {
    setNotification([...notification, new_notification]);
  };

  //   Remove notification every 3 seconds one by one
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notification.length > 0) {
        setNotification(notification.slice(1));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [notification]);

  return (
    <NotificationContext.Provider value={{ notification, pushNotification }}>
      <div className="toast" data-theme="cupcake">
        {notification.map((notification, index) => (
          <div key={index} className={`alert alert-${notification.type}`}>
            <span>{notification.message}</span>
          </div>
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
