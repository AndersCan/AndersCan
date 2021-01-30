const { Octokit } = require("@octokit/core");
const { eightBallText } = require("./eight-ball-text");

const token = process.env.GH_TOKEN;
process.env.TZ = "Europe/Oslo";

if (!token) {
  throw new TypeError("missing ENV (GH_TOKEN)");
}
const octokit = new Octokit({
  auth: token,
});
main();
async function main() {
  const today = new Date();
  const status = getEightBallPrediction();
  const dataString = today.toLocaleDateString("nb-NO", {
    month: "long",
    day: "numeric",
  });
  const bio = `Will today, ${dataString}, be a good day? 🎱 ${status} 🎱`;

  console.log("TZ:", process.env.TZ);
  console.log("setting bio to:", bio);
  await octokit.request("PATCH /user", {
    bio,
  });
}

function getEightBallPrediction() {
  const randomIndex = getRandomNumberFrom(0, eightBallText.length - 1);
  return eightBallText[randomIndex];
}

function getRandomNumberFrom(from, to) {
  return Math.floor(Math.random() * (to - from + 1) + from);
}
