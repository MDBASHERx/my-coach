import fs from "node:fs";
import path from "node:path";

const getAllFiles = (directory, foldersOnly = false, recursive = false) => {
    const results = [];
    const entries = fs
        .readdirSync(directory, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name, "en"));

    for (const entry of entries) 
    {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) 
        {
            if (foldersOnly) 
            {
                results.push(fullPath);
            }

            if (recursive) 
            {
                results.push(
                    ...getAllFiles(fullPath, foldersOnly, recursive),
                );
            }
        }
        else if (entry.isFile() && !foldersOnly) 
        {
            results.push(fullPath);
        }
    }
    return results;
};

export default getAllFiles;