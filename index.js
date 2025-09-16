// index.js
import _ from 'lodash'; // If you're using lodash

/**
 * Organizes members into teams with balanced attributes.
 *
 * @param {Array<object>} members - Array of member objects with attributes.
 * @param {number} numTeams - The desired number of teams.
 * @param {Array<string>} attributesToBalance - Array of attribute names to balance.
 * @returns {Array<Array<object>>} - An array of teams (arrays of member objects).
 */
export function organizeTeams(members, numTeams, attributesToBalance) {
    if (!members || members.length === 0 || numTeams <= 0) {
        return []; // Handle empty input
    }

    const numMembers = members.length;
    if (numMembers < numTeams) {
        console.warn("More teams requested than members available.  Returning each member in their own team.");
        return members.map(member => [member]); // Each member in their own team
    }

    const teamSize = Math.floor(numMembers / numTeams);
    const teams = Array.from({ length: numTeams }, () => []); // Create empty teams

    // 1. Calculate overall averages for each attribute
    const overallAverages = {};
    for (const attribute of attributesToBalance) {
        overallAverages[attribute] = _.mean(members.map(member => member[attribute]));
    }

    // 2.  Greedy assignment: Assign each member to the team that minimizes
    //     the difference between the team's average and the overall average
    for (const member of members) {
        let bestTeamIndex = -1;
        let minDiff = Infinity;

        for (let i = 0; i < numTeams; i++) {
            if (teams[i].length < teamSize) { // Only consider teams that aren't full
                // Calculate what the team's averages would be if we added this member
                const potentialTeam = [...teams[i], member];
                const potentialTeamAverages = {};
                for (const attribute of attributesToBalance) {
                    potentialTeamAverages[attribute] = _.mean(potentialTeam.map(m => m[attribute]));
                }

                // Calculate the total difference between the potential team averages and the overall averages
                let totalDiff = 0;
                for (const attribute of attributesToBalance) {
                    totalDiff += Math.abs(potentialTeamAverages[attribute] - overallAverages[attribute]);
                }

                if (totalDiff < minDiff) {
                    minDiff = totalDiff;
                    bestTeamIndex = i;
                }
            }
        }

        // If all teams are full, assign to the team with the fewest members
        if (bestTeamIndex === -1) {
            let minTeamSize = Infinity;
            for (let i = 0; i < numTeams; i++) {
                if (teams[i].length < minTeamSize) {
                    minTeamSize = teams[i].length;
                    bestTeamIndex = i;
                }
            }
        }

        teams[bestTeamIndex].push(member);
    }

    return teams;
}


/*module.exports = {
    organizeTeams: organizeTeams
};*/