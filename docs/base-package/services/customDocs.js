module.exports = exports = function customDocs() {
  let docs = [];
  return {
    addDoc: function (doc) {
      docs.push({
        name: doc.name,
        doc
      })
    },
    addDocs: function (newDocs) {
      docs = docs.concat(newDocs);
    },
    getDoc: function (name) {
      const doc = docs.find(d => d.name === name);
      if (!doc) {
        throw new Error(`The document '${name}' could not be found`);
      }
      return doc;
    },
    getDocs: function (names) {
      let found = 0;
      const toReturn = names.length;
      const res = docs.reduce((curr, doc) => {
        const idx = names.indexOf(doc.name);
        if (idx !== -1) {
          curr[idx] = doc;
          found++;
        }
        return curr;
      }, new Array(toReturn));
      if (found < toReturn) {
        const missing = names.reduce((curr, n, idx) => {
          if (!res[idx]) {
            curr.push(`'${n}'`);
          }
          return curr;
        }, []);
        throw new Error(`The documents [${missing.join(',')}] could not be found`)
      }
      return res;
    }
  };
};
