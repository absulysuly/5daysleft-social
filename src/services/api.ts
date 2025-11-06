/**
 * Fetches platform statistics.
 * For demonstration purposes, this returns mock data to ensure the app is always functional
 * without requiring a live backend.
 * @returns {Promise<any>} A promise that resolves to the platform stats.
 */
export async function getStats(): Promise<any> {
    // Simulate a network request delay for a more realistic loading experience.
    await new Promise(resolve => setTimeout(resolve, 500)); 
    
    const mockStats = {
        users: 1450,
        commits: 234,
        openIssues: 12,
        deployments: 78,
    };
    
    return mockStats;
}
