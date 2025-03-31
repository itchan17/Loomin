import React, { useState } from "react";
import moment from "moment";
import useNotificationStore from "../stores/notificationStore";
import useProfileStore from "../stores/profileStore";

const Notification = ({ notification }) => {
  const [isNotificationRead, setIsNotificationRead] = useState(false);

  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const clearNotification = useNotificationStore(
    (state) => state.clearNotification
  );
  const setNotificationsCount = useNotificationStore(
    (state) => state.setNotificationsCount
  );

  // Profile store
  const defaultProfileImages = useProfileStore(
    (state) => state.defaultProfileImages
  );

  const handleNotificationClick = () => {
    markAsRead(notification._id);
    setIsNotificationRead(true);
    setNotificationsCount();
  };

  const handleClearNotifcation = (e) => {
    e.stopPropagation();
    clearNotification(notification._id);
    setIsNotificationRead(false);

    !isNotificationRead && setNotificationsCount();
  };
  return (
    <div
      onClick={handleNotificationClick}
      key={notification._id}
      className={`px-6 py-4 hover:bg-white transition cursor-pointer ${
        isNotificationRead || notification.isRead ? "bg-white" : "bg-gray-100"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div
            className={`rounded-full w-3 h-3  ${
              isNotificationRead || notification.isRead
                ? "bg-white border-red-600 border"
                : "bg-red-600"
            }`}
          ></div>
          <div className="relative">
            <img
              src={
                notification.senderId?.profile_picture
                  ? `http://localhost:3000/${notification.senderId.profile_picture}`
                  : defaultProfileImages.profile
              }
              alt=""
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#FFD23F] to-[#FF6F61] rounded-full flex items-center justify-center">
              <i
                className={`bx bx-${
                  notification.type === "follow"
                    ? "user-plus"
                    : notification.type === "like"
                    ? "heart"
                    : "comment"
                } text-white text-sm`}
              ></i>
            </div>
          </div>
          <div>
            <p className="font-medium">
              <span className="font-bold text-gray-900">{`${notification.senderId.first_name} ${notification.senderId.last_name} `}</span>
              <span className="text-gray-900">{notification.content}</span>
            </p>
            <p className="text-sm text-gray-500">
              {moment(notification.createdAt).fromNow()}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleClearNotifcation}
            type="button"
            className="text-xl bx bx-x px-1 hover:bg-orange-100 rounded-full cursor-pointer"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
