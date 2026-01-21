import {env} from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import OpenAI from "openai";


const api_key = env.OPENAI_API_KEY;

const client = new OpenAI({
    apiKey: env.OPENAI_API_KEY
})


let tools = [
    {
        type: "function",
        name: "chucknorris",
        description: "Returns a random Chuck Norris joke.",
        parameters: {
            type: "object",
            properties: {
                sign: {
                    type: "string",
                    description: "The sign for which to get a Chuck Norris joke."
                },
            },
            required: [],
        },
    },
];

    
const chucknorris = async () => {
    const url = "https://api.chucknorris.io/jokes/random";
    if (!url) {
        throw new Error("URL is required");
    } else {
        const response = await fetch(url);
        return await response.json();
    }
}

let response_ID = null;

// Håndterer POST-forespørsler fra frontend
/** @type {import('./$types').RequestHandler} */

export async function POST(request) {
    try {
        const { message} = await request.request.json();
        console.log('Received message from frontend:', message);

        const response = await client.responses.create({
            model: "gpt-4.1",
            instructions: "You are a helpful assistant.",
            input: [
                {
                    role: "user",
                    content: message,
                },
                
            ],
            tools: tools,
            previous_response_id: response_ID
        });
        response_ID = response.id;

        console.log('TestAgent full response:', response);

        while (response.output.some(item => item.type === "function_call")) {
            let input_list = [

            ];
            for (const item of response.output) {
                if (item.type === "function_call") {
                    console.log("---> Kaller funksjon:", item.function?.name);
                    if (item.function?.name === "chucknorris") {
                        const toolResult = await chucknorris();
                        console.log("---> Funksjonsresultat:", toolResult);
                        input_list.push({
                            type: "function_call_output",
                            tool_call_id: item.id,
                            content: JSON.stringify(toolResult)
                        });
                    }
                    const followUpResponse = await client.responses.create({
                        model: "gpt-4.1",
                        instructions: "You are a helpful assistant.",
                        input: input_list,
                        tools: tools,
                        previous_response_id: response_ID
                    });
                    response_ID = followUpResponse.id;
                    console.log('Follow-up response:', followUpResponse);
                    return json({response: followUpResponse.output_text});
                    
                }
             }
              return json({ response: response.output_text });
        }
    
        

     }  catch (error) {
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
