// This file contains functions for searching in the discord guild

// Import external modules for pattern scanning
const regex = require('xregexp');

/*
    Returns a member in the guild, searching through their id,
    or their name however it's provided in the distinction variable.
    If ambiguous, 0 is returned. If not found, -1 is returned.

*/
function findMember(memberMap, distinction)
{
    // If a user tag is given, pluck out the id using xregexp
    const re = regex('(?<=<@!?)\\d+(?=>)');
    const id = regex.match(distinction, re);

    let match;

    if (id) {
        // Filter through member id
        match = memberMap.filter(member => member.id === id);
    } else {
        // Filter through member username
        match = memberMap.filter(member => member.displayName.startsWith(distinction));
    }

    if (match.size == 0) { // No match
        return -1;
    } else if (match.size > 1) { // Multiple matches
        return 0;
    } else {
        // Return the first instance in the map
        return match.values().next().value;
    }
}

module.exports = {
    findMember
};