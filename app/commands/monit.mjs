/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import Commander from "commander";

// ----------------------------------------------------- Command Description ---

const MONIT_COMMAND = ((() => {
    return Commander.createCommand("monit")
        .description("Real-time monitor")
        .arguments("<valueName...>")
        .option("--limit <count>",
            "retrieve specified number of updates (in total), then exit")
        .option("--no-names",
            "print value without its name")
        .action(monitCommandEP);
})());

export default MONIT_COMMAND;

// ---------------------------------------------------------- Implementation ---

function monitCommandEP(x, opts) {

}
