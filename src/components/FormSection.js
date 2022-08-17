import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PhotographIcon, ExclamationCircleIcon, CheckCircleIcon, HeartIcon, SwitchHorizontalIcon, ChatIcon } from "@heroicons/react/outline";

const useField = (type) => {
    const [value, setValue] = useState('');
  
    const onChange = (event) => {
        setValue(event.target.value)
        console.log(event.target.value);   
    }
  
    return {
      type,
      value,
      onChange
    };
};

const Success = () => {
  return (
    <div className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center pointer-events-none">
      <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
    </div>
  );
};

const Failed = () => {
  return (
    <div className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center pointer-events-none">
      <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
    </div>
  );
};

export default function FormSection({ tweetJson, setTweetJson, users, setUsers }) {
    // const [dataType, setDataType] = useState('Likers');
    // const [preview, setPreview] = useState(<PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />);
    // const [errors, setErrors] = useState({});
    const [tweetValid, setTweetValid] = useState('');
    const tweetUrl = useField('text');

    let navigate = useNavigate();

    const CreateTweetPreview = ({ tweet }) => {
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
      }
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
            <p className="text-xl leading-relaxed">
              {preview.text}
            </p>
          </div>
          
          <div className="px-4 py-4 sm:px-6 flex gap-10">
            <div className="flex gap-1 text-gray-500">
              <HeartIcon className="h-6 w-6 "/>
              <span className="sr-only">Like count</span>
              <span>{preview.metrics.likeCount}</span>
            </div>
            <div className="flex gap-1 text-gray-500">
              <SwitchHorizontalIcon className="h-6 w-6 "/>
              <span className="sr-only">Retweet count</span>
              <span>{preview.metrics.retweetCount}</span>
            </div>
            <div className="flex gap-1 text-gray-500">
              <ChatIcon className="h-6 w-6 "/>
              <span className="sr-only">Reply count</span>
              <span>{preview.metrics.replyCount}</span>
            </div>
            <div className="flex ml-auto gap-1 text-gray-500">
              <a
                href={`https://twitter.com/${tweetJson.includes.users[0].username}/status/${tweetJson.data.id}`}
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

    const isValidTweetId = value => {
      console.log('inside isValidTweetId', value);

      const regex = /(\/[\d]{19})|(^\d{19}$)/;
      const matches = value.match(regex);

      if (matches) {
        const id = matches[0].slice(1, matches[0].length);

        console.log('tweet was valid, setting tweetId to', id)
        
        setTweetValid(<Success />);
        return id;
      }

      setTweetValid(<Failed />);
      return false;
    };

    const getTweetData = async (event) => {
      console.log('inside getTweetData,', tweetUrl);
      event.preventDefault();
      const tweetIdFromRegex = isValidTweetId(tweetUrl.value);

      if (!tweetIdFromRegex) {
        console.log("Not calling API, Not a valid ID");
        return false;
      };
      console.log('\nCalling twitter api...\n');

      const url = `/api/tweet/${tweetIdFromRegex}`

      axios.get(url)
        .then(res => {
          setTweetJson(res.data.tweetData);
        })
        .catch(e => console.log(e));
    };
    
    const getLikingUsers = async (event) => {
      console.log('inside getLikingUsers...');
      event.preventDefault();

      const tweetId = tweetJson.data.id;

      console.log('\nCalling twitter api...\n');

      const url = `/api/likingUsers/${tweetId}`

      axios.get(url)
        .then(res => {
          setUsers(res.data.likingUsers);
        })
        .catch(e => console.log(e));
      
      // navigate('/users');
    };

    return (
      <> 
        <form onSubmit={getTweetData}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">

              <div className="grid grid-cols-6 gap-6">
                <div className="relative col-span-6 sm:col-span-8">
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                      Tweet
                  </label>
                  <input
                      {...tweetUrl}
                      name="tweetUrl"
                      id="tweetUrl"
                      placeholder="https://twitter.com/"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />

                  {tweetValid}

                </div>
              </div>

            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Get Tweet Preview
              </button>
            </div>
          </div>
        </form>
        
        {tweetJson && (
          <div className="my-4 shadow-lg max-w-3xl mx-auto">
            <CreateTweetPreview tweet={tweetJson} />
          </div>
        )}


        {tweetJson && (
          <form onSubmit={getLikingUsers}>
            <div className="shadow overflow-hidden sm:rounded-md">
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                  Get {tweetJson.data.public_metrics.like_count} Liking Users
                </button>
              </div>
            </div>
          </form>
        )}


        {/* Debug Area */}
        {/* <div>
          <pre>
            {JSON.stringify(tweetJson, null, 4)}
          </pre>
        </div> */}

      </>
    );
};  









// import { useState, useEffect } from "react";
// import axios from 'axios';
// import { PhotographIcon, ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/outline";
// import Divider from "./Divider";

