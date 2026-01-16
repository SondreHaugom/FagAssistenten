// en funksjon som bruker valgte agenten som brukeren har valgt
export const selectedAgent = async (user_message, agentType) => {
    // Velger riktig endepunkt basert på agenttypen
    let endpoint = '/openai';
    if (agentType === 'mistral') endpoint = '/mistral';
    if (agentType === 'syntaxAgent')  endpoint = '/syntax';
    // logger agenten som brukes
    console.log(`Using ${agentType} agent`);
    // sender brukerens melding til det valgte endepunktet
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: user_message
        })
    });
    // Henter svaret fra agenten
    const payload = await response.json();
    // trekker ut svaret fra payload
    const raw = payload.response ??
        // henter verdien fra valgt agent
        payload.choices?.[0]?.message?.content ?? '';
    // returnerer svaret eller en standardmelding hvis svaret er tomt
    return raw || 'Beklager, jeg har ingen svar.';
};
