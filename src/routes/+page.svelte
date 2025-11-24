<script>
// importerer onMount fra svelte
import { onMount } from 'svelte';
import { marked } from 'marked';

// deklarerer globale variabler
let chatbox, userInput, sendButton;

// funksjon for å streame tekst
const streamText = (element, text, speed = 2) => {
    // definerer en indeks for å holde styr på posisjonen i teksten
    let index = 0;
    // tømmer innholdet i elementet før streaming
    element.innerHTML = '';
    // setter opp et intervall for å legge til ett tegn om gangen
    const interval = setInterval(() => {
        // legger til ett tegn i elementet
        element.innerHTML += text[index];
        // øker indeksen
        index++;
        // hvis vi har nådd slutten av teksten, stopper vi intervallet
        if (index >= text.length) {
            clearInterval(interval);
        }
        // ruller chatboksen til bunnen for å vise ny tekst
        chatbox.scrollTop = chatbox.scrollHeight;
    }, speed);
};

// Ny funksjon for å streame markdown-formatert tekst
const streamMarkdown = (element, markdownText, speed = 5) => {
    // Konverter markdown til HTML først
    const htmlContent = marked(markdownText);
    let index = 0;
    element.innerHTML = '';
    
    const interval = setInterval(() => {
        // Vis tegn for tegn, men prøv å holde HTML-struktur intakt
        const currentContent = htmlContent.substring(0, index);
        
        // Enkel regex for å sikre at vi ikke bryter HTML-tagger
        const lastCompleteTag = currentContent.lastIndexOf('>');
        const lastOpenTag = currentContent.lastIndexOf('<');
        
        if (lastOpenTag > lastCompleteTag && index < htmlContent.length) {
            // Vi er midt i en HTML-tag, fortsett til vi er ferdig med tagen
            index++;
        } else {
            // Vis innholdet
            element.innerHTML = currentContent;
            index++;
        }
        
        if (index >= htmlContent.length) {
            // Sørg for at alt innhold vises til slutt
            element.innerHTML = htmlContent;
            clearInterval(interval);
        }
        
        chatbox.scrollTop = chatbox.scrollHeight;
    }, speed);
};

//  \funksjon for å legge til samtalen i chatboksen
const createChatBubble = (message, className, isStreaming = false) => {
    let chatli = document.createElement('li');
    chatli.classList.add(className);

    let content = '';
    if (className === 'chat_incoming') {
        content = `<div class="bot_message">${marked(message)}</div>`;
    } else {
        content = `<div class="user_message">${marked(message)}</div>`;
    }


    chatli.innerHTML = content;
    chatbox.appendChild(chatli);
    chatbox.scrollTop = chatbox.scrollHeight;
};

// funksjon for å sende melding
function sendMessage() {
    // henter og trimmer brukerens input
    const message = userInput.value.trim(); 
    // sjekker om meldingen er tom
    if (!message) return;
    createChatBubble(message, 'chat_outgoing');

    // Kall funksjon for bot-respons
    generateResponse(message).then(botMessage => {
        createChatBubble(botMessage, 'chat_incoming', true); // Aktiver streaming
    });

    // Tøm input-feltet etter sending
    userInput.value = '';
}


// funksjon for å generere bot-respons
async function generateResponse(user_message) {
    // Legg til "skriver..."-boblen
    const typingIndex = chatbox.children.length;
    createChatBubble('Skriver...', 'chat_incoming');
    // gjør et API-kall til serveren
    try {
        // henter respons fra serveren
        const response = await fetch('/server', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            // sender brukerens melding i body
            body: JSON.stringify({ message: user_message })
        }); 
        // Fjern typing‑boblen
        const typingNode = chatbox.children[typingIndex];
        // Hvis den finnes, fjern den
        if (typingNode) chatbox.removeChild(typingNode);

        // håndterer feil i responsen
        if (!response.ok) {
            throw new Error('Nettverksrespons var ikke ok');
        };
        // henter JSON-payload fra responsen
        const payload = await response.json();


        // Hent rå tekst fra payload
        const raw = payload.response ??
        // eller fallback til choices-strukturen
            payload.choices?.[0]?.message?.content ?? '';

        // Returner HTML‑strengen direkt
        return raw || 'Beklager, jeg har ingen svar.';
        // legger til en catch for feil
    } catch (e) {
        console.error('Chat fetch error →', e);
        // På feil: fjern typing‑boblen (hvis den fortsatt finnes)
        const typingNode = chatbox.children[typingIndex];
        if (typingNode) chatbox.removeChild(typingNode);
        return '<p>Beklager, noe gikk galt.</p>';
    }
}

// onMount for å initialisere elementer og legge til event-lyttere
onMount(() => {
    chatbox = document.querySelector('.chatBox');
    userInput = document.querySelector('.user_input');
    sendButton = document.querySelector('.snd_btn');

    // Legg til event-lyttere
    if (sendButton) {
        sendButton.addEventListener('click', sendMessage);
    }

    // Legg til event-lytter for Enter-tasten (men behold shift+enter for ny linje)
    if (userInput) {
        userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault(); // Hindrer linjeskift
                sendMessage();
            }
        });
    }
});
    </script>



<header>
    <h1>
        Lærling Bot
    </h1>
