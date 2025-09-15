// utils.js (Example - could contain helper functions)
// For example, a function to calculate the difference between team averages and overall averages
import _ from 'lodash'; // If you're using lodash

/**
 * Average attribute value of a teams.
 *
 * @param {Array<object>} team - Array of member objects with attributes.
 * @param {String} attributes - String of attribute names to average.
 * @returns {integer} - Average.
 */
function averageTeamAttribute(team, attributes) {
    if (!team || team.length === 0) {
        return null; // Handle empty input
    }
    let sum = 0;

    for (const member of team) {
        sum += member[attributes];
    }
    //console.log("sum:", sum);
    return (sum / team.length);
}


export default averageTeamAttribute;