import { Fragment, useEffect, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon, CheckIcon, ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { Dialog, Transition } from '@headlessui/react'
import Header from "./Header";

const PAGINATION_LENGTH = 50;

export default function Users({ users, setUsers, tweetJson, open, setOpen, modalContent, setModalContent }) {
  const [startingUserIndex, setStartingUserIndex] = useState(0);
  const [endingUserIndex, setEndingUserIndex] = useState(PAGINATION_LENGTH);

  const totalUsers = users === null
    ? 0
    : users.length

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
  };

  const getNextPagination = () => {
    if (startingUserIndex + PAGINATION_LENGTH <= totalUsers) {
      setStartingUserIndex(prevStartingUserIndex => prevStartingUserIndex + PAGINATION_LENGTH)
      setEndingUserIndex(prevEndingUserIndex => prevEndingUserIndex + PAGINATION_LENGTH)
    }
  };
  
  const getPreviousPagination = () => {
    if (startingUserIndex - PAGINATION_LENGTH >= 0) {
      setStartingUserIndex(prevStartingUserIndex => prevStartingUserIndex - PAGINATION_LENGTH)
      setEndingUserIndex(prevEndingUserIndex => prevEndingUserIndex - PAGINATION_LENGTH)
    }
  };

  const exportUsers = () => {
    createUsersCsv();
  };

  const createUsersCsv = () => {
    const headers = ['username', 'name', 'link', 'followers', 'following', 'tweet_count', 'verified', 'protected', 'profile_img_url'];
    const data = [
      headers,
    ];
    users.forEach(user => {
      data.push([
        user.username,
        user.name,
        `https://twitter.com/${user.username}`,
        user.public_metrics.followers_count,
        user.public_metrics.following_count,
        user.public_metrics.tweet_count,
        user.verified,
        user.protected, 
        user.profile_image_url
      ])
    });

    const csv = data.map(row =>
      row
        .map(String)  // convert every value to String
        .map(v => v.replaceAll('"', '""'))  // escape double colons
        .map(v => `"${v}"`)  // quote it
        .join(',')  // comma-separated
      )
      .join('\r\n');  // rows starting on new lines

    downloadBlob(csv, 'export.csv', 'text/csv;charset=utf-8;')
  };

  const downloadBlob = (content, filename, contentType) => {
    // Create a blob
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement('a');
    pom.href = url;
    pom.setAttribute('download', filename);
    pom.click();
  };

  useEffect(() => {
    if (tweetJson === null) {
      setModalContent({
        icon: <ExclamationCircleIcon className='h-6 w-6 text-red-400' />,
        text: `No users found...`,
        description: 'How did you even get this to open?',
      })
    } else if (users) {
      setModalContent({
        icon: <CheckCircleIcon className='h-6 w-6 text-green-500' />,
        text: `Complete!`,
        description: 'You may now export your users as a CSV.',
      })
    }
  }, [users]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center">
                    {modalContent.icon}
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      {modalContent.text}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {modalContent.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Go back to dashboard
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

        <Header heading='Users' />

        <button 
          className="border rounded-md bg-orange-500 text-white px-4 py-2 my-2 hover:bg-orange-600"
          onClick={() => {
            setOpen(true);
          }}
        >
          Toggle Modal
        </button>

        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                    A list of all the users who interacted with the Tweet.
                    </p>
                </div>
                {users !== null && (
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
                          onClick={() => setUsers(null)}
                      >
                          Reset users
                      </button>
                  </div>
                )}

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
                                {users
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

            {/* Debug section */}
            {/* <div className="my-4">
              <pre>
                {users !== null && JSON.stringify(users, null, 4)}
              </pre>
            </div> */}

        </div>
    </>
  );
};