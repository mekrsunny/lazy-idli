import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Score {
  username: string;
  time: string; 
}

interface LeaderboardState {
  scores: Score[];
  mostRecentEntry: Score | null;
}

const dummyData: Score[] = [
  { username: 'Arjun Sharma', time: '02:30:150' },
  { username: 'Riya Verma', time: '01:45:900' },
  { username: 'Vikram Singh', time: '03:15:250' },
  { username: 'Priya Kumar', time: '00:55:700' },
  { username: 'Rohan Patel', time: '02:05:450' },
  { username: 'Sneha Rao', time: '01:35:600' },
  { username: 'Amit Joshi', time: '00:50:300' },
  { username: 'Kavya Iyer', time: '02:20:500' },
  { username: 'Anil Mehta', time: '01:10:850' },
  { username: 'Meena Desai', time: '02:55:100' },
  { username: 'Gaurav Nair', time: '01:25:750' },
  { username: 'Divya Reddy', time: '03:00:200' },
  { username: 'Suresh Menon', time: '01:40:550' },
  { username: 'Anita Chawla', time: '02:10:650' },
  { username: 'Raj Gupta', time: '00:45:950' },
  { username: 'Lily Chen', time: '02:12:300' },
  { username: 'Omar Khan', time: '01:58:400' },
  { username: 'Isabella Garcia', time: '03:07:100' },
  { username: 'Ethan Miller', time: '00:42:500' },
  { username: 'Sophia Hernandez', time: '01:50:800' },
  { username: 'William Moore', time: '02:45:900' },
  { username: 'Ava Lewis', time: '00:35:200' },
  { username: 'Benjamin Lee', time: '02:28:700' },
  { username: 'Charlotte Brown', time: '01:05:600' },
];

const initialState: LeaderboardState = {
  scores: dummyData.sort((a, b) => {
    const [aMin, aSec, aMs] = a.time.split(':').map(Number);
    const [bMin, bSec, bMs] = b.time.split(':').map(Number);
    return aMin - bMin || aSec - bSec || aMs - bMs;
  }),
  mostRecentEntry: dummyData.length > 0 ? dummyData[0] : null,
};

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    addScore: (state, action: PayloadAction<Score>) => {
      state.scores.push(action.payload);
      state.scores.sort((a, b) => {
        const [aMin, aSec, aMs] = a.time.split(':').map(Number);
        const [bMin, bSec, bMs] = b.time.split(':').map(Number);
        return aMin - bMin || aSec - bSec || aMs - bMs;
      });
      state.mostRecentEntry = action.payload;
    },
  },
});

export const { addScore } = leaderboardSlice.actions;
export default leaderboardSlice.reducer;
