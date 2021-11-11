const Post = (UserId = 0, Title = '', Image = '', Description = '', LocationLat = 0, LocationLan = 0, TimeStamp = '', IsPublic = false) => {
    const element = { UserId, Title, Image, Description, LocationLat, LocationLan, TimeStamp, IsPublic };
    return element;
};

module.exports = Post;