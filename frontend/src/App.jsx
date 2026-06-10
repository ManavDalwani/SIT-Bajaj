import { useState } from "react";
import axios from "axios";

function App() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const edges = input
                .split("\n")
                .map((edge) => edge.trim())
                .filter((edge) => edge.length > 0);

            const res = await axios.post(
                "https://sit-bajaj-api.onrender.com/api/graph",
                { edges }
            );

            setResponse(res.data);
        } catch (error) {
            console.error(error);
            alert("API Error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>SIT Graph Processor</h1>

            <textarea
                rows={10}
                cols={50}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={"A->B\nA->C\nB->D"}
            />

            <br />
            <br />

            <button onClick={handleSubmit}>
                Submit
            </button>

            <br />
            <br />

            {loading && <p>Loading...</p>}

            {response && (
                <pre>
                    {JSON.stringify(response, null, 2)}
                </pre>
            )}
        </div>
    );
}

export default App;