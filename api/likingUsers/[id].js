import { Client } from "twitter-api-sdk";

export default async function handler(request, response) {
  const client = new Client(process.env.BEARER_TOKEN);
  console.log('\n\n\n', request.query, '\n\n\n')
  console.log(request.query.id)

  const likingUsers = await client.users.tweetsIdLikingUsers(request.query.id, {
    "max_results": 11,
    "user.fields": [
        "id",
        "name",
        "profile_image_url",
        "protected",
        "public_metrics",
        "username",
        "verified"
    ]
  });

  console.log(response.likingUsers);

  return response.status(200).json({
    likingUsers
  });
};
