const userDb = require('@services/DbService');

async function getFeed(req, res) {
  const { center, userId } = req.body;

  // get data from max 0.5 distance difference
  // prisma doesn't support order by relation aggregate, like group by. we must separate the queries.
  const p = userDb.GetPrismaClient();
  // receive all data in the radius.
  const feed = await p.$queryRaw`
  select Post.*, count(Likes.id) 'Likes'
  from Post
  left Join Likes on Post.Id = Likes.PostId
  where (LocationLat > ${center[0] - 1} AND LocationLat < ${center[0] + 1}) AND (LocationLan > ${center[1] - 1} AND LocationLan < ${center[1] + 1})
  group by Post.id, Likes.PostId`;

  const unBlockedFriends = await p.friend.findMany({ where: { IsBlocked: false, UserId: userId } });

  // filter data
  const existGroupsUser = await userDb.FindAll("groupToUser", "UserId", userId);
  const filteredFeed = await feed.filter(async (x) => {
    for (let a = 0; a < unBlockedFriends.length; a++) {
      const friendId = unBlockedFriends[a].FriendId;
      if (x.UserId == friendId) return true;
      const existGroupsFriend = await userDb.FindAll("groupToUser", "UserId", friendId);
      // find the groups without the user
      const groupsWithoutTheUser = existGroupsFriend.filter(o1 => !existGroupsUser.some(o2 => o1.GroupId === o2.GroupId));
      for (let b = 0; b < groupsWithoutTheUser.length; b++) {
        // find friend of friend
        const groupId = groupsWithoutTheUser[b].GroupId;
        const friendOfTheFriend = await p.groupToUser.findMany({ where: { GroupId: groupId, NOT: { UserId: friendId } }, });
        for (let c = 0; c < friendOfTheFriend.length; c++) {
          // save friend post and friend of friend post
          const userId = friendOfTheFriend[c].UserId;
          if (x.UserId == userId) return true;
        }
      }
    }
    return false;
  });
  if (filteredFeed.length >= 100) {
    // sort the first 100 top likes.
    filteredFeed.sort(function (a, b) { return (b.Likes > a.Likes) ? 1 : ((b.Likes < a.Likes) ? -1 : 0); });
    const result = filteredFeed.slice(0, 100);
    res.send(result);
  }
  else {
    res.send(filteredFeed);
  }
}

module.exports = getFeed;