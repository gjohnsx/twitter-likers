import { Client } from "twitter-api-sdk";

export default async function handler(request, response) {
  const client = new Client(process.env.BEARER_TOKEN);
  console.log('\n\n\n', request.query, '\n\n\n');
  console.log('inside api...', request.params);
  console.log(request.query.id);

  const likers = [];

  try {
    async function getLikers(paginationToken = null) {
      const likingUsers = await client.users.tweetsIdLikingUsers(request.query.id, {
        "user.fields": [
          "id",
          "name",
            "profile_image_url",
            "protected",
            "public_metrics",
            "username",
            "verified"
          ],
        "pagination_token": paginationToken,
      });

      if (likingUsers.data) {
        // fill the list of users with the users
        // TODO - Remove testing limit
        // if (likers.length > 10) {
        //   console.log('Reached my testing limit of >10 users in API call!\n');
        //   return likingUsers;
        // }

        likingUsers.data.forEach(user => likers.push(user));
        console.log('added', likingUsers.data.length, 'to likers array\nlikers = ', likers);

        // get the next token 
        console.log('need to get the nextToken...', likingUsers.meta);
        let nextToken = likingUsers.meta.next_token;
        console.log('nextToken is now =', nextToken);

        // call the function again with the next token
        await getLikers(paginationToken = nextToken);

      } else {
        // no more data in the get_liking_users call
        console.log('This is the last call...')
        console.log(likingUsers, likingUsers.length)
      }
    };
    
    // const likingUsers = await client.users.tweetsIdLikingUsers(request.query.id, {
    //   "max_results": 5,
    //   "user.fields": [
    //     "id",
    //     "name",
    //       "profile_image_url",
    //       "protected",
    //       "public_metrics",
    //       "username",
    //       "verified"
    //     ],
    //   "pagination_token": null
    //   });

    const likingUsers = await getLikers();

    // console.log(response.likingUsers);
    console.dir(likingUsers, {
      depth: null,
    });


    // return response.status(200).json({
    //   likingUsers
    // });
    return response.status(200).json({
      likers
    });

  } catch (error) {
    console.log(error);
  };
};
