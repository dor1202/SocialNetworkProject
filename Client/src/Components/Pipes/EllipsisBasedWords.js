const EllipsisBasedWords = (content, numberOfWords) => {
    if (content.split(' ').length <= numberOfWords) return content;
    else return content.split(/\s+/).slice(0, numberOfWords).join(' ') + '...';
}

export default EllipsisBasedWords;