// henter importeringer av nødvendige moduler
import {env} from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import OpenAI from "openai";

// Initialiserer OpenAI-klienten med API-nøkkelen fra miljøvariabler
const api_key = env.OPENAI_API_KEY;
// henter inn vector store ID fra miljøvariabler
const vector_store_id = env.VECTOR_STORE_ID;
// Initialiserer OpenAI-klienten

// henter inn instruksjoner fra miljøvariabler
const instructions = env.INSTRUCTIONS;

const client = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});



const tools = [
    {
        type: "function",
        name: "SNL_lookup",
        description: "Bruk denne funksjonen for å slå opp innformasjon i Store Norske Leksikon.",
        parameters: {
            type: "object",
            properties: {
                sign: {
                    type: "string",
                    description: "Søkeordet eller frasen som skal slås opp i Store Norske Leksikon."
                },
            },
            required: []
        },  
    },
];


async function SNL_lookup({sign}) {
    const apiUrl = `https://snl.no/api/v1/search?query=${sign}&limit=4`;
    const response = await fetch(apiUrl);
    return await response.json();
}




// definerer en response_ID variabel som kan hentes og opdateres underveis for å holde styr på samtalens kontekst
let response_ID = null;

// Håndterer POST-forespørsler fra frontend
/** @type {import('./$types').RequestHandler} */
// definerer en funksjon som håndterer POST-forespørsler
export async function POST(request) {
    // prøver å hente meldingen fra forespørselen og generere et svar
    try {
        const { message } = await request.request.json();
        console.log('Received message from frontend:', message);
        
        // Genererer et svar ved å bruke OpenAI-klienten med fil-søk som verktøy
        const response = await client.responses.create({
            model: "gpt-5.1",
            instructions: instructions,
            input: [
                {
                    role: "user",
                    content: message,
                }
            ],
            tools: [
                {
                    type: "file_search",    
                    vector_store_ids: [vector_store_id]
                },
                {
                    type: "web_search"
                },
                ...tools  // Legg til din SNL_lookup function
            ],
            previous_response_id: response_ID
        });
        // Oppdaterer response_ID for å holde styr på samtalens kontekst
        response_ID = response.id;

        // Logg hele responsen for feilsøking
        console.log('OpenAI full response:', response);

        // Håndterer tool calls
        while (response.output.some(item => item.type === 'tool_call')) {
            const input_list = [];

            for (const item of response.output) {
                if (item.function?.name === 'SNL_lookup') {
                    const tool_response = await SNL_lookup(item.function.parameters);
                } else {
                    console.error(`Unknown tool: ${item.name}`);
                }

                input_list.push({
                    type: 'function_call_output',
                    tool_call_id: item.id,
                    content: tool_response
                    
                })

                response = await client.responses.create({
                    model: 'gpt-4.1',
                    instructions: "Bruk informasjonen fra verktøyene til å svare på brukerens spørsmål.",
                    input: input_list,
                    tools: tools
                })
                previous_response_id = response.id;

                console.log('Updated response after tool call:', response);

            }
        }

        // Returner kun svaret til frontend
        return json({ response: response.output_text });
    // håndterer eventuelle feil som oppstår under prosessen
    } catch (error) {
        console.error("Error:", error);
        if (error.response) {
            try {
                const errorData = await error.response.json();
                console.error("OpenAI error response:", errorData);
                return json({ error: errorData }, { status: 500 });
            } catch (parseErr) {
                console.error("Kunne ikke parse OpenAI error response", parseErr);
            }
        }
        return json({ error: "Failed to generate response" }, { status: 500 });
    }
}
