// @flow
const capitalize = string =>
    string.replace(/^([a-z])/, match => match.toUpperCase());

const wrap = messages => messages.join('\n     ');

const guuiLog = async (string, color = '\x1b[2m') => {
    console.log(
        `\x1b[37m%s\x1b[0m${color}%s\x1b[0m`,
        '𝐆𝐔𝐔𝐈 ',
        capitalize(string),
    );
};

module.exports = {
    log: (...messages) => guuiLog(wrap(messages)),
    warn: async (...messages) => {
        guuiLog(wrap(messages), '\x1b[31m');
    },
};
