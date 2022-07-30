import {
  HeartIcon,
  SwitchHorizontalIcon,
  ReplyIcon
} from "@heroicons/react/outline";

export default function TweetStats(props) {

    const stats = [
        {
          id: 1,
          name: "Likers",
          stat: props.likers,
          icon: HeartIcon,
        },
        {
          id: 2,
          name: "Retweeters",
          stat: props.retweeters,
          icon: SwitchHorizontalIcon,
        },
        {
          id: 3,
          name: "Replies",
          stat: props.replies,
          icon: ReplyIcon,
        },
    ];

    return (
        <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
                Last 30 days
            </h3>

            <dl className="mt-5 grid gap-5 grid-cols-3">
                {stats.map((item) => (
                <div
                    key={item.id}
                    className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                    <dt>
                    <div className="absolute hidden sm:block bg-indigo-500 rounded-md p-3">
                        <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    <p className="sm:ml-16 text-sm font-medium text-gray-500 truncate">
                        {item.name}
                    </p>
                    </dt>
                    <dd className="sm:ml-16 pb-6 flex items-baseline sm:pb-7">
                        <p className="text-2xl font-semibold text-gray-900">
                            {item.stat}
                        </p>
                    </dd>
                </div>
                ))}
            </dl>
        </div>
    );
}
