import { useNotificationContext } from "~/hooks/NotificationContext";

export default function NotificationsManager() {
  const { state, removeNotification } = useNotificationContext();

  return (
    <div className="sticky top-0 left-0 w-full h-full">
      {state.stack.map((notif) => (
        <div
          key={`notif-${notif.id}`}
          className="max-w-48 bg-white rounded-md shadow-md px-4 py-2"
        >
          <div className="text-right">
            <button
              type="button"
              onClick={() => {
                removeNotification(notif.id);
              }}
            >
              X
            </button>
          </div>

          <div>{notif.content}</div>
        </div>
      ))}
    </div>
  );
}
