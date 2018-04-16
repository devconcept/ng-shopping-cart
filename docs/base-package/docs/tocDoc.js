const {startCase, upperFirst} = require('lodash');

module.exports = exports = class TocDoc {
  constructor(contents) {
    this.name = 'TableOfContents';
    this.docType = 'toc';
    this.contents = contents.map(topic => {
      const {computedName, chapter, nochapter} = topic;
      return {
        title: startCase(computedName).replace(/\s/g, ''),
        path: computedName,
        chapter: nochapter ? '' : upperFirst(chapter),
        url: topic.location ? `/${chapter}/${topic.location}/${computedName}` : `/${chapter}/${computedName}`,
      };
    });
    this.template = 'toc-data.ts'
  }
};
