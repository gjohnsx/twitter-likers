import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/outline";
import TweetPreview from "./TweetPreview";
import { PhotographIcon } from "@heroicons/react/outline";

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

export default function FormSection({ tweetJson, setTweetJson, users, setUsers, preview, setPreview }) {
    // const [dataType, setDataType] = useState('Likers');
    // const [errors, setErrors] = useState({});
    const [tweetValid, setTweetValid] = useState('');
    const tweetUrl = useField('text');

    let navigate = useNavigate();

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
          setPreview(
          <div className="my-4 shadow-lg max-w-3xl mx-auto">
            <TweetPreview tweet={res.data.tweetData} />
          </div>
          );
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
      
      navigate('/users');
    };

    return (
      <> 
        <form>
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

                <div className="col-span-6 sm:col-span-8">
                  <label className="block text-sm font-medium text-gray-700">Tweet preview</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 rounded-md">
                      <div className="space-y-1 text-center">
                        {preview}
                      </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              {!tweetJson && (
                <button
                  onClick={getTweetData}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Get Tweet Preview
                </button>
              )}

              {tweetJson && (
                <button
                  className='py-2 px-4 border rounded bg-red-100 text-red-500 border-transparent shadow-sm hover:bg-red-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:w-auto ml-1'
                  onClick={() => setPreview(<PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />)}
                  >
                  Clear Tweet Preview
                </button>
              )}
            </div>
          </div>
        </form>
        
        {tweetJson && !users && (
          <form onSubmit={getLikingUsers}>
            <div className="shadow overflow-hidden sm:rounded-md">
              
              <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
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