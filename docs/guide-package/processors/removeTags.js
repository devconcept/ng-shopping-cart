module.exports = exports = function removeTags() {
  return {
    name: 'removeTags',
    $runAfter: ['tags-extracted'],
    $runBefore: ['processing-docs'],
    $process: function (docs) {
      docs.forEach(function (doc) {
        if (doc.docType === 'markdown') {
          let stopParsing = false;
          let current = 0;
          const END_OF_LINE = /\r?\n/;
          const lines = doc.content.split(END_OF_LINE);
          const tagMatch = /^\s*@/;
          while (current < lines.length && !stopParsing) {
            const currentLine = lines[current];
            if (!tagMatch.exec(currentLine) && currentLine !== '') {
              stopParsing = true;
            } else {
              current++;
            }
          }
          doc.content = lines.slice(current).join('\r\n');
        }
      });
    }
  };
};
