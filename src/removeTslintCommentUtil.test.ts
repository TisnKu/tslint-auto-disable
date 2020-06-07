import { Replacement } from "tslint";
import { getTslintLineReplacement } from "./removeTslintCommentUtil";

describe("Remove tslint disable line comments", () => {
    it("should return empty replacement when line content does not contain tslint comment", () => {
        expect(
            getTslintLineReplacement("\tsome normal code", 0, false)
        ).toBeNull();
    });
    it("should return whole line replacement when line content only contains comment", () => {
        const lineContent = "    // tslint:disable-line";
        expect(getTslintLineReplacement(lineContent, 0, false)).toEqual(
            Replacement.deleteText(0, lineContent.length + 1) // + 1 to remove line ending
        );
    });
    it("should return latter part replacement when comment is at the end of line", () => {
        const lineContent = "    const a = 100; // tslint:disable-line";
        expect(getTslintLineReplacement(lineContent, 0, false)).toEqual(
            Replacement.deleteText(18, 23)
        );
    });
    it("should remove 2 character ending if isCRLF ending and the entire line is comment", () => {
        const lineContent = "    // tslint:disable-next-line";
        expect(getTslintLineReplacement(lineContent, 0, true)).toEqual(
            Replacement.deleteText(0, 33)
        );
    });
    it("should return whole line replacement when line content is like /* tslint:disable */", () => {
        const lineContent = "    /* tslint:disable-next-line */";
        expect(getTslintLineReplacement(lineContent, 100, false)).toEqual(
            Replacement.deleteText(100, lineContent.length + 1)
        );
    });
    it("should return mid partial replacement when /* tslint:disable */ is in the middle of a line", () => {
        const lineContent =
            "    const a = 100; /* tslint:disable-next-line */  const b = 200;";
        expect(getTslintLineReplacement(lineContent, 100, false)).toEqual(
            Replacement.deleteText(118, 31)
        );
    });
    it("should remove entire line comment like /* tslint:disable-line no-any */", () => {
        const lineContent = "    /* tslint:disable-next-line */  ";
        expect(getTslintLineReplacement(lineContent, 100, false)).toEqual(
            Replacement.deleteText(100, lineContent.length + 1)
        );
    });
});
