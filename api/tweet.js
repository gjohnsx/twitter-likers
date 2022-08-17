import { Client } from "twitter-api-sdk";

export default async function handler(request, response) {
  const client = new Client(process.env.BEARER_TOKEN);
  // console.log(request)
  console.log('\n\n\n', request.params, '\n\n\n')

  // const user = await client.users.findUsersById({
  //   "ids": [
  //       "1359869635668115467"
  //   ],
  //   "user.fields": [
  //       "name",
  //       "public_metrics"
  //   ]
  // });
    
  // return response.status(200).json({
  //   user
  // })

  const tweetData = await client.tweets.findTweetById("1525536445628563458", {
    "tweet.fields": [
        "created_at",
        "public_metrics",
        "text"
    ],
    "expansions": [
        "author_id"
    ],
    "media.fields": [
        "url"
    ]
  });


  return response.status(200).json({
    tweetData
  })

}
