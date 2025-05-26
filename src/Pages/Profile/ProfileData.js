// src/Data/feedData.js
import sampleImg from "../../Assets/Banner/Banner.jpg";
import avatarImg from "../../Assets/Banner/Banner.jpg";

const ProfileData = [
  {
    id: 1,
    username: "shabbeer",
    profile: sampleImg,
    post: [
      {
        id: 1,
        location: "bhagalpur",
        image: sampleImg,
        likes: 810,
        description:
          "You don’t need to go around in circles when you’ve got innovation in the palm of your hand. Discover what’s next in smart tech with us. #Samsung #Innovation #SmartTech",
        time: "18 hours ago",
      },
      {
        id: 2,
        location: "delhi",
        image: sampleImg,
        likes: 50,
        time: "18 hours ago",
        description: "Just made this delicious bowl! 🍜 #homemade #foodie",
      },
      {
        id: 3,
        location: "kolkata",
        image: sampleImg,
        likes: 50,
        time: "18 hours ago",
        description: "Just made this delicious bowl! 🍜 #homemade #foodie",
      },
    ],
    followers: 200,
  },
];

export default ProfileData;
