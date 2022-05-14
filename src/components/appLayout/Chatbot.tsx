import React from "react";

export function Chatbot() {
  return (
    <div>
      <div
        dangerouslySetInnerHTML={{
          __html: `
          <df-messenger
          chat-icon="https:&#x2F;&#x2F;cdn-icons-png.flaticon.com&#x2F;512&#x2F;4403&#x2F;4403384.png"
          intent="WELCOME"
          chat-title="FYPBOT"
          agent-id="6d9fdb8d-146e-48f8-90f8-4c6bbf0fd34e"
          language-code="en"
        ></df-messenger>
`,
        }}
      />
    </div>
  );
}
