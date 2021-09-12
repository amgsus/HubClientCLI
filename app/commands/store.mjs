/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import Commander                     from "commander";
import { createPreconfiguredClient } from "./../client.mjs";

// ----------------------------------------------------- Command Description ---

const STORE_COMMAND = ((() => {
    return Commander.createCommand("store")
        .description("Store value(s) on Hub server\r\n\r\nExpected arguments: <key1> <value1> [<key2> <value2> [...]]")
        .arguments("<args...>")
        .option("--ts [timestamp]",
            "set timestamp (or omit value to set current time)")
        .option("--ts-mode <mode>",
            "choose timestamp mode", "none")
        .option("--file <file>",
            "replace value with contents from file (use %FILE% as value)")
        .action(main);
})());

export default STORE_COMMAND;

// ---------------------------------------------------------- Implementation ---

function main(values, opts) {

    let args = Commander.opts();

    process.on("uncaughtException", (error) => {
        console.error(`[ERROR] ${error.message}`);
    });

    if (values.length % 2 !== 0) {
        throw new Error("Expected format: <key1> <value1> [<key2> <value2> [...]]");
    }

    values = values.reduce((accum, value, index) => { // Convert to array of object.
        if (index % 2 === 0) {
            accum.push({
                id: value,
                value: null
            });
        } else {
            accum[index >> 1].value = value;
        }
        return accum;
    }, []);

    console.log(values);

    let tsObject = { ts: undefined };

    if (opts.ts === true) {
        tsObject.ts = Date.now();
    } else if (opts.ts !== undefined) {
        tsObject.ts = Number(opts.ts);
        if (isNaN(tsObject.ts)) {
            throw new Error(`Invalid timestamp: not a number: ${opts.ts}`);
        }
    }

    createPreconfiguredClient({
        maxConnectAttempts: args.keepAlive ? -1 : 1,
        connectNow: false,
        printMessages: false
    }, args).connectAsync(args.host, args.port).then((client) => {
        client.store(values, () => {
            setTimeout(() => client.disconnect(), 1000);
        });
    }).catch((e) => {
        console.error(e);
    });
}
