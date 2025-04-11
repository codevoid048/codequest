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

export const postPotdChallenge = async () => {
  try {
    const today = new Date().toISOString();
    console.log("today", today);
    const response = await axios.post('http://localhost:5000/api/profile/potd', {
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


export const solvedChallenges = async () => {
  try {
    const response = await axios.get('http://localhost:5000/platforms/solvedChallenges', {
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
    return response.data;
  } catch (error) {
     console.error('Error fetching streak:', error);
    return null;
  }
}


export const solvedChallenges = async () => {
  try {
    const response = await axios.get('http://localhost:5000/platforms/solvedChallenges', {
            withCredentials: true
    });
    return response.data;
  } catch (error) {
     console.error('Error fetching solved challenges:', error);
    return null;
  }
}

    
