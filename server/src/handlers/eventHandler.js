import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import getAllFiles from "../utils/getAllFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const eventHandler = async (app) => {
    const eventsPath = path.join(__dirname, "..", "events");
    const eventFolders = getAllFiles(eventsPath, true);

    if (eventFolders.length === 0) 
    {
        throw new Error("No event folders found");
    }

    for (const eventFolder of eventFolders) 
    {
        const eventName = path.basename(eventFolder).toLowerCase();
        const eventFiles = getAllFiles(eventFolder).filter((file) => path.extname(file) === ".js",);

        for (const eventFile of eventFiles) 
        {
            const { default: handler } = await import(pathToFileURL(eventFile).href);

            if (typeof handler !== "function") 
            {
                throw new Error(`Event must export a default function: ${eventFile}`,);
            }
            await handler(app, eventName);
        }
    }
};

export default eventHandler;