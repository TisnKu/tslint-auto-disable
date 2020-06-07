import { buildTslintComment } from "./addTslintCommentUtil";
import { RuleFailure } from "tslint";

describe("Add Tslint Comment Util", () => {
    it("should build tslint comment with non duplicate rules", () => {
        const failures: RuleFailure[] = [
            {
                getRuleName(): string {
                    return "no-any";
                },
            } as RuleFailure,
            {
                getRuleName(): string {
                    return "no-any";
                },
            } as RuleFailure,
        ];
        expect(buildTslintComment("  ", failures, "\n")).toEqual(
            "  // tslint:disable-next-line no-any\n"
        );
    });
});
