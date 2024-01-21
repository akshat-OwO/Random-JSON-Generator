import { AlertTriangle, Clipboard, Download, Loader2 } from "lucide-react";
import { useState } from "react";
import { generateRandomJSON } from "./actions/json-generator";
import Card from "./components/Card";

function App() {
    const [generatedJSON, setGeneratedJSON] = useState(null);
    const [filteredJSON, setFilteredJSON] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);

    const [isCopying, setIsCopying] = useState(false);

    const generateJSON = () => {
        try {
            setError(null);
            const data = generateRandomJSON();
            setGeneratedJSON(JSON.parse(data));
        } catch (e) {
            setError("Something went wrong while generating JSON");
        }
    };

    const handleCopy = () => {
        try {
            setIsCopying(true);
            navigator.clipboard.writeText(JSON.stringify(generatedJSON));
            window.alert("Copied JSON to clipboard");
        } catch (e) {
            window.alert("Failed to copy JSON to clipboard");
        } finally {
            setIsCopying(false);
        }
    };

    const downloadJSON = () => {
        const jsonContent = JSON.stringify(generatedJSON);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated_json.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setFilteredJSON(() => {
            const filteredJSON = generatedJSON.filter((dictionary) =>
                JSON.stringify(dictionary)
                    .toLowerCase()
                    .includes(query.toLowerCase())
            );
            return filteredJSON;
        });
    };

    return (
        <div className="grid grid-cols-4 bg-slate-100">
            <aside className="h-fit md:h-screen min-w-fit col-span-4 md:col-span-1 flex flex-col bg-slate-200">
                <div className="flex">
                    <div className="flex w-full place-items-center flex-col gap-5 p-4">
                        <h1 className="text-3xl md:text-lg xl:text-3xl font-semibold text-blue-500">
                            Random JSON Generator
                        </h1>
                        <button
                            onClick={generateJSON}
                            className="w-full px-4 py-2 md:text-sm xl:text-base bg-blue-600 text-white font-semibold rounded-md"
                        >
                            Generate JSON
                        </button>
                    </div>
                </div>
                {generatedJSON && (
                    <div className="flex">
                        <div className="flex w-full place-items-start flex-col gap-5 p-4">
                            <h1 className="text-3xl md:text-lg xl:text-3xl font-semibold text-blue-500">
                                Generated JSON
                            </h1>
                            <div className="w-full flex flex-col gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="inline-flex gap-2 md:text-sm xl:text-base justify-center px-4 py-2 w-full bg-blue-600 text-white font-semibold rounded-md"
                                >
                                    {isCopying ? (
                                        <Loader2 className="h-5 w-5" />
                                    ) : (
                                        <Clipboard className="inline h-5 w-5" />
                                    )}
                                    Copy JSON to Clipboard{" "}
                                </button>
                                <button
                                    onClick={downloadJSON}
                                    className="inline-flex gap-2 justify-center px-4 py-2 w-full bg-blue-600 text-white font-semibold rounded-md"
                                >
                                    <Download className="inline h-5 w-5" />{" "}
                                    Download JSON
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {generatedJSON && (
                    <div className="flex">
                        <div className="flex w-full place-items-start flex-col gap-5 p-4">
                            <h1 className="text-3xl md:text-lg xl:text-3xl font-semibold text-blue-500">
                                Search JSON
                            </h1>
                            <div className="w-full flex flex-col gap-2">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    placeholder="Search JSON"
                                    onChange={(e) =>
                                        handleSearch(e.target.value)
                                    }
                                    className="w-full px-4 py-2 bg-slate-100 text-slate-900 font-semibold rounded-md"
                                />
                            </div>
                        </div>
                    </div>
                )}
                {error && (
                    <div className="w-full flex items-center gap-2 bg-red-500 p-2 rounded-md">
                        <div className="bg-red-400/50 w-full rounded-md text-white p-2 flex gap-5 items-center text-sm">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{error}</span>
                        </div>
                    </div>
                )}
            </aside>
            <main className="p-4 w-full col-span-4 md:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-5 h-fit">
                {generatedJSON &&
                    !filteredJSON &&
                    generatedJSON.map((dictionary, index) => (
                        <Card
                            key={index}
                            dictionary={dictionary}
                            index={index}
                        />
                    ))}
                {filteredJSON &&
                    filteredJSON.map((dictionary, index) => (
                        <Card
                            key={index}
                            dictionary={dictionary}
                            index={index}
                        />
                    ))}
            </main>
        </div>
    );
}

export default App;
