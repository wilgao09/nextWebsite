const jsdom = require("jsdom");
const fs = require("fs");

/**
 * @typedef {Object} XDoc
 * @property {Array<XDocClass>} classes
 */

/**
 * @typedef {Object} XDocClass
 * @property {string} name
 * @property {string} desc
 */
/**
 * @typedef {Object} XDocEnum
 * @property {string} name
 * @property {Array<Array<string>>} values
 */
/**
 * @typedef {Object} XDocField
 * @property {string} field
 * @property {string} type
 * @property {string} qualifier
 * @property {string} desc
 */
/**
 * @typedef {Object} XDocArg
 * @property {string} type
 * @property {string} name
 * @property {string} desc
 */

/**
 *
 * @returns {jsdom.JSDOM}
 */
function getHTMLDOM() {
    let buf = fs.readFileSync("./xen/xen.html");
    return new jsdom.JSDOM("<!DOCTYPE html>" + buf.toString());
}

/**
 *
 * @param {jsdom.JSDOM} dom
 * @return somejson
 */
function buildJSON(dom) {
    const doc =
        dom.window.document.getElementsByClassName("sub-content-main")[0];
    if (doc === undefined) {
        console.error("fuck i failed to find doc");
    }

    let children = doc.children;
    // first item is class table
    let classdir = jsonOfClassTable(children[0]);
    let enums = [];
    let parsingEnums = true;
    let classes = [];
    let obj = {
        name: "",
        state: "supported",
        desc: "",
        fields: [],
        rpcs: [],
    };
    for (let i = 1; i < children.length; i++) {
        let el = children[i];
        if (el.id === "class-auth") {
            parsingEnums = false;
        }
        if (parsingEnums) {
            enums.push(jsonOfEnum(el));
            continue;
        }
        // assume that we are now at a class header
        obj.name = children[i++].id.substring(6);
        // deprecated?

        if (
            children[i].innerHTML.includes(
                "<strong>This class is deprecated.</strong>"
            )
        ) {
            obj.supported = "deprecated";
            i++;
        } else if (
            children[i].innerHTML.includes(
                "<strong>This class is removed.</strong>"
            )
        ) {
            obj.supported = "removed";
            i++;
        }
        // class desc
        obj.desc = cleanInnerHTML(children[i++]);
        i++;
        // fields
        obj.fields = jsonOfFields(children[i++]);
        i++;
        // rpc loop
        if (
            children[i].innerHTML.includes(
                "has no additional RPCs associated with it."
            )
        ) {
            classes.push(obj);
            obj = {
                name: "",
                deprecated: false,
                desc: "",
                fields: [],
                rpcs: [],
            };
            continue;
        }
        while (children[i].id && children[i].id.substring(0, 6) !== "class-") {
            let rpc = {
                name: "",
                status: "supported",
                desc: "",
                args: [],
                return: {
                    type: "",
                    desc: "",
                    errs: [],
                },
                minrole: "",
            };
            // rpc name
            rpc.name = children[i++].id.substring(9).split("-")[0];

            // deprecated?
            if (
                children[i].innerHTML.includes(
                    "<strong>This message is deprecated.</strong>"
                )
            ) {
                rpc.status = "deprecated";
                i++;
            } else if (
                children[i].innerHTML.includes(
                    "<strong>This message is removed.</strong>"
                )
            ) {
                rpc.status = "removed";
                i++;
            }
            i++;
            // overview?
            if (
                children[i].tagName === "P" &&
                children[i].innerHTML !== "<em>Signature:</em>"
            ) {
                rpc.desc = cleanInnerHTML(children[i++]);
            }
            i += 2;
            // this is teh tab that should say pem arguments if there are arguments
            if (children[i].innerHTML === "<em>Arguments:</em>") {
                i++;
                rpc.args = jsonOfArgs(children[i++]);
            }

            // role
            //TODO: clean

            if (children[i].innerHTML.includes("<em>Minimum Role:")) {
                rpc.minrole = children[i++].innerHTML
                    .trim()
                    .substring(22)
                    .trim();
            }

            rpc.return.type = processReturnType(cleanInnerHTML(children[i++]));

            if (i === children.length) {
                i += 44;
                break;
            }

            //return type desc?
            if (
                children[i].tagName === "P" &&
                children[i].children.length === 0
            ) {
                rpc.return.desc = cleanInnerHTML(children[i++]);
            }
            //errs?
            if (
                children[i].tagName === "P" &&
                children[i].children.length !== 0
            ) {
                for (let k = 1; k < children[i].children.length; k++) {
                    rpc.return.errs.push(
                        cleanInnerHTML(children[i].children[k])
                    );
                }
                i++;
            }
            obj.rpcs.push(rpc);
        }
        i--;
        classes.push(obj);
        obj = {
            name: "",
            state: "supported",
            desc: "",
            fields: [],
            rpcs: [],
        };
    }
    return {
        classdir,
        enums,
        classes,
    };
}

