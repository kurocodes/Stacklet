import { LuArrowUpRight } from "react-icons/lu";
import { AnimatePresence, motion } from "motion/react";
import { Stacklet, useHoverDelay } from "../components/stacklet";
import { notifications } from "../assets/assets";

type Notification = {
  id: string | number;
  msg: string;
  time: string;
  error: string;
};

type NotificationProps = { notification: Notification };

export default function StackletNotifications() {
  const { isHovered, bind } = useHoverDelay(140);

  return (
    <div className="w-screen h-screen bg-[#f1f1f1] flex items-end justify-center">
      <div className="m-10">
        <div
          className="bg-[#e5e5e5] min-w-68 rounded-3xl p-3 flex flex-col gap-4 overflow-hidden"
          {...bind}
        >
          <Stacklet
            open={isHovered}
            stackedFrom="end"
            align="backward"
            itemSize={64}
          >
            {notifications.map((notification) => (
              <Notification key={notification.id} notification={notification} />
            ))}
          </Stacklet>

          <div className="flex gap-2">
            <span className="w-6 h-6 flex items-center justify-center rounded-full text-white bg-[#ff5f4f]">
              {notifications.length}
            </span>
            <AnimatePresence initial={false} mode="wait">
              {isHovered ? (
                <motion.button
                  key="view-all"
                  initial={{ y: 10, opacity: 0.1, filter: "blur(2px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: 10, opacity: 0.1, filter: "blur(2px)" }}
                  transition={{ duration: 0.1 }}
                  className="flex items-center cursor-pointer"
                >
                  <span className="font-semibold">View All</span>
                  <span>
                    <LuArrowUpRight size={20} color="#9b9b9b" />
                  </span>
                </motion.button>
              ) : (
                <motion.span
                  key="notifications"
                  initial={{ y: -10, opacity: 0.1, filter: "blur(2px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -10, opacity: 0.1, filter: "blur(2px)" }}
                  transition={{ duration: 0.1 }}
                  className="font-semibold"
                >
                  Notifications
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Notification({ notification }: NotificationProps) {
  return (
    <div className="min-w-60 bg-white p-2.5 rounded-2xl shadow-[0_7px_29px_0_rgba(100,100,111,0.2)] cursor-default">
      <div className="flex flex-col gap-1">
        <div className="font-semibold">{notification.msg}</div>
        <div className="flex items-center gap-1 text-[#9b9b9b] text-sm">
          <span>{notification.time}</span>
          <span className="inline-block w-1 h-1 bg-[#9b9b9b] rounded-full"></span>
          <span>{notification.error}</span>
        </div>
      </div>
    </div>
  );
}
