const apiKey = 'iOVf3dNxrDibqnqu3ypSYU2y1WvOQ2gHc4EmuOcg'; // Replace with your Cohere API key
const apiUrl = 'https://api.cohere.ai/v1/generate';

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', () => {
    const message = userInput.value;
    if (message.trim()) {
        addMessage('user', message);
        sendMessage(message);
        userInput.value = '';
    }
});

async function sendMessage(message) {
    try {
        const prompt = `The following is a conversation between a user and an AI assistant. The AI assistant is helpful, creative, clever, and very friendly.\n\nUser: ${message}\nAI:`;
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50,
                temperature: 0.7,
                k: 0,
                p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop_sequences: ["\n"]
            })
        });
        const data = await response.json();
        const aiResponse = data.text.trim();
        addMessage('ai', aiResponse);
    } catch (error) {
        console.error('Error:', error);
    }
}

function addMessage(type, text) {
    const messageElement = document.createElement('p');
    messageElement.className = type === 'user' ? 'user-message' : 'ai-message';
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
