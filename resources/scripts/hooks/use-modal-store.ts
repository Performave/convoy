import { create } from 'zustand'

export interface ModalState<ModalData, ModalType> {
    modalQueue: ModalType[]
    activeModal: ModalType | null
    modalData: ModalData | null
    openModal: (modal: ModalType, data?: ModalData) => void
    closeModal: () => void
}

const createModalStore = <ModalData, ModalType>(
    transitionDelay: number = 250
) => {
    return create<ModalState<ModalData, ModalType>>((set, getState) => ({
        modalQueue: [],
        activeModal: null,
        modalData: null,
        openModal: (modal, data) => {
            const hasActiveModal = Boolean(getState().activeModal)

            if (hasActiveModal) {
                set({
                    activeModal: null,
                })
            }

            setTimeout(
                () => {
                    set(state => ({
                        modalQueue: [...state.modalQueue, modal],
                        activeModal: modal,
                        modalData: data || state.modalData,
                    }))
                },
                hasActiveModal ? transitionDelay : 0
            )
        },
        closeModal: () => {
            set({
                activeModal: null,
            })

            setTimeout(
                () =>
                    set(state => {
                        const updatedQueue = state.modalQueue.slice(0, -1)
                        return {
                            modalQueue: updatedQueue,
                            activeModal: updatedQueue[updatedQueue.length - 1],
                        }
                    }),
                transitionDelay
            )
        },
    }))
}

export default createModalStore
