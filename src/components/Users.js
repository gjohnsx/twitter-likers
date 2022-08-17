import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline";
import Header from "./Header";

const testUsers = {
    "data": [
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 128,
          "following_count": 828,
          "tweet_count": 35,
          "listed_count": 0
        },
        "username": "Enara70705270",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1509460086497886223/MO25o63Y_normal.jpg",
        "name": "Enara",
        "url": "",
        "id": "1509459305006829572"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 33,
          "following_count": 115,
          "tweet_count": 3,
          "listed_count": 0
        },
        "username": "tommyfm123",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1424859257946755072/0Olukzj3_normal.jpg",
        "name": "Tomás Fernandez Murga",
        "location": "Tucumán",
        "url": "",
        "id": "729330165298376705"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 78,
          "following_count": 569,
          "tweet_count": 18,
          "listed_count": 0
        },
        "username": "Haylee46353089",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1518844329384562688/kvAKTfUx_normal.jpg",
        "name": "Haylee",
        "url": "",
        "id": "1518843622589829121"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 51,
          "following_count": 239,
          "tweet_count": 238,
          "listed_count": 0
        },
        "username": "omageprosper",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1331528145560801280/YamZlpLD_normal.jpg",
        "name": "Omage Prosper",
        "location": "Lagos, Nigeria",
        "url": "",
        "id": "706474948861284354"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 125,
          "following_count": 754,
          "tweet_count": 4701,
          "listed_count": 2
        },
        "username": "anupdujari",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1524471288479182854/aShIG8nY_normal.jpg",
        "name": "Anup Dujari",
        "location": "Ranchi",
        "url": "",
        "id": "83433055"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 17,
          "following_count": 726,
          "tweet_count": 35,
          "listed_count": 0
        },
        "username": "2002apsingh",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1545778071109660672/D7dZ2d5__normal.jpg",
        "name": "ADARSH PRATAP SINGH",
        "url": "",
        "id": "1494274758812536832"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 99,
          "following_count": 881,
          "tweet_count": 1889,
          "listed_count": 4
        },
        "username": "mhdsalamcodes",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1530085640016117760/YjDpduKA_normal.jpg",
        "name": "tech sage🚀",
        "url": "",
        "id": "1171916010808586241"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 1701,
          "following_count": 714,
          "tweet_count": 42664,
          "listed_count": 10
        },
        "username": "thelastceleb",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1550805223828066305/6IuUhG-n_normal.jpg",
        "name": "Baroness of the Queens Reg⚔",
        "location": "Osapa, London",
        "url": "https://t.co/ozXROPpmDJ",
        "id": "1715194136"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 242,
          "following_count": 954,
          "tweet_count": 2918,
          "listed_count": 2
        },
        "username": "sbaek91",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1528642898249428992/WRZDqqB3_normal.jpg",
        "name": "B",
        "location": "United States",
        "url": "",
        "id": "1246543581315100673"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 300,
          "following_count": 180,
          "tweet_count": 1700,
          "listed_count": 0
        },
        "username": "ShittuFareedah",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1550068474113826820/dQKspIYK_normal.jpg",
        "name": "Unique_reedah",
        "location": "Abuja, Nigeria",
        "url": "",
        "id": "1251799349459386374"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 1996,
          "following_count": 939,
          "tweet_count": 1353,
          "listed_count": 12
        },
        "username": "afkMAXXX",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1526173372916195330/F1XgJheR_normal.jpg",
        "name": "MAXXX",
        "location": "The Middle Place",
        "url": "https://t.co/sjCJz8wzOH",
        "id": "717000919"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 0,
          "following_count": 31,
          "tweet_count": 0,
          "listed_count": 0
        },
        "username": "liliannyoms",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1505293694244642826/ZSbUSDFN_normal.jpg",
        "name": "lilian nyangwara",
        "url": "",
        "id": "1505293253393924106"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 1898,
          "following_count": 385,
          "tweet_count": 252216,
          "listed_count": 21
        },
        "username": "glitchbotio",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1456016155135578120/W2tjCz2a_normal.jpg",
        "name": "XO53",
        "url": "",
        "id": "1243665419501744133"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 14,
          "following_count": 72,
          "tweet_count": 1226,
          "listed_count": 0
        },
        "username": "PlushReynaa",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1479247286081306629/5PBDnJHn_normal.jpg",
        "name": "Reyna 👸",
        "url": "",
        "id": "1443339602249621510"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 1715,
          "following_count": 1744,
          "tweet_count": 1531,
          "listed_count": 0
        },
        "username": "Iykes_yeah",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1320127755497996288/oFJVl10U_normal.jpg",
        "name": "IBMK",
        "location": "Lagos",
        "url": "",
        "id": "902106137541181440"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 8,
          "following_count": 54,
          "tweet_count": 307,
          "listed_count": 0
        },
        "username": "mnihatnalcakan",
        "protected": false,
        "profile_image_url": "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png",
        "name": "Nihat Nalçakan",
        "url": "",
        "id": "1398919334303604740"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 13,
          "following_count": 195,
          "tweet_count": 60,
          "listed_count": 0
        },
        "username": "BilalMo58700357",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1502258238678568960/y-EKM7E5_normal.jpg",
        "name": "Marwan-jita",
        "url": "",
        "id": "1485619082435125255"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 10,
          "following_count": 22,
          "tweet_count": 139,
          "listed_count": 0
        },
        "username": "eman_u_wil",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1531279201487265793/A1DqTzxX_normal.jpg",
        "name": "Michael Simon",
        "location": "Zion",
        "url": "",
        "id": "1486394993724039175"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 20,
          "following_count": 108,
          "tweet_count": 56,
          "listed_count": 0
        },
        "username": "_Hardik_143_",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1496403747320496133/mk6eEFHz_normal.jpg",
        "name": "Hardik143__",
        "url": "",
        "id": "1262242507414548482"
      },
      {
        "verified": false,
        "public_metrics": {
          "followers_count": 11,
          "following_count": 196,
          "tweet_count": 2,
          "listed_count": 1
        },
        "username": "Meta_2814",
        "protected": false,
        "profile_image_url": "https://pbs.twimg.com/profile_images/1513715203531231234/jdXLvqj__normal.jpg",
        "name": "Max",
        "url": "",
        "id": "1501415024144748545"
      }
    ],
    "meta": {
      "result_count": 20,
      "next_token": "7140dibdnow9c7btw481cyr1m5rfe3kh883lbgfvyl3cm"
    }
};

