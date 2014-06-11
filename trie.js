Trie = function() {
    this.characters = {};
    this.isWord = false;
};

Trie.prototype.learn = function(word, index) {
    // This function should add the given word,
    // starting from the given index,
    // to this Trie.
    // For each letter in the word:
    // if the letter exists on the tree, go to the letter. If it does not exist, create it.
    // If there is another letter, return to the previous step. If not, add a word terminating marker.
    index = index || 0;
    var char = word[index];
    if (index == word.length) {
        this.isWord = true;
        return this;
    } else if (this.characters[char] === undefined) {
        this.characters[char] = new Trie();
        this.characters[char].learn(word, index + 1);
    } else {
        this.characters[char].learn(word, index + 1);
    }

};

Trie.prototype.getWords = function(words, currentWord) {
    // This function will return all the words which are
    // contained in this Trie.
    // it will use currentWord as a prefix,
    // since a Trie doesn't know about its parents.
    if (words === undefined) {
        var words = [];
    }
    if (currentWord === undefined) {
        var currentWord = "";
    }
    if (this.isWord === true) {
        words.push(currentWord);
    }
    for (var i in this.characters) {
        var newWord = currentWord + i;
        this.characters[i].getWords(words, newWord);
    }
    return words;
};

Trie.prototype.find = function(word, index) {
    // This function will return the node in the trie
    // which corresponds to the end of the passed in word.

    // Be sure to consider what happens if the word is not in this Trie.

    // if character is less than the word length, find the rest of the characters
    // if index = word.length, you've reached the end of the word
    // if word is not in this trie, return undefined
    index = index || 0;
    var char = word[index];
    if (this.characters[char]) {
        return this.characters[char].find(word, index + 1);
    } else if (index === word.length) {
        return this;
    } else {
        return false;
    }
};

Trie.prototype.autoComplete = function(prefix) {
    // This function will return all completions 
    // for a given prefix.
    // It should use find and getWords.

    //find the given prefix
    //return all words for that prefix
    prefix = prefix || "";

    var prefixNode = this.find(prefix);
    //if prefix is found, return all results of words for the given prefix
    //if it is not found, return sorry not found
    if (prefixNode !== false) {
        results = prefixNode.getWords()
        for (var i = 0; i < results.length; i++) {
            results[i] = prefix + results[i];
        }
        return results;
    } else {
        return [];
    }
};

try {
    module.exports = Trie
} catch (e) {

}