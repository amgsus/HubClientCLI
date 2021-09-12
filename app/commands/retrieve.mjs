/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import Commander                     from "commander";
import { createPreconfiguredClient } from "./../client.mjs";

// ----------------------------------------------------- Command Description ---

const RETRIEVE_COMMAND = ((() => {
    return Commander.createCommand("retrieve")
        .description("Retrieves value(s) from Hub Server")
        .arguments("<valueName...>")
        .option("--no-names",
            "print value without its name")
        .action(execute);
})());

export default RETRIEVE_COMMAND;

// ---------------------------------------------------------- Implementation ---

function execute(topicNames, opts) {
    let args = Commander.opts();

    let client = createPreconfiguredClient({
        maxConnectAttempts: args.keepAlive ? -1 : 1,
        printMessages: false,
        wildcard: ""
    }, args);

    client.connectAsync(args.host, args.port).then((client) => {

        if (args.verbose) {
            console.log(`Connected!`);
        }

        client.retrieve(channelName, null, ((error, value, notification) => {
            if (opts.names) {
                console.log(`${notification.id}=${notification.value}`);
            } else {
                console.log(`${notification.value}`);
            }
        }));

        console.log(`Now disconnecting...`);
        client.disconnect();

    }).catch((e) => {
        console.error(e);
    });
}
