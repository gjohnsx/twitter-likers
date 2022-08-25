import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import { PhotographIcon } from "@heroicons/react/outline";

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

export default function App() {
  const [users, setUsers] = useState(null);
  const [tweetJson, setTweetJson] = useState(null);
  const [preview, setPreview] = useState(<PhotographIcon className="mx-auto h-12 w-12 text-gray-400" />);
  const [open, setOpen] = useState(true);
  const [modalContent, setModalContent] = useState({});

  const exportUsers = () => {
      console.log('Preparing to export users...')
  };

  return (
    <Router>

      <div className="min-h-full">
        <Navbar />
             
        <main>
          <Routes>
            <Route path="/" element={
              <Dashboard 
                tweetJson={tweetJson}
                setTweetJson={setTweetJson}
                users={users}
                setUsers={setUsers}
                preview={preview}
                setPreview={setPreview}
                open={open}
                setOpen={setOpen}
                modalContent={modalContent}
                setModalContent={setModalContent}
              />}
            />
            <Route path="/users" element={
              <Users 
                users={users} 
                setUsers={setUsers} 
                tweetJson={tweetJson} 
                open={open}
                setOpen={setOpen}
                modalContent={modalContent}
                setModalContent={setModalContent}
              />} 
            />
          </Routes>
        </main>

      </div>

    </Router>
  );
};