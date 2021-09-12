#!/usr/bin/env node

/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import { readFileSync } from "fs";

import Commander        from "commander";

import STORE_HANDLER    from "./app/commands/store.mjs";
import RETRIEVE_HANDLER from "./app/commands/retrieve.mjs";
import LIST_HANDLER     from "./app/commands/list.mjs";
import LISTEN_HANDLER   from "./app/commands/listen.mjs";
import MONIT_HANDLER    from "./app/commands/monit.mjs";
import PUBLISH_HANDLER  from "./app/commands/publish.mjs";

export const PACKAGE_VERSION = ((() => {
    let version = "n/a";
    try {
        let packageURL = new URL("./package.json", import.meta.url);
        let textFile = readFileSync(packageURL).toString("utf8");
        version = JSON.parse(textFile).version;
    } catch (e) {
        console.error(e);
    }
    return version;
})());

((() => {
    Commander.version(PACKAGE_VERSION);
    Commander
        .option("-p, --port <port>",
            "set remote port", 7778)
        .option("-h, --host <host>",
            "set name of remote host or IP-address", "127.0.0.1")
        .option("-t, --timeout <milliseconds>",
            "set timeout of connection establishment or specific operation")
        .option("--keep-alive",
            "keep re-establishing connection if it has been closed")
        .option("--debug",
            "enable debug output")
        .option("--verbose",
            "enable detailed output");
    Commander
        .addCommand(STORE_HANDLER)
        .addCommand(RETRIEVE_HANDLER)
        .addCommand(LIST_HANDLER)
        .addCommand(LISTEN_HANDLER)
        .addCommand(PUBLISH_HANDLER)
        .addCommand(MONIT_HANDLER);
    Commander.parse();
    return Commander.opts();
})());
