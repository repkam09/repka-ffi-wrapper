const ref = require("ref");
const StructType = require("ref-struct");

/**
 * Slightly more friendly way of creating a pointer type
 * @param {*} type 
 * @param {*} value 
 */
function ptr(type, value = 0) {
    return ref.refType(type, value);
}

/**
 * Create a struct object
 * @param {*} options 
 */
function struct(options) {
    let keys = Object.keys(options);
    keys.forEach((key) => {
        let type = options[key];
        if (typeof type === "string") {
            if (!ref.types[type]) {
                throw new Error("Unknown ref type string " + type);
            }
        }
    });
    return StructType(options)
}

/**
 * Create a new custom type
 * @param {*} name 
 * @param {*} typedata 
 */
function reg(name, typedata) {
    ref.types[name] = typedata;
}

/**
 * Create an alias for another type
 * @param {*} name 
 * @param {*} alias 
 */
function alias(name, alias) {
    ref.types[alias] = ref.types[name];
    ref.types[alias].name = alias;
    ref.types[alias].alias = true;
}


// Hook up these new properties
ref.ptr = ptr;
ref.struct = struct;
ref.reg = reg;
ref.alias = alias;

// Create a number of aliases for Windows.h types
alias("uint", "dword");
alias("ushort", "word");

module.exports = ref;