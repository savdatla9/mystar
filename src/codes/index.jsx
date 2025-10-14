import { Sandpack } from "@codesandbox/sandpack-react";
import { cyberpunk } from "@codesandbox/sandpack-themes";

const CodeBase = () => {
    const files = {};

    return (
        <div>
            <h3 style={{marginLeft: '16%', marginBottom: '1%'}}>CodeBase</h3>

            <div style={{ width: '30%', marginLeft: '15%' }}>
                <Sandpack
                    files={files}
                    theme={cyberpunk}
                    template="react"
                    options={{
                        editorHeight: "35vh",
                        showConsole: true,
                        showConsoleButton: true,
                        showInlineErrors: true,
                        showNavigator: true,
                        showLineNumbers: true,
                        showTabs: true,
                    }}                
                />
            </div>
        </div>
    );
};

export default CodeBase;