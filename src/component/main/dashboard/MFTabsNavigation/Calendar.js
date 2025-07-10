import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "../../../../calendar.css";
import { Link } from "react-router-dom";
import Modal from "../../Modal";

const convertIST = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB");
};

const CalendarListView = () => {
    const [showBirthdayModal, setShowBirthdayModal] = useState(false);
    const [birthdayDate, setBirthdayDate] = useState("");

    const events = [
        {
            title: "2 Birthdays",
            start: "2025-07-06",
            allDay: true,
            type: "Birthday",
        },
        {
            title: "1 SIP Due",
            start: "2025-07-07",
            allDay: true,
            type: "SIPDue",
        },
        {
            title: "3 Portfolio Reviews",
            start: "2025-07-07",
            allDay: true,
            type: "PortfolioReview",
        },
        {
            title: "zoom at 5",
            start: "2025-07-07T17:00:00",
            type: "Meeting",
            Encrptid: "xyz123",
        },
    ];

    return (
        <>
            <div className="flex justify-end items-center pt-[10px] pb-[10px]">
                <Link
                    to="/Calendar/Index"
                    target="_blank"
                    className="text-blue-500 text-[13px] flex items-center gap-1 hover:!text-black"
                >
                    <span>View More</span>
                    <i className="fas fa-chevron-right"></i>
                </Link>
            </div>

            <FullCalendar
                plugins={[listPlugin, interactionPlugin]}
                initialView="listWeek"
                headerToolbar={false}
                footerToolbar={false}
                events={events}
                height="auto"
                eventTimeFormat={{
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }}
                eventDidMount={(info) => {
                    const props = info.event.extendedProps;
                    const startDate = convertIST(info.event.start);

                    const dotEl = info.el.querySelector(".fc-event-dot");
                    if (dotEl && dotEl.parentElement) {
                        dotEl.parentElement.remove();
                    }

                    const timeCell = info.el.querySelector(".fc-list-event-time");
                    if (timeCell) {
                        const clockIcon = document.createElement("i");
                        clockIcon.className = "far fa-clock pr-2";
                        timeCell.prepend(clockIcon);
                    }

                    const anchor = info.el.querySelector(".fc-list-event-title a");
                    if (!anchor) return;

                    if (props.Encrptid) {
                        anchor.setAttribute("href", `/Calendar/Index?aid=${props.Encrptid}`);
                    } else if (props.type === "Birthday") {
                        anchor.setAttribute("href", "#");
                        anchor.setAttribute("id", "btnBirthday");
                        anchor.setAttribute("data-bpageno", "1");
                        anchor.setAttribute("data-bdate", startDate);
                        anchor.addEventListener("click", (e) => {
                            e.preventDefault();
                            setBirthdayDate(startDate);
                            setShowBirthdayModal(true);
                        });
                    } else if (props.type === "Anniversary") {
                        anchor.setAttribute("href", "#");
                        anchor.setAttribute("id", "btnAnniversary");
                        anchor.setAttribute("data-apageno", "1");
                        anchor.setAttribute("data-adate", startDate);
                    } else if (props.type === "SIPExpiry") {
                        anchor.setAttribute("href", "#");
                        anchor.setAttribute("id", "btnSIPExpiry");
                        anchor.setAttribute("data-epageno", "1");
                        anchor.setAttribute("data-edate", startDate);
                    } else if (props.type === "SIPDue") {
                        anchor.setAttribute("href", "#");
                        anchor.setAttribute("id", "btnSIPDue");
                        anchor.setAttribute("data-dpageno", "1");
                        anchor.setAttribute("data-ddate", startDate);
                    } else if (props.type === "PortfolioReview") {
                        anchor.setAttribute("href", "#");
                        anchor.classList.add("btnPortfolioReview");
                        anchor.setAttribute("data-bpageno", "1");
                        anchor.setAttribute("data-bdate", startDate);
                    }
                }}
            />

            {showBirthdayModal && (
                <Modal date={birthdayDate} onClose={() => setShowBirthdayModal(false)} />
            )}
        </>
    );
};

export default CalendarListView;