export default function Users({ users, setUsers }) {
  console.log('inside Users component...', users);

  const exportUsers = () => {
      console.log('Preparing to export users...')
  };

  return (
    <>
        <Header heading='Users' />

        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                    A list of all the users who interacted with the Tweet.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        onClick={exportUsers}
                    >
                        Export users
                    </button>
                    <button 
                        className='py-2 px-4 border rounded bg-red-100 text-red-500 border-transparent shadow-sm hover:bg-red-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto ml-1'
                        onClick={() => setUsers([])}
                    >
                        Reset users
                    </button>
                </div>
              </div>
              <div className="mt-8 flex flex-col">

                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        Name
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Location
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Verified
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <div className="inline-flex items-center gap-1">
                                            <p>Followers</p>
                                            <ArrowDownIcon className="h-4 w-4 text-indigo-600" />
                                        </div>
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <div className="inline-flex items-center gap-1">
                                            <p>Following</p>
                                            {/* <ArrowUpIcon className="h-4 w-4" /> */}
                                        </div>
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        <div className="inline-flex items-center gap-1">
                                            <p>Tweet Count</p>
                                            {/* <ArrowUpIcon className="h-4 w-4" /> */}
                                        </div>
                                    </th>

                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Link
                                    </th>
                                    
                                </tr>
                            </thead>
                            
                            <tbody className="divide-y divide-gray-200 bg-white">
                              {users && (
                                <>
                                {users.data.map((user) => (
                                  <tr key={user.username}>
                                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                          <div className="flex items-center">
                                              <div className="h-10 w-10 flex-shrink-0">
                                                  <img className="h-10 w-10 rounded-full" src={user.profile_image_url} alt="" />
                                              </div>
                                              <div className="ml-4">
                                                  <div className="font-medium text-gray-900">{user.name}</div>
                                                  <div className="text-gray-500">@{user.username}</div>
                                              </div>
                                          </div>
                                      </td>

                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                          <div className="text-gray-500">{user.location}</div>
                                      </td>

                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">

                                          <span className={`inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 ${user.verified ? 'text-blue-800' : 'bg-gray-200'}`}>
                                              {user.verified ? 'Verified' : 'Not verified'}
                                          </span>
                                      </td>

                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{user.public_metrics.followers_count}</td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{user.public_metrics.following_count}</td>
                                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{user.public_metrics.tweet_count}</td>
                                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                                          <a 
                                              href={`https://twitter.com/${user.username}`} className="underline text-indigo-600 hover:text-indigo-900"
                                              target='_blank'
                                              rel='noreferrer'
                                          >
                                              @{user.username}
                                          </a>
                                      </td>
                                  </tr>
                                ))}
                                </>
                              )}
                            </tbody>
                        </table>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    </>
  );
};