/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import HubClient from "@amgsus/hub-client";

export function createPreconfiguredClient(clientOpts, args) {
    let client = new HubClient(clientOpts);

    process.on("SIGINT", async () => {
        if (args.verbose) {
            console.log("Caught SIGINT (or Ctrl+C)");
        }
        if (client.isConnected()) {
            if (args.verbose) {
                console.log("Disconnecting...");
            }
            await client.disconnect();
        }
        process.exit(0);
    });

    if (args.verbose) {
        client.on("connect", () => {
            console.log("Connected!");
        });
        client.on("disconnect", () => {
            console.log("Disconnected.");
        });
    }

    return client;
}
