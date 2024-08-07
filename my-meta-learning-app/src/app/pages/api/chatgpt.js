import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { userInput } = req.body;

        try {
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: userInput,
                max_tokens: 150,
            });

            res.status(200).json({ result: response.data.choices[0].text });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}