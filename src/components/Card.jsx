import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

const Card = ({ dictionary, index }) => {
    const [collapsedItems, setCollapsedItems] = useState({});

    const toggleCollapse = (key) => {
        setCollapsedItems((prev) => {
            const newCollapsedItems = { ...prev };
            newCollapsedItems[key] = !newCollapsedItems[key];
            return newCollapsedItems;
        });
    };
    const renderJsonContent = (data, level = 0, parentKey = null) => {
        return (
            <div>
                {Object.keys(data).map((key, index) => (
                    <div className={cn("font-semibold")} key={index}>
                        {typeof data[key] === "object" ? (
                            <div
                            style={{ paddingLeft: `${level * 10}px` }}
                                className={cn("p-2 w-full border-l border-b border-slate-200", {
                                    "bg-slate-800 hover:bg-slate-800/75":
                                        !collapsedItems[`${parentKey}-${key}`],
                                    "border-t border-r": !parentKey
                                })}
                            >
                                <span
                                    className="w-full cursor-pointer"
                                    onClick={() =>
                                        toggleCollapse(`${parentKey}-${key}`)
                                    }
                                >
                                    <span>
                                        {collapsedItems[
                                            `${parentKey}-${key}`
                                        ] ? (
                                            <ChevronRight className="inline h-3 w-3" />
                                        ) : (
                                            <ChevronDown className="inline h-3 w-3" />
                                        )}
                                    </span>{" "}
                                    <span className="text-amber-700">{key}</span>
                                </span>
                                :
                                {collapsedItems[`${parentKey}-${key}`] &&
                                    renderJsonContent(
                                        data[key],
                                        level + 1,
                                        `${parentKey}-${key}`
                                    )}
                            </div>
                        ) : (
                            <div>
                                <span style={{ color: "blue" }}>{key}:</span>{" "}
                                {data[key]}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-4xl h-fit flex flex-col gap-5 p-5 rounded-md bg-slate-200">
            <h1 className="text-4xl font-semibold text-blue-500">
                Dictionary {index + 1}
            </h1>
            <div className="p-5 rounded-md bg-slate-900 text-slate-200">
                {renderJsonContent(dictionary)}
            </div>
        </div>
    );
};

export default Card;
