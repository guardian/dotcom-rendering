// @flow

// BRANDED LOGGING

const capitalize = string =>
    string.replace(/^([a-z])/, match => match.toUpperCase());

const wrap = messages => messages.join('\n     ');

// we could use chalk, but this saves needing to pre-install it
// if this is a first run
const red = '\x1b[31m';
const white = '\x1b[37m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

const GUUILog = (messages = [], color = dim) => {
    console.log(
        `${white}%s${reset}${color}%s${reset}`,
        '𝐆𝐔𝐔𝐈 ',
        capitalize(wrap(messages)),
    );
};

const log = (...messages) => GUUILog(messages);
const warn = (...messages) => GUUILog(messages, red);

// can be used as a normal script too
const [, , messages] = process.argv;
if (messages) {
    log(messages);
}

// exports for modules to use
module.exports = {
    log,
    warn,
};
