// src/Data/feedData.js
import sampleImg from "../../Assets/Banner/Banner.jpg";
import post1 from "../../Assets/Posts/post3.jpg";
import post2 from "../../Assets/Posts/post4.jpg";
import post3 from "../../Assets/Posts/vecteezy_islamic-cute-3d-mosque-for-ramadan-and-eid-greeting-background_26045410.jpg";
import avatarImg from "../../Assets/Banner/Banner.jpg";

const FeedData = [
  {
    id: 1,
    username: "samsungindia",
    location: "bhagalpur",
    avatar: avatarImg,
    images: [post1, post2, post3],
    likes: 810,
    description:
      "You don’t need to go around in circles when you’ve got innovation in the palm of your hand. Discover what’s next in smart tech with us. #Samsung #Innovation #SmartTech",
    time: "18 hours ago",
  },
  {
    id: 2,
    username: "foodie123",
    location: "bhagalpur",
    avatar: avatarImg,
    images: [post2],
    likes: 810,
    time: "18 hours ago",
    description: "Just made this delicious bowl! 🍜 #homemade #foodie",
  },
  {
    id: 3,
    username: "city_lights",
    location: "delhi",
    avatar: avatarImg,
    images: [post3],
    likes: 810,
    time: "18 hours ago",
    description: "Night vibes in the city. 🌃 #urbanlife",
  },
  {
    id: 4,
    username: "pet_paradise",
    location: "pune",
    avatar: avatarImg,
    images: [post1],
    likes: 810,
    time: "18 hours ago",
    description: "Meet my new buddy! 🐶 #dogsofinstagram",
  },
  {
    id: 5,
    username: "artsy_gal",
    location: "delhi",
    avatar: avatarImg,
    images: [post3, post1],
    likes: 810,
    time: "18 hours ago",
    description: "Finished this painting today 🎨 #artistsoninstagram",
  },
  {
    id: 6,
    username: "fitness_freak",
    location: "delhi",
    avatar: avatarImg,
    images: [post1, sampleImg],
    likes: 810,
    time: "18 hours ago",
    description: "Post-workout glow 💪 #fitlife",
  },
];

export default FeedData;
