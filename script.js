const apiKey = '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'; // Replace with your Hugging Face API key
const apiUrl = 'https://api-inference.huggingface.co/models/gpt2';

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
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({ inputs: message })
        });
        const data = await response.json();
        addMessage('ai', data[0].generated_text.trim());
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
