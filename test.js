const ref = require("./index");
const ffi = require('ffi');

const WinVersionStruct = ref.struct({
    major: ref.types.byte,
    minor: ref.types.byte,
    build: ref.types.short
});

const win = ffi.Library('kernel32.dll', {
    "GetTickCount": [ref.types.int, []],
    "GetProductInfo": [ref.types.bool, [ref.types.ulong, ref.types.ulong, ref.types.ulong, ref.types.ulong, ref.ptr(ref.types.void)]],
    "GetVersion": [WinVersionStruct, []]
});

let tickcount = win.GetTickCount();
console.log("Tick Count:" + tickcount);

let version = win.GetVersion();
console.log("Running Windows Version: " + version.major + "." + version.minor + " build: " + version.build);


let dwOSMajorVersion = 6;
let dwOSMinorVersion = 1;
let dwSpMajorVersion = 0;
let dwSpMinorVersion = 0;

let pdwReturnedProductType = ref.alloc(ref.types.ulong, 0);
let product = win.GetProductInfo(dwOSMajorVersion, dwOSMinorVersion, dwSpMajorVersion, dwSpMinorVersion, pdwReturnedProductType);
if (!product) {
    console.log("Product Info: Call failed.");
} else {
    console.log("Product Info: " + ref.deref(pdwReturnedProductType));
}

/**
 * Test a bad ref type as a object, undefined
 */
try {
    const BadStruct = ref.struct({
        example: ref.types.BadType
    });
} catch (err) {
    console.log("Caught an error " + err.message);
}

/**
 * Test a bad ref type as a string
 */
try {
    const BadStruct = ref.struct({
        example: "BadType"
    });
} catch (err) {
    console.log("Caught an error " + err.message);
}