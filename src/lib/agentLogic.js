export const selectedAgent = async (user_message, agentType) => {
    let response;
    switch(agentType) {
        case 'openai':
            console.log('Using OpenAI agent');
            response = await fetch('/openai', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json' 
                },
                body: JSON.stringify({ message: user_message })
            });
            const payload = await response.json();
            const raw = payload.response ??
            // eller fallback til choices-strukturen
                payload.choices?.[0]?.message?.content ?? '';
            return raw || 'Beklager, jeg har ingen svar.';
        }
    };




















/*
export const selectedAgent = async (user_message, agentType) => {
    let response;
    if (agentType === 'openai') {

        console.log('Using OpenAI agent');
        response = await fetch('/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: user_message })
        });
        const payload = await response.json();

        const raw = payload.response ??
        // eller fallback til choices-strukturen
            payload.choices?.[0]?.message?.content ?? '';

        return raw || 'Beklager, jeg har ingen svar.';


        
    } else if (agentType === 'syntaxAgent') {
        console.log('Using Code syntaxAgent');
        response = await fetch('/syntaxAgent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: user_message })
        });
        const payload = await response.json();

        const raw = payload.response ??
        // eller fallback til choices-strukturen
            payload.choices?.[0]?.message?.content ?? '';
        return raw || 'Beklager, jeg har ingen svar.'; 


        
    } else if (agentType === 'mistral') {
        console.log('Using Mistral agent');
        response = await fetch('/mistral', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: user_message })
        });
        const payload = await response.json();

        const raw = payload.response ??
        // eller fallback til choices-strukturen
            payload.choices?.[0]?.message?.content ?? '';
        return raw || 'Beklager, jeg har ingen svar.';
    }
}

*/