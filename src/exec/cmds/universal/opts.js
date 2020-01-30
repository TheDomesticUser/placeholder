/*
    Every command will contain these options. They usually redirect stdout
    and stderr. Please keep in mind that in consequence, the universal option 
    keywords are reserved, and having the same option name for one separate
    command will cause ambiguity
*/

// Universal option names
const stdoutDmOptName = 'stdout-dm';
const stderrDmOptName = 'stderr-dm';

module.exports = {
    stdoutDmOptName,
    stderrDmOptName
};