<script>
// importerer onMount fra svelte
import { onMount } from 'svelte';
import { marked } from 'marked';

// deklarerer globale variabler
let chatbox, userInput, sendButton, resetButton, toggleMenu;

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
        // Sjekk om vi har nådd slutten av innholdet
        if (index >= htmlContent.length) {
            // Sørg for at alt innhold vises til slutt
            element.innerHTML = htmlContent;
            clearInterval(interval);
        }
        // Rull chatboksen til bunnen
        chatbox.scrollTop = chatbox.scrollHeight;
    }, speed);
};

//  \funksjon for å legge til samtalen i chatboksen
const createChatBubble = (message, className, isStreaming = false) => {
    let chatli = document.createElement('li');
    chatli.classList.add(className);

    let content = '';
    if (className === 'chat_incoming') {
        content = `<div class="bot_message"></div>`;
    } else {
        content = `<div class="user_message"></div>`;
    }

    chatli.innerHTML = content;
    chatbox.appendChild(chatli);


    const messageDiv = chatli.querySelector(className === 'chat_incoming' ? '.bot_message' : '.user_message');

    if (isStreaming && className === 'chat_incoming') {
        // Bruk streaming-funksjonen for bot-meldinger
        streamMarkdown(messageDiv, message);
    } else {
        // Sett inn hele meldingen på en gang
        messageDiv.innerHTML = marked(message);
    }
};

// funksjon for å sende melding
function sendMessage() {
    const user_message = userInput.value.trim();
    if (user_message === '') return;
    createChatBubble(user_message, 'chat_outgoing');

    selectedAgent(user_message).then((bot_response) => {
        createChatBubble(bot_response, 'chat_incoming', true);
    });
    userInput.value = '';
}

const selectedAgent = async (user_message, typingIndex) => {
    let response;
    if (toggleMenu.value === 'openai') {
        console.log('Valgt agent er openai');
        response = await fetch('/openai', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({ message: user_message, agent: 'openai'})          
        });
        const payload = await response.json();

        const raw = payload.response ??
        // eller fallback til choices-strukturen
            payload.choices?.[0]?.message?.content ?? '';

        return raw || 'Beklager, jeg har ingen svar.';

    } else if (toggleMenu.value === 'codeGeneration') {
        console.log('Valgt agent er codeGeneration');
        let response;
        response = await fetch('/codeGeneration', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body:JSON.stringify({ message: user_message, agent: 'codeGeneration'})
        });
        const payload = await response.json();

        const raw = payload.response ??
        // eller fallback til choices-strukturen
            payload.choices?.[0]?.message?.content ?? '';
        
        return raw || 'Beklager, jeg har ingen svar.';
    }
    
}


// onMount for å initialisere elementer og legge til event-lyttere
onMount(() => {
    chatbox = document.querySelector('.chatBox');
    userInput = document.querySelector('.user_input');
    sendButton = document.querySelector('.snd_btn');
    resetButton = document.querySelector('.rst-btn');
    toggleMenu = document.querySelector('.agent_btn');

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            chatbox.innerHTML = '';
        })
    }

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
    <div class="rst-btn_container">
        <button class="rst-btn" title="Ny samtale" type="button"><img src="/bilder/chat-notification_17178348.png" alt="Reset chat"></button>
    </div>
    <div class="agenst_container">
        <select class="agent_btn" name="" id="">
            <option value="openai">GPT-5.1</option>
            <option value="codeGeneration">Code generation</option>
        </select>
    </div>
    <h1>
        FagAssistenten
    </h1>
    
