import sampleImg from "../Assets/Banner/Banner.jpg";
import post1 from "../Assets/Posts/post3.jpg";
import post2 from "../Assets/Posts/post4.jpg";
import post3 from "../Assets/Posts/vecteezy_islamic-cute-3d-mosque-for-ramadan-and-eid-greeting-background_26045410.jpg";
import avatarImg from "../Assets/Banner/Banner.jpg";

const NotificationData = [
  {
    id: 1,
    from: { type: "user", name: "shabbeer" },
    to: { type: "institute", name: "Mashjid-e-hind" },
    avatar: post1,
    notification: "shabbeer has requested to join your institute.",
    reason: "request",
  },
  {
    id: 2,
    from: { type: "user", name: "foodie123" },
    to: { type: "institute", name: "Al-Noor Madrasa" },
    avatar: avatarImg,
    notification: "foodie123 has submitted a comment on your profile.",
    reason: "comment",
  },
  {
    id: 3,
    from: { type: "institute", name: "Mashjid-e-hind" },
    to: { type: "user", name: "all" },
    avatar: post1,
    notification: "Mashjid-e-hind has updated their prayer schedule.",
    reason: "update",
  },
  {
    id: 4,
    from: { type: "institute", name: "Al-Noor Madrasa" },
    to: { type: "user", name: "all" },
     avatar: post2,
    notification: "Admissions are now open for the new session.",
    reason: "announcement",
  },
  {
    id: 5,
    from: { type: "institute", name: "Khanqah-e-Rahmat" },
    to: { type: "user", name: "all" },
    avatar: post3,
    notification: "Join us for a special Jummah prayer this Friday.",
    reason: "event",
  },
  {
    id: 6,
    from: { type: "institute", name: "Green Field Kabristan" },
    to: { type: "user", name: "all" },
    avatar: avatarImg,
    notification: "Cemetery maintenance scheduled this weekend.",
    reason: "notice",
  },
  {
  id: 7,
  from: { type: "institute", name: "New Masjid" },
  to: { type: "user", name: "all" },
  avatar: post1,
  notification: "New Masjid has joined the platform.",
  reason: "new-institute"
}
];

export default NotificationData;
