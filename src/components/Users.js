import { useEffect, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline";
import Header from "./Header";

const PAGINATION_LENGTH = 5;

export default function Users({ users, setUsers }) {
  console.log('inside Users component...', users);
  const [startingUserIndex, setStartingUserIndex] = useState(0);
  const [endingUserIndex, setEndingUserIndex] = useState(5);

  const totalUsers = users === null
    ? 0
    : users.data.length

  const exportUsers = () => {
    console.log('Preparing to export users...')
    console.log(users.data, typeof users.data);
    return users.data.map(row =>
      row
      .map(String)  // convert every value to String
      .map(v => v.replaceAll('"', '""'))  // escape double colons
      .map(v => `"${v}"`)  // quote it
      .join(',')  // comma-separated
    ).join('\r\n');  // rows starting on new lines
      
  };

  const ShowingResultsRender = ({ totalUsers }) => {
    console.log('inside component... totalUsers =', totalUsers);

    if (totalUsers === 0) {
      return (
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">0</span> results
        </p>
      )
    } else if (totalUsers < PAGINATION_LENGTH) {
      return (
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{totalUsers}</span> results
        </p>
      )
    } else {
      return (
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{startingUserIndex + 1}</span> to <span className="font-medium">{endingUserIndex}</span> of{' '}
          <span className="font-medium">{totalUsers}</span> results
        </p>
      )
    }
  }

  const getNextPagination = () => {
    if (startingUserIndex + PAGINATION_LENGTH <= totalUsers) {
      setStartingUserIndex(prevStartingUserIndex => prevStartingUserIndex + PAGINATION_LENGTH)
      setEndingUserIndex(prevEndingUserIndex => prevEndingUserIndex + PAGINATION_LENGTH)
      // setEndingUserIndex(prevEndingUserIndex => Math.min(prevEndingUserIndex + PAGINATION_LENGTH, totalUsers))
    }
  }
  
  const getPreviousPagination = () => {
    if (startingUserIndex - PAGINATION_LENGTH >= 0) {
      setStartingUserIndex(prevStartingUserIndex => prevStartingUserIndex - PAGINATION_LENGTH)
      setEndingUserIndex(prevEndingUserIndex => prevEndingUserIndex - PAGINATION_LENGTH)
    }
  }

  console.log('total users =', totalUsers);

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
                                {users.data
                                  .sort((a, b) => b.public_metrics.followers_count - a.public_metrics.followers_count)
                                  .slice(startingUserIndex, endingUserIndex)
                                  .map((user) => (
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

                        <nav
                          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                          aria-label="Pagination"
                        >
                          <div className="hidden sm:block">

                            {/* {users === null && (
                              <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">0</span> results
                              </p>
                            )}

                            {users && (
                              <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startingUserIndex + 1}</span> to <span className="font-medium">{endingUserIndex}</span> of{' '}
                                <span className="font-medium">{totalUsers}</span> results
                              </p>
                            )} */}
                            {<ShowingResultsRender totalUsers={totalUsers} />}

                          </div>
                          <div className="flex-1 flex justify-between sm:justify-end">
                            <button
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              onClick={getPreviousPagination}
                            >
                              Previous
                            </button>
                            <button
                              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                              onClick={getNextPagination}
                            >
                              Next
                            </button>
                          </div>
                        </nav>

                    </div>
                  </div>
              </div>
            </div>
        </div>
    </>
  );
};