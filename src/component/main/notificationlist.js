import React, { useEffect } from "react";
import { Box, Button, ClickAwayListener, Paper, Popper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotificationList = ({ notifications, setNotifications, unreadCount, setUnreadCount, anchorEl, setAnchorEl }) => {
    useEffect(() => {
        setUnreadCount(notifications.filter((n) => !n.isRead).length);
    }, [notifications, setUnreadCount]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const markAllAsRead = () => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((n) => ({ ...n, isRead: true }))
        );
        setUnreadCount(0);
    };

    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((n) => n.id !== id)
        );
    };

    return (
        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end" className="z-[9999]">
            <ClickAwayListener onClickAway={handleClose}>
                <Paper sx={{ minWidth: 300, borderRadius: 2, boxShadow: 3 }} className="bg-white p-2">
                    <div className="flex justify-between border-b pb-2 mb-2">
                        <Typography variant="h6">Notifications</Typography>
                        {unreadCount > 0 && (
                            <Button onClick={markAllAsRead} variant="outlined" size="small">
                                Mark All Read
                            </Button>
                        )}
                    </div>

                    <div className="max-h-72 overflow-auto">
                        {notifications.length === 0 ? (
                            <Typography variant="body2" className="text-center text-gray-600 py-4">
                                No Notifications
                            </Typography>
                        ) : (
                            notifications.map((notification) => (
                                <Box key={notification.id} className={`notification__item border-b mb-2 p-2 ${notification.isRead ? "bg-white" : "bg-blue-500"}`} sx={{ borderRadius: 1 }}>
                                    <div className="flex items-start space-x-2">
                                        <div className="text-green-500">
                                            <i className="fas fa-check-circle"></i>
                                        </div>
                                        <div className="flex-1">
                                            <Typography variant="body2" className={`font-semibold ${notification.isRead ? "text-black" : "text-white"}`}>{notification.title}</Typography>
                                            <Typography variant="body2" className={`text-sm ${notification.isRead ? "text-gray-600" : "text-gray-200"}`}>{notification.message}</Typography>
                                            <Typography variant="caption" className={`text-right ${notification.isRead ? "text-gray-600" : "text-gray-200"}`}>{notification.time}</Typography>
                                        </div>
                                        <Button
                                            className={`remove-notification ${notification.isRead ? "text-blue-900" : "text-white"} !min-w-5`}
                                            size="small"
                                            onClick={() => removeNotification(notification.id)}
                                        >
                                            <i className="far fa-times"></i>
                                        </Button>
                                    </div>
                                </Box>
                            ))
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="pt-2">
                            <Link to="/Notification/Index" className="w-full text-center block text-blue-500">
                                View All
                            </Link>
                        </div>
                    )}
                </Paper>
            </ClickAwayListener>
        </Popper>
    );
};

export default NotificationList;