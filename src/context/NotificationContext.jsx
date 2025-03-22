import { createContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState("positive");

  function notify(message, type) {
    setMessage(message);
    setType(type);

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }

  function dismiss() {
    setMessage(null);
  }

  return (
    <NotificationContext.Provider
      value={{
        message,
        type,
        notify,
        dismiss,
      }}
    >
      {children}
      <Notification message={message} type={type} onClose={dismiss} />
    </NotificationContext.Provider>
  );
}

export { NotificationContext, NotificationProvider };
