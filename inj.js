export async function check(host) {
    try {
        const baseDomain = host.split('.').slice(-3).join('.');

        const url = `https://licensing.wrnd.site/check?host=${baseDomain}`;
        
        const response = await fetch(url);
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