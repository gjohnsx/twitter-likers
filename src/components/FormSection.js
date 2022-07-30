import { useState } from "react";
import axios from "axios";
import { PhotographIcon } from "@heroicons/react/outline";
import Divider from "./Divider";
import TweetStats from "./TweetStats";

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

export default function FormSection() {
    const [tweet, setTweet] = useState({});
    const [tweetUrl, setTweetUrl] = useState('');
    const [dataType, setDataType] = useState('Likers');
    const [preview, setPreview] = useState(<PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />);
    const [errors, setErrors] = useState({});
    const [tweetId, setTweetId] = useState(null);
    const likers = useField('number');
    const retweeters = useField('number');
    const replies = useField('number');
    
    const handleChange = (e) => {
        setTweetUrl(prevTweet => e.target.value);
    };

    const handleDataTypeChange = (e) => {
        setDataType(prevDataType => e.target.value);
    };

    const getTweetData = async (event) => {
        event.preventDefault();
        console.log('Getting tweet preview!');
        
        let isValidForm = handleValidation();

        if (isValidForm) {
            console.log('form is valid!!! making API call now...');
            const url = `https://api.twitter.com/2/tweets/${tweetId}`
            console.log('url =', url);
            const token = process.env.BEARER_TOKEN
            const requestData = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            
            const tweet = await axios
                .get(url, requestData)
                .then(response => {
                    setTweet(response.data);
                });

        } else {
            console.log('form is NOT VALID!!! ');
        }
    };

    const isValidTweet = (tweetUrl) => {
        console.log('inside isValidTweet function:', tweetUrl, typeof tweetUrl);
        const regex = /\/[\d]{19}$/;
        const matches = tweetUrl.match(regex);
        if (matches) {
            const id = matches[0].slice(1, matches[0].length);
            setTweetId(id);
            return true;
        }
        return false;
    };

    const handleValidation = () => {
        let tempErrors = {};
        let isValid = true;
    
        if (!isValidTweet(tweetUrl)) {
            tempErrors["tweet"] = true;
            isValid = false;
        }
    
        setErrors({ ...tempErrors });
        console.log("Errors:", errors);
        return isValid;
    };

    console.log('tweet =', tweet);

    return (
      <> 
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Tweet information</h3>
                <p className="mt-1 text-sm text-gray-600">Enter the tweet from which you'd like to request like or retweet data.</p>
              </div>
            </div>
            
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={getTweetData}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                         <div className="col-span-6 sm:col-span-8">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                Tweet
                            </label>
                            <input
                                type="url"
                                name="tweet"
                                id="tweet"
                                placeholder="https://twitter.com/"
                                value={tweetUrl}
                                onChange={handleChange}
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                         </div>
  
                        <div className="col-span-6 sm:col-span-8">
                            <label className="block text-sm font-medium text-gray-700">Tweet preview</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">

                                    {preview}

                                </div>
                            </div>
                        </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Get Tweet preview
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  
        <Divider />
  
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Request data</h3>
                <p className="mt-1 text-sm text-gray-600">Decide which type of data you'd like to request.</p>
              </div>
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2">

              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">

                    <fieldset>
                        <legend className="sr-only">Select data type</legend>
                        <div className="mt-4 space-y-4">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="likesOrRetweets" className="block text-sm font-medium text-gray-700">
                                    Data type
                                </label>
                                <select
                                    id="likesOrRetweets"
                                    name="likesOrRetweets"
                                    onChange={handleDataTypeChange}
                                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value='Likers'>Likers</option>
                                    <option value='Retweeters'>Retweeters</option>
                                </select>
                            </div>
                        </div>
                    </fieldset>

                    {/* <TweetStats likers={likers.value} retweeters={retweeters.value} replies={replies.value} /> */}
                    <TweetStats likers={3431} retweeters={255} replies={36} />

                  </div>

                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Get {dataType}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
};  