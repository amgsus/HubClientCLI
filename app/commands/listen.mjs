/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import Commander        from "commander";
import { createPreconfiguredClient } from "../client.mjs";

// ----------------------------------------------------- Command Description ---

const LISTEN_COMMAND = ((() => {
    return Commander.createCommand("listen")
        .description("Prints value(s) on update until SIGINT signal (or Ctrl+C) is received")
        .arguments("<valueName...>")
        .option("--limit <count>",
            "retrieve specified number of updates (in total), then exit") // TODO: Not implemented.
        .option("--no-names",
            "print value without its name")
        .action(listenCommandEP);
})());

export default LISTEN_COMMAND;

// ---------------------------------------------------------- Implementation ---

function listenCommandEP(topics, opts) {
    let args = Commander.opts();

    let clientOpts = {
        maxConnectAttempts: args.keepAlive ? -1 : 1,
        connectNow: false,
        printMessages: false
    };

    let client = createPreconfiguredClient(clientOpts, args);

    client.on("update", (notification) => {
        if (opts.names) {
            console.log(`${notification.id}=${notification.value}`);
        } else {
            console.log(`${notification.value}`);
        }
    });

    client.connectAsync(args.host, args.port).then((client) => {
        topics.forEach((s) => {
            if (args.verbose) {
                console.log(`Subscribing to ${s}...`);
            }
            client.subscribe(s);
        });
    }).catch((e) => {
        console.error(e);
    });
}
