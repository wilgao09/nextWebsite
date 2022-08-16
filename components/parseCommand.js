
const Command = {
    "LS" : 0,
    "CD" : 1,
    "true": 2,
    "CAT" : 3,
    "false" : 4,
    "unknown" : 5
}

const locationMap = {
    "HOME" : "/",
    "ABOUT" : "/about",
    "BLOG" : "/blog",
    "PROJECT" : "/projects"
}

const usage = {
    "LS" : "Usage: LS",
    "CD" : "Usage: CD &lt;directory-name&gt;",
    "CAT" : "Usage: CAT <file-name>"
}

function parseCommand(s) {
    s = s.replace(/\s\s+/g, ' ')
    s = s.trim()
    s = s.split(' ')
    if (s.length == 0 || s[0] == '') return [Command.true]
    let f = () => {
        let k = [Command.false]
        k.push(s)
        return k
    }

    if (Command[s[0]] == undefined) {
        return [Command.unknown, s[0]]
    }
    let c = Command[s[0]]
    s[0] = c
    //validate ls
    if (c == Command.LS) {
        if (s.length > 1) return f()
    }
    //validate cd
    if (c == Command.CD) {
        if (s.length > 2) return f()
        if (locationMap[s[1]] == undefined) return f()
        s[1] = locationMap[s[1]]
    }
    if ( c == Command.CAT) {
        if (s.length > 2) return f()
        if (s[1] != "CONTENT") return f()
    }
    //validate cat???
    return s
}

export default {
    Command, parseCommand, usage
}