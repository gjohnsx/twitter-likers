import { Client } from "twitter-api-sdk";

export default async function handler(request, response) {
  const client = new Client(process.env.BEARER_TOKEN);
  console.log('\n\n\n', request.query, '\n\n\n')
  console.log(request.query.id)

const tweetData = await client.tweets.findTweetById(request.query.id, {
    "tweet.fields": [
      "attachments",
      "author_id",
      "conversation_id",
      "created_at",
      "geo",
      "id",
      "in_reply_to_user_id",
      "lang",
      "possibly_sensitive",
      "public_metrics",
      "referenced_tweets",
      "reply_settings",
      "source",
      "text",
      "withheld"
    ],
    "expansions": [
        "author_id"
    ],
    "user.fields": [
      "created_at",
      "description",
      "entities",
      "id",
      "location",
      "name",
      "pinned_tweet_id",
      "profile_image_url",
      "protected",
      "public_metrics",
      "url",
      "username",
      "verified",
      "withheld"
    ]
  });

  console.log(response.tweetData);

  return response.status(200).json({
    tweetData
  });
};
