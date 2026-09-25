import "colors";

const consoleLog = async (app) => {
    const port = Number(process.env.PORT);

    if (!Number.isInteger(port) || port < 1 || port > 65535) 
    {
        throw new Error("PORT must be an integer between 1 and 65535");
    }

    await new Promise((resolve, reject) => {
        const server = app.listen(port);

        server.once("error", reject);

        server.once("listening", () => {
            console.log("[INFO]".blue + " The server is running on ".yellow + `http://localhost:${port}`.green);
            resolve();
        });
    });
};

export default consoleLog;