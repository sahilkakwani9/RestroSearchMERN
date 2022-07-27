import create from 'zustand'
const useStore = create((set) => ({
    user_id: 1,
    reviewId: 0,
    reId: 0,
    setuId: (value) => set({user_id: value}),
    setrId: (value) => set({reviewId: value}),
    setReId: (value) => set({reId: value})
  }))

  export default useStore;