// const useField = (type) => {
//     const [value, setValue] = useState('');
  
//     const onChange = (event) => {
//         setValue(event.target.value)
//         console.log(event.target.value);   
//     }
  
//     return {
//       type,
//       value,
//       onChange
//     };
// };

// const Success = () => {
//   return (
//     <div className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center pointer-events-none">
//       <CheckCircleIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
//     </div>
//   );
// };

// const Failed = () => {
//   return (
//     <div className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center pointer-events-none">
//     <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
//     </div>
//   );
// };

// export default function FormSection() {
//     // const likers = useField('number');
//     // const retweeters = useField('number');
//     // const replies = useField('number');
//     // const [tweet, setTweet] = useState({});
//     const [tweetValid, setTweetValid] = useState('');

//     const [dataType, setDataType] = useState('Likers');
//     const [preview, setPreview] = useState(<PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />);
//     const [errors, setErrors] = useState({});
//     const [tweetId, setTweetId] = useState(null);
//     const tweetUrl = useField('text');
    
//     const handleDataTypeChange = (e) => {
//         setDataType(prevDataType => e.target.value);
//     };

//     const callTwitterApi = () => {
//       console.log('\nCalling twitter api...\n');

//       const id = '1525536445628563458'
//       // const id = tweetId // TODO fix tweet ID update in time
      
//       const url = `/api/tweet/${id}`

//       axios.get(url, {
//         params: {
//           // id: id
//         }
//         })
//         .then(res => console.log(res))
//         .catch(e => console.log(e));
//     };

//     const getTweetData = async (event) => {
//         event.preventDefault();
//         console.log('Getting tweet preview!');
        
//         let isValidForm = handleValidation();

//         if (isValidForm) {
//             console.log('form is valid!!! making API call now...');
//             // const endpointURL = `https://api.twitter.com/2/tweets/${tweetId}/liking_users`;
//             callTwitterApi();
//         } else {
//             console.log('form is NOT VALID!!! ');
//         }
//     };
    
//     const handleValidation = () => {
//         let tempErrors = {};
//         let isValid = true;

//         console.log('inside handleVlidation. tweetUrl =', tweetUrl);
    
//         if (!isValidTweet(tweetUrl.value)) {
//             console.log('tweet was not valid');
//             tempErrors["tweet"] = true;
//             isValid = false;
//         }
    
//         setErrors({ ...tempErrors });
//         console.log("Errors:", errors);
//         return isValid;
//     };

//     const isValidTweet = (id) => {
//         console.log('inside isValidTweet... id =', id);

//         const regex = /(\/[\d]{19})|(^\d{19}$)/;
//         const matches = id.match(regex);
//         if (matches) {
//             const id = matches[0].slice(1, matches[0].length);
//             console.log('tweet was valid, setting tweetId to', tweetId)
//             setTweetValid(<Success />);
//             setTweetId(id);
//             return true;
//         }
//         setTweetValid(<Failed />);
//         return false;
//     };

//     useEffect(() => {
//       console.log('tweet url changed.')
//     }, [tweetUrl]);

//     console.log('\ntweet ID', tweetId, '\n');

//     return (
//       <> 
//         <form onSubmit={getTweetData}>
//           <div className="shadow overflow-hidden sm:rounded-md">
//             <div className="px-4 py-5 bg-white sm:p-6">

//               <div className="grid grid-cols-6 gap-6">
//                 <div className="relative col-span-6 sm:col-span-8">
//                   <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
//                       Tweet
//                   </label>
//                   <input
//                       {...tweetUrl}
//                       name="tweetUrl"
//                       id="tweetUrl"
//                       placeholder="https://twitter.com/"
//                       className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                   />
                  
//                   { tweetValid }

//                 </div>

//                 <div className="col-span-6 sm:col-span-8">
//                     <label className="block text-sm font-medium text-gray-700">Tweet preview</label>
//                     <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                         <div className="space-y-1 text-center">

//                             {preview}

//                         </div>
//                     </div>
//                 </div>

//                 {/* <fieldset>
//                   <legend className="sr-only">Select data type</legend>
//                   <div className="mt-4 space-y-4">
//                     <div className="col-span-6 sm:col-span-3">
//                       <label htmlFor="likesOrRetweets" className="block text-sm font-medium text-gray-700">
//                           Data type
//                       </label>
//                       <select
//                           id="likesOrRetweets"
//                           name="likesOrRetweets"
//                           onChange={handleDataTypeChange}
//                           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       >
//                           <option value='Likers'>Likers</option>
//                           <option value='Retweeters'>Retweeters</option>
//                       </select>
//                     </div>
//                   </div>
//                 </fieldset> */}
//               </div>
//             </div>

//             <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//               <button
//                 type="submit"
//                 className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 Get Tweet preview
//               </button>
//             </div>
//           </div>
//         </form>
        


//       </>
//     );
// };  