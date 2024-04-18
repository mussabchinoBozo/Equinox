import fetch from 'node-fetch';

export async function check(host) {
    try {
        if (!host.startsWith('https://')) {
            host = 'https://' + host + '/';
        }
        const response = await fetch(`https://licensing.wrnd.site/check?host=${host}`);
        const data = await response.json();
        if (data.status === 'Link is a valid community link') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error fetching community status:', error);
        return false;
    }
}