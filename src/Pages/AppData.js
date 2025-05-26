// src/Data/feedData.js
import sampleImg from "../Assets/Banner/Banner.jpg";
import post1 from "../Assets/Posts/post3.jpg";
import post2 from "../Assets/Posts/post4.jpg";
import post3 from "../Assets/Posts/vecteezy_islamic-cute-3d-mosque-for-ramadan-and-eid-greeting-background_26045410.jpg";
import avatarImg from "../Assets/Banner/Banner.jpg";

const CombinedFeedData = [
  {
    id: 1,
    username: "shabbeer",
    avatar: post1,
    followers: 200,
    posts: [
      {
        id: 1,
        location: "bhagalpur",
        image: [post1, sampleImg, post3],
        likes: 810,
        time: "2025-04-29",
        description:
          "You don’t need to go around in circles when you’ve got innovation in the palm of your hand. Discover what’s next in smart tech with us. #Samsung #Innovation #SmartTech",
      },
      {
        id: 2,
        location: "delhi",
        image: [post2],
        likes: 50,
        time: "2025-04-27",
        description: "Just made this delicious bowl! 🍜 #homemade #foodie",
      },
      {
        id: 3,
        location: "kolkata",
        image: [post3],
        likes: 50,
        time: "2025-05-14",
        description:
          "Spice up your feed! 🌶️ Made some biryani today. #foodlove",
      },
    ],
  },
  {
    id: 2,
    username: "samsungindia",
    avatar: post2,
    followers: 1200,
    posts: [
      {
        id: 1,
        location: "bhagalpur",
        image: [post1],
        likes: 810,
        time: "2025-05-14",
        description:
          "Innovation is in our DNA. Explore the latest in tech with us. #Samsung",
      },
      {
        id: 2,
        location: "bangalore",
        image: [post2],
        likes: 600,
        time: "2025-05-11",
        description:
          "Future-ready devices for smart homes. #TechLife #SamsungSmartThings",
      },
    ],
  },
  {
    id: 3,
    username: "foodie123",
    avatar: avatarImg,
    followers: 340,
    posts: [
      {
        id: 1,
        location: "bhagalpur",
        image: [post2],
        likes: 510,
        time: "2025-05-25",
        description: "Just made this delicious bowl! 🍜 #homemade #foodie",
      },
      {
        id: 2,
        location: "patna",
        image: [post3],
        likes: 312,
        time: "2025-05-20",
        description: "Sweet cravings satisfied 🍰 #dessert #homemade",
      },
    ],
  },
  {
    id: 4,
    username: "city_lights",
    avatar: post3,
    followers: 580,
    posts: [
      {
        id: 1,
        location: "delhi",
        image: [post3],
        likes: 800,
        time: "2025-05-13",
        description: "Night vibes in the city. 🌃 #urbanlife",
      },
    ],
  },
  {
    id: 5,
    username: "pet_paradise",
    avatar: avatarImg,
    followers: 720,
    posts: [
      {
        id: 1,
        location: "pune",
        image: [post1],
        likes: 930,
        time: "2025-05-17",
        description: "Meet my new buddy! 🐶 #dogsofinstagram",
      },
    ],
  },
  {
    id: 6,
    username: "artsy_gal",
    avatar: avatarImg,
    followers: 410,
    posts: [
      {
        id: 1,
        location: "delhi",
        image: [post3],
        likes: 670,
        time: "2025-05-15",
        description: "Finished this painting today 🎨 #artistsoninstagram",
      },
      {
        id: 2,
        location: "delhi",
        image: [post1],
        likes: 412,
        time: "2025-05-12",
        description: "Color and expression. Art is therapy. 💫",
      },
    ],
  },
  {
    id: 7,
    username: "fitness_freak",
    avatar: avatarImg,
    followers: 1050,
    posts: [
      {
        id: 1,
        location: "delhi",
        image: [post1],
        likes: 720,
        time: "2025-05-11",
        description: "Post-workout glow 💪 #fitlife",
      },
      {
        id: 2,
        location: "gurgaon",
        image: [sampleImg],
        likes: 520,
        time: "2025-05-10",
        description: "Fuel your body, fuel your mind. #healthylifestyle",
      },
    ],
  },
];

export default CombinedFeedData;
