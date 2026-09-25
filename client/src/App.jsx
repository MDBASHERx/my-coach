import { useEffect, useState } from "react";
import { getServerHealth } from "./services/api.js";
import "./styles/Test.css";

function App() {
    const [serverStatus, setServerStatus] = useState("loading");

    useEffect(() => {
        const controller = new AbortController();

    const checkServer = async () => {
        try {
            await getServerHealth(controller.signal);

        if (!controller.signal.aborted) 
        {
            setServerStatus("success");
        }
        } catch {
            if (!controller.signal.aborted) 
            {
            setServerStatus("error");
            }
        }
    };

        checkServer();

        return () => controller.abort();
    }, []);

    return (
        <main className="welcome">
            <span className="welcome__badge">
                خطوة صغيرة اليوم، مستقبل أفضل غدًا
            </span>

            <h1 lang="en" dir="ltr">MY COACH</h1>
            <h2>معلمك ومرشدك الدراسي</h2>

            <p>
                افهم قدراتك، نظّم دراستك، وابنِ طريقك نحو المستقبل خطوة بخطوة.
            </p>

            <p className={`server-status server-status--${serverStatus}`} role="status">
                {serverStatus === "loading" && "جارٍ التحقق من الاتصال بالخادم…"}
                {serverStatus === "success" && "تم الاتصال بالخادم بنجاح"}
                {serverStatus === "error" && "تعذّر الاتصال بالخادم"}
            </p>
        </main>
    );
}

export default App;