</header>
<main>

    <ul class="chatBox">
        <li class="chat_incoming">
            <div class="bot_message">
                <h2>👋 Velkommen!</h2>
                <p>Jeg er din hjelpsom assistent. Jeg kan gi deg <strong>strukturerte svar</strong> med:</p>
                <ul>
                    <li>📝 Overskrifter og avsnitt</li>
                    <li>💻 Kodeeksempler med <code>syntax highlighting</code></li>
                    <li>📋 Lister og formatering</li>
                </ul>
                <p><em>Spør meg gjerne om hva som helst!</em></p>
            </div>
        </li>
    </ul>
    <div class="input_container">
        <input type="text" class="user_input" placeholder="Skriv meldingen din her...">
        <button type="button" class="snd_btn" >sendt inn</button>

    </div>
</main>
<footer>

</footer>    






<style>
    /* Global markdown-styling */
    :global(.bot_message h1), :global(.user_message h1) {
        color: #ffffff;
        margin: 1.2em 0 0.8em 0;
        font-size: 1.5em;
        font-weight: bold;
        border-bottom: 2px solid #f8f8f8;
        padding-bottom: 0.3em;
    }
    
    :global(.bot_message h2), :global(.user_message h2) {
        color: #ffffff;
        margin: 1em 0 0.6em 0;
        font-size: 1.3em;
        font-weight: bold;
    }
    
    :global(.bot_message h3), :global(.user_message h3) {
        color: #ffffff;
        margin: 0.8em 0 0.4em 0;
        font-size: 1.1em;
        font-weight: bold;
    }

    /* Kodeblokker (pre + code) */
    :global(.bot_message pre), :global(.user_message pre) {
        background: #484848;
        color: #ecf0f1;
        padding: 16px 20px;
        border-radius: 8px;
        margin: 12px 0;
        overflow-x: auto;
        font-size: 14px;
        line-height: 1.4;
        border-left: 4px solid #353434;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    }

    /* Inline kode */
    :global(.bot_message code), :global(.user_message code) {
        background: #34495e;
        color: #e74c3c;
        padding: 3px 6px;
        border-radius: 4px;
        font-size: 0.9em;
        font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
        font-weight: 500;
    }

    /* Unngå dobbel styling for kode inne i pre-tagger */
    :global(.bot_message pre code), :global(.user_message pre code) {
        background: transparent;
        color: inherit;
        padding: 0;
        border-radius: 0;
        font-size: inherit;
    }

    /* Tekst-formatting */
    :global(.bot_message strong), :global(.user_message strong) {
        font-weight: bold;
        color: #ffffff;
    }
    
    :global(.bot_message em), :global(.user_message em) {
        font-style: italic;
        color: #ffffff;
    }

    /* Lister */
    :global(.bot_message ul), :global(.user_message ul) {
        margin: 0.8em 0;
        padding-left: 1.5em;
    }
    
    :global(.bot_message ol), :global(.user_message ol) {
        margin: 0.8em 0;
        padding-left: 1.5em;
    }
    
    :global(.bot_message li), :global(.user_message li) {
        margin: 0.3em 0;
        line-height: 1.4;
    }

    /* Avsnitt */
    :global(.bot_message p), :global(.user_message p) {
        margin: 0.8em 0;
        line-height: 1.6;
    }

    /* Sitater */
    :global(.bot_message blockquote), :global(.user_message blockquote) {
        border-left: 4px solid #95a5a6;
        margin: 1em 0;
        padding: 0.5em 1em;
        background: rgba(149, 165, 166, 0.1);
        font-style: italic;
    }

    /* Base styling */
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #353434;
    }
    
    h1 {
        color: white;
        text-align: center;
        margin: 1em 0;
        font-size: 2em;
    }
    .chatBox {
        height: 600px;
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        color: white;
        list-style: none;
        padding: 20px;
        border-radius: 10px;
    }
    /* Webkit (Chrome, Edge, Safari): */
    .chatBox::-webkit-scrollbar {
        width: 10px;
        background: #2c2c2c;
        border-radius: 10px;
    }
    .chatBox::-webkit-scrollbar-thumb {
        background: #444;
        border-radius: 10px;
        min-height: 40px;
    }
    .chatBox::-webkit-scrollbar-thumb:hover {
        background: #666;
    }
    /* Firefox: */
    .chatBox {
        scrollbar-width: thin;
        scrollbar-color: #444 #2c2c2c;
    }
    
    .input_container {
        width: 80%;
        height: 40px;
        max-height: 40px;
        margin: 20px auto;
        display: flex;
        gap: 10px;
    }
    
    .user_input {
        flex: 1;
        padding: 12px 16px;
        font-size: 16px;
        border: 2px solid #3d3d3d;
        border-radius: 8px;
        background-color: #484848;
        color: white;
        transition: border-color 0.3s ease;
    }
    
    .user_input:focus {
        outline: none;
        border-color: #484848;
    }
    
    .user_input::placeholder {
        color: #95a5a6;
    }
    
    .snd_btn {
        padding: 12px 24px;
        font-size: 16px;
        background-color: #3d3d3d;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: 500;
    }
    
    .snd_btn:hover {
        background-color: #6b6a6a;
    }
    
    :global(.chat_incoming) {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 15px;
    }
    
    :global(.chat_outgoing) {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 15px;
    }
    
    :global(.bot_message) {
    
        margin: 0;
        padding: 16px 20px;
        border-radius: 18px 18px 18px 4px;
        max-width: 75%;
        line-height: 1.5;
        word-wrap: break-word;
    }
    
    :global(.user_message) {
        background: linear-gradient(135deg, #3d3d3d );
        margin: 0;
        padding: 16px 20px;
        border-radius: 18px 18px 4px 18px;
        max-width: 75%;
        line-height: 1.5;
        word-wrap: break-word;
    }
</style>