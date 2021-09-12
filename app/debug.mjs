/*
 * Author: A.G.
 *   Date: 2021/09/06
 */

//import args from "./args.mjs";

const DEBUG_ENABLED = true;

export function vi(...s) {
    if (DEBUG_ENABLED) {
        console.log(...s);
    }
}

export function ve(...s) {
    if (DEBUG_ENABLED) {
        console.error(...s);
    }
}
