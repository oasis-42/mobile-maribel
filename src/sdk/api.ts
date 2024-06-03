import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

const BASE_URL = "https://api-maribel-production.up.railway.app";

const processOcrSchema = z.object({
    text: z.string(),
    confidence: z.number()
});

function getBaseHeaders() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
}

function processOcr(imageBase64: string) {
    return useQuery({ queryKey: ["processOcr"], queryFn: async () => {
        try {
            const jsonBody = JSON.stringify({
                "base64": imageBase64
            })

            const response = await fetch(`${BASE_URL}/api/v1/ocr/base64`, {
                method: "POST",
                headers: getBaseHeaders(),
                body: jsonBody,
                redirect: "follow"
            });

            const jsonResponse = await response.json();

            processOcrSchema.parse(jsonResponse);

            return jsonResponse;
        } catch(err: any) {
            throw new Error();
        }
    }});
}

export default Object.freeze({ 
    processOcr 
});