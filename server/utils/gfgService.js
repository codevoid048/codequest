import axios from 'axios';

export const getGFGName = async (username) => {
    const url = `https://auth.geeksforgeeks.org/user/${username}/practice/`;
    const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' };

    try {
        if (!username || typeof username !== 'string') {
            throw new Error('Invalid username');
        }

        const response = await axios.get(url, { headers });
        const html = response.data;
        const startMarker = '<script id="__NEXT_DATA__" type="application/json">';
        const endMarker = '</script>';
        const jsonStr = html.split(startMarker)[1].split(endMarker)[0];
        const data = JSON.parse(jsonStr);

        const userInfo = data.props.pageProps.userInfo;

        if (!userInfo?.name) { throw new Error('Name not found in user profile'); }

        const val = {
            name: userInfo.name,
            total_problems_solved: userInfo.total_problems_solved,
            institute_rank: userInfo.institute_rank,
            rating: data.props.pageProps.contestData.user_contest_data?.current_rating || null
        };

        return val;
    }
    catch (error) {
        if (error.response?.status === 404) {
            throw new Error('Profile not found');
        }
        else {
            throw new Error(`Failed to fetch GFG profile: ${error.message}`);
        }
    }
}