</header>
<main>

    <ul class="chatBox">
        <li class="chat_incoming">
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
    height: 100%;

    background-color: #2f2f2f;

    /* DYBDE-LAG – mye lysere, større spotlight */
    background-image:

        /* Soft ambient light */
        radial-gradient(circle at 50% 35%, 
            rgba(255, 255, 255, 0.15),
            rgba(0, 0, 0, 0) 75%
        ),

        /* Lys vignette – trekker rommet utover i stedet for innover */
        radial-gradient(circle at center,
            rgba(179, 179, 179, 0.248),
            rgba(0, 0, 0, 0) 70%
        ),

        /* Grid pattern (beholder ditt mønster) */
        radial-gradient(circle, rgba(200, 200, 200, 0.22) 0.5px, transparent 1px),
        radial-gradient(circle, rgba(200, 200, 200, 0.14) 0.5px, transparent 1px),

        /* Noise – subtil, men gir rom */
        url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAABAfUpYAAAACXBIWXMAAAsSAAALEgHS3X78AAAAKUlEQVR4nO3PMQ0AIBAEwbn/zeaBB0LISwLt8XwPJW4kjJkpdzHWtYAAAAASUVORK5CYII=');

    background-size:
        100% 100%,    /* ambient */
        100% 100%,    /* vignette */
        32px 32px,    /* pattern 1 */
        32px 32px,    /* pattern 2 */
        200px 200px;  /* noise */

    background-position:
        center,
        center,
        0 0,
        16px 16px,
        0 0;

    background-blend-mode:
        overlay,
        soft-light,
        normal,
        normal,
        soft-light;

    max-height: 100%;
}
h1 {
    flex: 1;
    text-align: center;
    margin: 1em 0;
    font-size: 2.4em;
    font-weight: 300;
    letter-spacing: 1.5px;
    color: #e8e8e8;
    text-shadow: 0 0 6px rgba(255,255,255,0.12);
}

    header {
        display: flex;
        align-items: center;
        padding: 20px;
        position: relative;
    }
    .chatBox {
        height: 500px;
        width: 65%;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        color: white;
        list-style: none;
        padding: 20px;
        
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
        width: 50%;
        height: 60px;
        max-height: 60px;
        margin: 20px auto;
        display: flex;
        gap: 10px;
    }
    
    .user_input {
        flex: 1;
        padding: 12px 16px;
        font-size: 16px;
        border: 2px solid #323232;
        border-radius: 8px;
        background-color: #484848;
        color: white;
        transition: border-color 0.3s ease;
        box-shadow:
        0 2px 4px rgba(44, 44, 44, 0.25),
        0 4px 10px rgba(44, 44, 44, 0.35);

        
    }
    
    .user_input:focus {
        outline: none;
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
        border: 2px solid #323232;
        cursor: pointer;
        transition: background-color 0.3s ease;
        font-weight: 500;
        box-shadow:
        0 2px 4px rgba(44, 44, 44, 0.25),
        0 4px 10px rgba(44, 44, 44, 0.35);
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
        font-size: 20px;
        line-height: 1.5;
        word-wrap: break-word;
    }
    
    :global(.user_message) {
        background: #484848;
        margin: 0;
        padding: 16px 20px;
        font-size: 20px;
        border-radius: 18px 18px 4px 18px;
        max-width: 75%;
        line-height: 1.5;
        word-wrap: break-word;
    }
    .rst-btn_container {
        position: absolute;
        left: 20px;
        top: 35%;
        transform: translateY(-50%);
    }
    .rst-btn {
        height: 50px;
        width: 50px;
        border-radius: 10px;
        border: none;
        box-shadow:
        0 2px 4px rgba(44, 44, 44, 0.25),
        0 4px 10px rgba(44, 44, 44, 0.35);
        background-color: #707575;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    .rst-btn:hover {
        background-color: #858585;
    }
    
    .rst-btn img {
        width: 40px;
        height: 40px;
        object-fit: contain;
        transition: transform 0.3s ease;
    }
    .rst-btn img:hover {
            border-color: #666;

    }
    .agenst_container {
        position: absolute;
        top: 75%;
        transform: translateY(-50%);
    }
    .agent_btn {
        height: 50px;
        width: 120px;
        border-radius: 10px;
        border: none;
        box-shadow:
        0 2px 4px rgba(44, 44, 44, 0.25),
        0 4px 10px rgba(44, 44, 44, 0.35);
        background-color: #707575;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .agent_btn:hover {
        background-color: #666;
    }
</style>