/**
 *
 * @param {string} s
 * @returns {string}
 */
function processReturnType(s) {
    let wrappedType = s.trim().substring(21).trim();
    let l = wrappedType.indexOf(">");
    let r = wrappedType.lastIndexOf("<");
    if (l < r && l > 0 && r > 0) {
        return wrappedType.substring(l + 1, r);
    }
    return wrappedType;
}

/**
 *
 * @param {Element} e a table
 * @return {Array<XDocClass>}
 */
function jsonOfClassTable(e) {
    if (e.tagName !== "TABLE") {
        return [];
    }
    let ans = [];
    let bod = e.children[1];
    for (let tr of bod.children) {
        ans.push({
            name: cleanInnerHTML(tr.children[0].children[0]),
            desc: cleanInnerHTML(tr.children[1]),
        });
    }
    return ans;
}

/**
 *
 * @param {Element} e a table
 * @return {XDocEnum}
 */
function jsonOfEnum(e) {
    if (e.tagName !== "TABLE") {
        return {
            name: [],
            values: [],
        };
    }
    let enumName = e.children[0].children[0].children[0].children[0].innerHTML;
    let enumFields = [];
    for (let tr of e.children[1].children) {
        enumFields.push([
            cleanInnerHTML(tr.children[0].children[0]),
            cleanInnerHTML(tr.children[1]),
        ]);
    }
    return {
        name: enumName,
        values: enumFields,
    };
}

/**
 *
 * @param {Element} e a table
 * @return {Array<XDocField>}
 */
function jsonOfFields(e) {
    if (e.tagName !== "TABLE") {
        return [];
    }
    let bod = e.children[1];
    let ans = [];
    for (let tr of bod.children) {
        ans.push({
            field: cleanInnerHTML(tr.children[0]),
            type: cleanInnerHTML(tr.children[1].children[0]),
            qualifier: cleanInnerHTML(tr.children[2]),
            desc: cleanInnerHTML(tr.children[3]),
        });
    }
    return ans;
}

/**
 *
 * @param {Element} e a table
 * @return {Array<XDocArg>}
 */
function jsonOfArgs(e) {
    if (e.tagName !== "TABLE") {
        return [];
    }
    let bod = e.children[1];
    let ans = [];
    for (let tr of bod.children) {
        let t = tr.children[0];
        if (t.children.length > 0) {
            t = t.children[0];
        }
        ans.push({
            type: t.innerHTML,
            name: cleanInnerHTML(tr.children[1]),
            desc: cleanInnerHTML(tr.children[2]),
        });
    }
    return ans;
}

function cleanInnerHTML(el) {
    return el.innerHTML.trim().replace(/\s+/g, " ");
}

fs.writeFileSync(
    "./public/xdoc.json",
    JSON.stringify(buildJSON(getHTMLDOM()), null, 4)
);
