import { create } from 'zustand'

interface IdentityState {
    lastConfirmed: number | null // Stores the timestamp of the last confirmation
    confirmIdentity: () => void // Updates the timestamp
    isIdentityValid: (expiryTime: number) => boolean // Checks if confirmation is valid
}

export const useIdentityConfirmationStore = create<IdentityState>(
    (set, get) => ({
        lastConfirmed: null,
        confirmIdentity: () => set({ lastConfirmed: Date.now() }),
        isIdentityValid: expiryTime => {
            const lastConfirmed = get().lastConfirmed
            return (
                lastConfirmed !== null &&
                Date.now() - lastConfirmed <= expiryTime
            )
        },
    })
)

export default useIdentityConfirmationStore
