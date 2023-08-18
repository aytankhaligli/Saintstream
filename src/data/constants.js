import facebookIcon from "./../assets/icons/Facebook.svg";
import instagramIcon from "./../assets/icons/Instagram.svg";
import twitterIcon from "./../assets/icons/Twitter.svg";
import googleIcon from "./../assets/icons/Google.svg";
import disney from "./../assets/images/Disney.png";
import netflix from "./../assets/images/Netflix.png";
import hbo from "./../assets/images/HBO.png";
import pixar from "./../assets/images/Pixar.png";
import marvel from "./../assets/images/marvel.png";
import star from "./../assets/images/star-wars.png";
import natgeo from "./../assets/images/NatGeo.png";

export const Movies = [
  {
    id: 1,
    name: "The Last of Us",
    season: 1,
    episodes: 9,
    time: "1h30m",
    year: 2022,
    categories: ["Fantasy", "Actions"],
    image: "../src/assets/images/lastofus.png",
    imdb: 4.3,
    isMovie: false,
    description:
      "The third season of the American television series The Last of Us stars Pedro Pascal as the title character, a bounty hunter traveling to Mandalore to redeem his past transgressions with his adopted son Grogu and being aided on their journey by fellow Mandalorian Bo-Katan Kryze.",
  },
  {
    id: 1,
    name: "Mandalorian",
    season: 3,
    episodes: 9,
    time: "2h40m",
    year: 2022,
    categories: ["Fantasy", "Actions"],
    image: "../src/assets/images/Mandalorian.png",
    imdb: 4.3,
    isMovie: false,
    description:
      "The third season of the American television series The Mandalorian stars Pedro Pascal as the title character, a bounty hunter traveling to Mandalore to redeem his past transgressions with his adopted son Grogu and being aided on their journey by fellow Mandalorian Bo-Katan Kryze.",
  },
  {
    id: 2,
    name: "Enola Holmes 2",
    time: "2h20m",
    year: 2020,
    categories: ["Action"],
    image: "../src/assets/images/lastofus.png",
    imdb: 4.8,
    isMovie: true,
    description:
      "The third season of the American television series Enola Holmes 2 stars Pedro Pascal as the title character, a bounty hunter traveling to Mandalore to redeem his past transgressions with his adopted son Grogu and being aided on their journey by fellow Mandalorian Bo-Katan Kryze.",
  },
  {
    id: 3,
    name: "Satan's slaves",
    year: 2020,
    time: "1h20m",
    categories: ["Horror"],
    image: "../src/assets/images/Mandalorian.png",
    imdb: 4.6,
    isMovie: true,
    description:
      "The third season of the American television series Satan's slaves stars Pedro Pascal as the title character, a bounty hunter traveling to Mandalore to redeem his past transgressions with his adopted son Grogu and being aided on their journey by fellow Mandalorian Bo-Katan Kryze.",
  },
  {
    id: 4,
    name: "The Flash",
    year: 2022,
    time: "2h",
    categories: ["Mystery"],
    image: "../src/assets/images/lastofus.png",
    imdb: 4.6,
    isMovie: true,
    description:
      "The third season of the American television series The Flash stars Pedro Pascal as the title character, a bounty hunter traveling to Mandalore to redeem his past transgressions with his adopted son Grogu and being aided on their journey by fellow Mandalorian Bo-Katan Kryze.",
  },
  {
    id: 4,
    name: "Weak Hero",
    season: 1,
    episodes: 9,
    time: "2h10m",
    year: 2019,
    categories: ["Action", "Drama"],
    image: "../src/assets/images/Mandalorian.png",
    imdb: 4.6,
    isMovie: false,
    description:
      "The third season of the American television series Weak Hero stars Pedro Pascal as the title character, a bounty hunter traveling to Mandalore to redeem his past transgressions with his adopted son Grogu and being aided on their journey by fellow Mandalorian Bo-Katan Kryze.",
  },
];

export const Streamlist = [
  {
    id: 1,
    image: disney,
  },
  {
    id: 2,
    image: netflix,
  },
  {
    id: 3,
    image: hbo,
  },
  {
    id: 4,
    image: pixar,
  },
  {
    id: 5,
    image: marvel,
  },
  {
    id: 6,
    image: star,
  },
  {
    id: 7,
    image: natgeo,
  },
];

export const navElements = ["Home", "Discover", "Popular People", "Profile"];

export const anotherNav = ["Episode", "Universe", "News", "Reviews"];
export const footerNavElements = ["Home", "Discover", "Profile"];
export const footerElements = ["Privacy policy", "Term of Service", "Language"];
export const socialIcons = [
  { url: facebookIcon, name: "facebook" },
  { url: instagramIcon, name: "instagram" },
  { url: twitterIcon, name: "twitter" },
  { url: googleIcon, name: "google" },
];
