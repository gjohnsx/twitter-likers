import { HeartIcon, SwitchHorizontalIcon, ChatIcon } from "@heroicons/react/outline";


export default function TweetPreview({ tweet }) {
    const preview = {
        text: tweet.data.text,
        user: {
        name: tweet.includes.users[0].name,
        username: tweet.includes.users[0].username,
        profileImageUrl: tweet.includes.users[0].profile_image_url
        },
        metrics: {
        retweetCount: tweet.data.public_metrics.retweet_count,
        quoteCount: tweet.data.public_metrics.quote_count,
        replyCount: tweet.data.public_metrics.reply_count,
        likeCount: tweet.data.public_metrics.like_count,
        },
    };

    return (
        <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
            <div className="px-4 py-5 sm:px-6 flex gap-2">
                <img
                className="inline-block h-14 w-14 rounded-full"
                src={preview.user.profileImageUrl}
                alt={`Twitter profile pic for user ${preview.user.username}.`}
                />
                <div>
                    <h3 className="font-bold text-lg">{preview.user.name}</h3>
                    <p className="text-gray-500">@{preview.user.username}</p>
                </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
                <p className="text-lg leading-relaxed prose text-left">
                    {preview.text}
                </p>
            </div>
        
            <div className="px-4 py-4 sm:px-6 flex gap-10">
                <div className="flex gap-1 text-gray-500">
                    <HeartIcon className="h-6 w-6" />
                    <span className="sr-only">Like count</span>
                    <span className="text-indigo-600 font-semibold">{preview.metrics.likeCount}</span>
                </div>
                <div className="flex gap-1 text-gray-500">
                    <SwitchHorizontalIcon className="h-6 w-6 "/>
                    <span className="sr-only">Retweet count</span>
                    <span className="text-indigo-600 font-semibold">{preview.metrics.retweetCount}</span>
                </div>
                <div className="flex gap-1 text-gray-500">
                    <ChatIcon className="h-6 w-6 "/>
                    <span className="sr-only">Reply count</span>
                    <span className="text-indigo-600 font-semibold">{preview.metrics.replyCount}</span>
                </div>
                <div className="flex ml-auto gap-1 text-gray-500">
                    <a
                    href={`https://twitter.com/${tweet.includes.users[0].username}/status/${tweet.data.id}`}
                    target="_blank"
                    rel="noreferrer"
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-indigo-600 shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                    Open on Twitter
                    </a>
                </div>
            </div>
        </div>
    )
};