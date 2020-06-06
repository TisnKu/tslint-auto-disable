import { getInputOptions } from "./command";
import { run } from "./addTslintCommentUtil";

run(getInputOptions())
    .then(rc => {
        process.exitCode = rc;
    })
    .catch(e => {
        console.error(e);
        process.exitCode = 1;
    });
