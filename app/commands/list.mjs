/*
 * Author: A.G.
 *   Date: 2021/09/12
 */

import Commander                from "commander";

// ----------------------------------------------------- Command Description ---

const LIST_COMMAND = ((() => {
    return Commander.createCommand("list")
        .description("Retrieves all values matching pattern, or all if mask is not specified.")
        .arguments("[mask]")
        .option("-r, --regex",
            "treat specified mask as regular expression (otherwise, as wildcard)")
        .option("--fetch",
            "do not retrieve values, only keys")
        .action(listCommandEP);
})());

export default LIST_COMMAND;

// ---------------------------------------------------------- Implementation ---

function listCommandEP(mask, opts) {
    const args = Commander.opts();

    // ...
}
