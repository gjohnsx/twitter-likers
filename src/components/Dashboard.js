import Header from "./Header";
import FormSection from "./FormSection";

export default function Dashboard({ tweetJson, setTweetJson, users, setUsers, preview, setPreview }) {
    return (
        <>
            <Header heading='Dashboard' />
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-4 sm:px-0">
                    <FormSection tweetJson={tweetJson} setTweetJson={setTweetJson} users={users} setUsers={setUsers} preview={preview} setPreview={setPreview}  />
                </div>
            </div>
        </>
    );
};