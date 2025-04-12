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
    const response = await axios.post('http://localhost:5000/api/profile/potd', {
      timestamp: today
    }, {
      withCredentials: true // Add credentials to request
    });
    console.log("posted potd challenge");
    return response.data;
  } catch (error) {
    console.error('Error posting POTD challenge:', error);
    return null;
  }
};
