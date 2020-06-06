import { Replacement } from "tslint";
import { SourceFile } from "typescript";

function isEntireLineComment(line: string) {
    return !!line.match(/^\s*\t*\/\/|^\s*\t*\/\*[^*]+\*\/\s*$/);
}

export function getTslintLineReplacement(
    line: string,
    lineStartPosition: number,
    isCRLFEnding: boolean
): Replacement | null {
    const tslintCommentMatchResult = line.match(
        /\s*\t*\/[*\/]\s*tslint:disable-(next-)?line[\w\s]*(\*\/)?\s*/
    );
    if (tslintCommentMatchResult !== null) {
        if (isEntireLineComment(line)) {
            return Replacement.deleteFromTo(
                lineStartPosition,
                line.length + lineStartPosition + (isCRLFEnding ? 2 : 1)
            );
        }
        const positionOfClosingComment = line.indexOf("*/");
        if (positionOfClosingComment !== -1) {
            return Replacement.deleteFromTo(
                (tslintCommentMatchResult.index as number) + lineStartPosition,
                lineStartPosition + positionOfClosingComment + 2
            );
        }
        return Replacement.deleteFromTo(
            (tslintCommentMatchResult.index as number) + lineStartPosition,
            line.length + lineStartPosition
        );
    }
    return null;
}

function getIsCRLFEnding(file: SourceFile, lineEndOfPosition: number) {
    return (
        file.text.charAt(lineEndOfPosition) === "\r" &&
        file.text.charAt(lineEndOfPosition + 1) === "\n"
    );
}

export function removeTslintComments(file: SourceFile) {
    const replacements: Replacement[] = file
        .getLineStarts()
        .map(lineStartPosition => {
            const lineEndOfPosition = file.getLineEndOfPosition(
                lineStartPosition
            );
            return getTslintLineReplacement(
                file.text.substring(lineStartPosition, lineEndOfPosition),
                lineStartPosition,
                getIsCRLFEnding(file, lineEndOfPosition)
            );
        })
        .filter(r => r !== null) as Replacement[];
    return Replacement.applyAll(file.text, replacements);
}
