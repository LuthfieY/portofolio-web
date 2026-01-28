import React, { useEffect } from 'react';

const N8NChatbot = () => {
  const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

  useEffect(() => {
    if (!webhookUrl) {
      console.warn('N8N_WEBHOOK_URL is not defined');
      return;
    }

    const scriptUrl = 'https://cdn.n8nchatui.com/v1/embed.js';

    // Inject Script
    const script = document.createElement('script');
    script.type = 'module';
    // We defer execution slightly to ensure DOM is ready if needed, mostly standard for module scripts
    script.defer = true;

    script.innerHTML = `
          import Chatbot from "${scriptUrl}";
          Chatbot.init({
            "n8nChatUrl": "${webhookUrl}",
            "metadata": {},
            "theme": {
              "button": {
                "backgroundColor": "#ffffff",
                "right": 20,
                "bottom": 20,
                "size": 50,
                "iconColor": "#373434",
                "customIconSrc": "https://www.svgrepo.com/show/362552/chat-centered-dots-bold.svg",
                "customIconSize": 60,
                "customIconBorderRadius": 15,
                "autoWindowOpen": {
                  "autoOpen": false,
                  "openDelay": 2
                },
                "borderRadius": "rounded"
              },
              "tooltip": {
                "showTooltip": true,
                "tooltipMessage": "Hello 👋",
                "tooltipBackgroundColor": "#ffffff",
                "tooltipTextColor": "#1c1c1c",
                "tooltipFontSize": 15,
                "hideTooltipOnMobile": false
              },
              "allowProgrammaticMessage": false,
              "chatWindow": {
                "borderRadiusStyle": "rounded",
                "avatarBorderRadius": 25,
                "messageBorderRadius": 6,
                "showTitle": true,
                "title": "Luthfie's AI Assistant",
                "titleAvatarSrc": "https://www.svgrepo.com/show/362552/chat-centered-dots-bold.svg",
                "avatarSize": 38,
                "welcomeMessage": "Hi there! I am Luthfie's AI Assistant. How can I help you learn more about his work?",
                "errorMessage": "Oops! Something went wrong. Please try again later",
                "backgroundColor": "#ffffff",
                "height": 500,
                "width": 350,
                "fontSize": 16,
                "starterPrompts": [
                  "Who is Luthfie?",
                  "Show me his projects",
                  "Contact Information"
                ],
                "starterPromptFontSize": 15,
                "renderHTML": false,
                "clearChatOnReload": false,
                "showScrollbar": false,
                "botMessage": {
                  "backgroundColor": "#666666",
                  "textColor": "#fafafa",
                  "showAvatar": true,
                  "avatarSrc": "https://www.svgrepo.com/show/448936/assistant.svg",
                  "showCopyToClipboardIcon": false
                },
                "userMessage": {
                  "backgroundColor": "#fff6f3",
                  "textColor": "#050505",
                  "showAvatar": true,
                  "avatarSrc": "https://www.svgrepo.com/show/532363/user-alt-1.svg"
                },
                "textInput": {
                  "placeholder": "Type your question...",
                  "backgroundColor": "#ffffff",
                  "textColor": "#1e1e1f",
                  "sendButtonColor": "#666666",
                  "maxChars": 200,
                  "maxCharsWarningMessage": "You exceeded the characters limit. Please input less than 200 characters.",
                  "autoFocus": false,
                  "borderRadius": 6,
                  "sendButtonBorderRadius": 50
                }
              }
            }
          });
        `;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, [webhookUrl]);

  return null;
};

export default N8NChatbot;
