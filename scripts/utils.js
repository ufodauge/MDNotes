// https://qiita.com/sienori/items/b1f759561905e7f9ea80
export const ReplaceFolderName = str => {
    const specialChars = /\:|\?|\.|"|<|>|\|/g;   // 使用できない特殊文字
    const slash = /\//g;                         // 単一のスラッシュ
    const spaces = /\s\s+/g;                     // 連続したスペース
    const backSlashs = /\\\\+/g;                 // 連続したバックスラッシュ
    const sandwich = /(\s\\|\\\s)+(\s|\\)?/g;    // バックスラッシュとスペースが交互に出てくるパターン
    const beginningEnd = /^(\s|\\)+|(\s|\\)+$/g; // 先頭と末尾のスペース,バックスラッシュ

    const replacedStr = str
        .replace(specialChars, ``)                // 特殊文字を削除
        .replace(slash, `\\`)                     // スラッシュをバックスラッシュに置き換え
        .replace(spaces, ` `)                     // 連続するスペースを一つに置き換え
        .replace(backSlashs, `\\`)                // 連続するバックスラッシュを一つに置き換え
        .replace(sandwich, `\\`)                  // " \ \"のような"サンドイッチ"をバックスラッシュ一つに置き換え
        // フォルダ名の先頭と末尾のスペースを削除，スペースのみのフォルダを削除
        .replace(beginningEnd, ``);               // 先頭と末尾のスペース，バックスラッシュを削除

    return replacedStr;
};
