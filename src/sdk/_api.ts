import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

/*
async function api(url: string) {
    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, { signal });
    clearTimeout(timeoutId);
}
*/


type ApiError = {
    message: string;
}

const processOcrSchema = z.object({
    text: z.string(),
    confidence: z.number()
});

type ProcessOcrDto = z.infer<typeof processOcrSchema>;

async function processOcr() {
    return useQuery({ queryKey: ["processOcr"], queryFn: async () => {
        const formData = new FormData();
        formData.append('file', {
            uri: fileUri,
            type: "image/jpeg",
            name: "imagemfoto.jpeg"
        });

        try {
            const response = await fetch("", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                }
            });

            if (!response.ok) {
                throw new Error();
            }

            const json = response.json();

            processOcrSchema.parse(json);

            return json as Promise<ProcessOcrDto>;
        } catch(err: any) {
            throw new Error();
        }
    }})
}

export interface Client {
    processOcr(): Promise<string>;
}

class HttpClient implements Client {
    private baseUrl: URL;

    constructor(baseUrl: URL) {
        this.baseUrl = baseUrl;
    }

    async processOcr() {
        const response = await fetch("", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
            }
        });

        if (!response.ok) {
            throw new Error();
        }

        const json = await response.json() as string;
        return json;
    }
}

interface Api {
    processOcr(): Promise<ProcessOcrDto>;
}

class ApiImpl implements Api {
    private client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async processOcr() {
        const json = await client.processOcr();
        return processOcrSchema.parse(json);
    }
}

const baseUrl = new URL("");
const client = new HttpClient(baseUrl);

export default new ApiImpl(client);
