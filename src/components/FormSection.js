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

export default function FormSection({ tweetJson, setTweetJson, users, setUsers, preview, setPreview, modalContent, setModalContent, open, setOpen }) {
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
      event.preventDefault();

      const tweetId = tweetJson.data.id;

      console.log('\nCalling twitter api...\n');

      const url = `/api/likingUsers/${tweetId}`
      
      axios.get(url)
        .then(res => {
          setUsers(res.data.likers);
        })
        .catch(e => console.log(e));

      // control the modal content before navigating to /users
      setModalContent({
        icon: <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>,
        text: `Getting ${tweetJson.data.public_metrics.like_count} users...`,
      });
      setOpen(true);

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