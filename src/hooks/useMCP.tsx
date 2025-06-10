export default function useMCP() {
    
    // This function sends a command to the MCP server for interpretation.
    async function interpret(command: string) {
        const res = await fetch("/mcp/parse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ command })
        });
        if (!res.ok) throw new Error("MCP parse failed");
        return await res.json();              // { country, city, start_time, ... }
    }
    return { interpret };
}
