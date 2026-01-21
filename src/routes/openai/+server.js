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
            ],
            previous_response_id: response_ID
        });
        // Oppdaterer response_ID for å holde styr på samtalens kontekst
        response_ID = response.id;

        // Logg hele responsen for feilsøking
        console.log('OpenAI full response:', response);
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
