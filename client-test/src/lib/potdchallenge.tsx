import axios from 'axios';

// export const postPotdChallenge = async () => {
//   try {
//     const today = new Date().toISOString();
//     const response = await axios.post('http://localhost:5000/api/profile/potd', {
//       timestamp: today
//     });
//     console.log("posted potd challenge");
//     return response.data;
//   } catch (error) {
//     console.error('Error posting POTD challenge:', error);
//     return null;
//   }
// };

export const postPotdChallenge = async (username:string,challengeId : string , difficulty : string) => {
  try {
    const today = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).formatToParts(new Date()).reduce((acc, part) => {
      if (part.type === "year") acc.date = part.value + "-";
      if (part.type === "month") acc.date += part.value + "-";
      if (part.type === "day") acc.date += part.value;
      if (part.type === "hour") acc.time = part.value;
      if (part.type === "minute") acc.time += ":" + part.value;
      if (part.type === "second") acc.time += ":" + part.value;
      return acc;
    }, { date: "", time: "" });
    console.log("today", today);
    const response = await axios.post('http://localhost:5000/api/profile/potd', {
      username,
      challengeId,
      difficulty,
      timestamp: today
    }, {
      withCredentials: true 
    });
    console.log("posted potd challenge");
    return response.data;
  } catch (error) {
    console.error('Error posting POTD challenge:', error);
    return null;
  }
};


export const solvedChallenges = async (username:string) => {
  try {
    const response = await axios.post('http://localhost:5000/platforms/solvedChallenges', {
      username: username,
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching solved challenges:', error);
    return null;
  }
}
export const streak = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/profile/streak', {
      withCredentials: true
    });
    if (response.data.success) {
      return response.data;
    } else {
      console.error('Streak update failed:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching streak:', error);
    return null;
  }
}
