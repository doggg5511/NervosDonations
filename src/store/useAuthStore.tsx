import {create} from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AuthStore {
    address: string,
    loggedIn: boolean,
    loading: boolean,
    signInToken: string,
    setSignInToken: (x: string) => void,
    setLoggedIn: (x: boolean) => void,
    setAddress: (x: string) => void,
    setLoading: (x: boolean) => void,
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            address: "",
            loading: false,
            loggedIn: false,
            signInToken: "",
            setLoading: (x) => set(() => ({loading: x})),
            setAddress: (x) => set(() => ({address: x})),
            setLoggedIn: (x) => set(() => ({loggedIn: x})),
            setSignInToken: (x) => set(() => ({signInToken: x})),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ signInToken: state.signInToken }),
        }
    )
)