import { React, useState } from "react";
import "./TabSwitcher.css";
import { motion, AnimatePresence } from "framer-motion"
import Info from "../barTab/Info"
import Reviews from "../review/Reviews";

const tabs = [
    { label: 'Info' },
    { label: 'Reviews' }
];

export default function TabSwitcher({ pub, user }) {
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    return (
        <div className="rounded-lg bg-gray-900 overflow-hidden shadow-md flex flex-col">
            <nav className="rounded-t-lg text-off_white border-b border-gray-500 h-10">
                <ul className="flex">
                    {tabs.map((item) => (
                        <li
                            key={item.label}
                            className="flex-1 p-2.5 pb-0 relative cursor-pointer bg-gray-900 text-off_white text-md px-10 font-oswald"
                            onClick={() => setSelectedTab(item)}
                        >
                            {`${item.label}`}
                            {item === selectedTab ? (
                                <motion.div className="underline" layoutId="underline" />
                            ) : null}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="pl-4 pr-4">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab ? selectedTab.label : "empty"}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {selectedTab.label == 'Info' &&
                            <Info pub={pub} />
                        }
                        {selectedTab.label == 'Reviews' &&
                            <Reviews pubId={pub.id} pubname={pub.name} user={user} />
                        }
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}