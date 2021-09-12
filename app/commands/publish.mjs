/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import Commander from "commander";

// ----------------------------------------------------- Command Description ---

const STORE_COMMAND = ((() => {
    return Commander.createCommand("publish")
        .description("Publishes uncached value on Hub Server")
        .arguments("<valueName...>")
        .option("--limit <count>",
            "retrieve specified number of updates (in total), then exit")
        .option("--no-names",
            "print value without its name")
        .action(publishCommandEP);
})());

export default STORE_COMMAND;

// ---------------------------------------------------------- Implementation ---

function publishCommandEP() {

}
