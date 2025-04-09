import axios from "axios";

export const getCodeChefName = async (req, res) => {
    const username = req.username;
    const url = `https://www.codechef.com/users/${username}`;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
    };

    try {
        if (!username || typeof username !== 'string') {
            throw new Error('Invalid username');
        }

        // First request to get session cookies
        const sessionRes = await axios.get('https://www.codechef.com/', { headers });
        const cookies = sessionRes.headers['set-cookie'].join(';');

        // Second request with cookies
        const response = await axios.get(url, {
            headers: {
                ...headers,
                Cookie: cookies
            }
        });
        const html = response.data;

        // Extract name using regex
        const nameMatch = html.match(/<h1 class="h2-style">([^<]+)<\/h1>/);
        if (!nameMatch || !nameMatch[1]) { throw new Error('Name not found in profile'); }

        return { name: nameMatch[1].trim() };

    } catch (error) {
        throw new Error(`Failed to fetch CodeChef profile: ${error.message}`);
    }
};