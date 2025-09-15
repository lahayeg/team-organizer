// test/index.test.js
//const organizeTeams = require('./../organizeTeams');
import organizeTeams from '../index.js';
import averageTeamAttribute from '../utils.js';
import { describe, expect, it } from '@jest/globals'; // Import Jest functions


describe('organizeTeams', () => {
    it('should return an empty array if no members are provided', () => {
        expect(organizeTeams([], 2, ['skill'])).toEqual([]);
    });

    it('should create number teams as input', () => {
        const members = [
            { id: 1, skill: 1 },
            { id: 2, skill: 2 },
            { id: 3, skill: 3 },
            { id: 4, skill: 4 },
            { id: 5, skill: 1 },
            { id: 6, skill: 2 },
            { id: 7, skill: 3 },
            { id: 8, skill: 4 },
            { id: 9, skill: 1 },
            { id: 10, skill: 2 },
            { id: 11, skill: 3 },
            { id: 12, skill: 4 },
            { id: 13, skill: 2 },
            { id: 14, skill: 3 },
            { id: 15, skill: 4 },
            { id: 16, skill: 2 },
            { id: 17, skill: 3 },
            { id: 18, skill: 4 },
            { id: 19, skill: 2 },
            { id: 20, skill: 3 },
        ];
        const numTeams = 2;
        const attributesToBalance = ['skill'];
        const teams = organizeTeams(members, numTeams, attributesToBalance);

        expect(teams.length).toBe(numTeams);
    });

    it('should create teams with same number of members', () => {
        const members = [
            { id: 1, skill: 1 },
            { id: 2, skill: 2 },
            { id: 3, skill: 3 },
            { id: 4, skill: 4 },
            { id: 5, skill: 1 },
            { id: 6, skill: 2 },
            { id: 7, skill: 3 },
            { id: 8, skill: 4 },
            { id: 9, skill: 1 },
            { id: 10, skill: 2 },
            { id: 11, skill: 3 },
            { id: 12, skill: 4 },
            { id: 13, skill: 2 },
            { id: 14, skill: 3 },
            { id: 15, skill: 4 },
            { id: 16, skill: 2 },
            { id: 17, skill: 3 },
            { id: 18, skill: 4 },
            { id: 19, skill: 2 },
            { id: 20, skill: 3 },
        ];
        const numTeams = 2;
        const attributesToBalance = ['skill'];
        const teams = organizeTeams(members, numTeams, attributesToBalance);

        expect(teams[0].length).toBe(10);
        expect(teams[1].length).toBe(10);
    });

    it('should create teams with equal skills level', () => {
        const members = [
            { id: 1, skill: 1 },
            { id: 2, skill: 2 },
            { id: 3, skill: 3 },
            { id: 4, skill: 4 },
            { id: 5, skill: 1 },
            { id: 6, skill: 2 },
            { id: 7, skill: 3 },
            { id: 8, skill: 4 },
            { id: 9, skill: 1 },
            { id: 10, skill: 2 },
            { id: 11, skill: 3 },
            { id: 12, skill: 4 },
            { id: 13, skill: 1 },
            { id: 14, skill: 2 },
            { id: 15, skill: 3 },
            { id: 16, skill: 4 },
            { id: 17, skill: 1 },
            { id: 18, skill: 2 },
            { id: 19, skill: 3 },
            { id: 20, skill: 4 },
        ];
        const numTeams = 2;
        const attributesToBalance = ['skill'];
        const teams = organizeTeams(members, numTeams, attributesToBalance);

        let avg = averageTeamAttribute(members, 'skill');
        let avg0 = averageTeamAttribute(teams[0], 'skill');
        let avg1 = averageTeamAttribute(teams[1], 'skill');
        expect(avg0).toBe(avg1);

    });

    it('should create teams with closed skills level', () => {
        const members = [
            { id: 1, skill: 1 },
            { id: 2, skill: 4 },
            { id: 3, skill: 3 },
            { id: 4, skill: 4 },
            { id: 5, skill: 1 },
            { id: 6, skill: 3 },
            { id: 7, skill: 3 },
            { id: 8, skill: 4 },
            { id: 9, skill: 1 },
            { id: 10, skill: 2 },
            { id: 11, skill: 1 },
            { id: 12, skill: 4 },
            { id: 13, skill: 1 },
            { id: 14, skill: 4 },
            { id: 15, skill: 3 },
            { id: 16, skill: 4 },
            { id: 17, skill: 1 },
            { id: 18, skill: 2 },
            { id: 19, skill: 1 },
            { id: 20, skill: 4 },
        ];
        const numTeams = 4;
        const attributesToBalance = ['skill'];
        const teams = organizeTeams(members, numTeams, attributesToBalance);

        let avg = averageTeamAttribute(members, 'skill');
        console.log("avg:", avg);
        let avg0 = averageTeamAttribute(teams[0], 'skill');
        console.log("avg0:", avg0);
        let avg1 = averageTeamAttribute(teams[1], 'skill');
        console.log("avg1:", avg1);
        let avg2 = averageTeamAttribute(teams[2], 'skill');
        console.log("avg2:", avg2);
        let avg3 = averageTeamAttribute(teams[3], 'skill');
        console.log("avg3:", avg3);
        expect(Math.abs(avg - avg0)).toBeCloseTo(Math.abs(avg - avg1), 3);

        let standardDerivative = 0;
        for (const team of teams) {
            standardDerivative += Math.abs(avg - averageTeamAttribute(team, 'skill'));
        }
        console.log("standardDerivative:" + standardDerivative / teams.length);
        expect(standardDerivative / teams.length).toBeLessThan(1);


    });

    // Add more test cases to cover different scenarios
});
