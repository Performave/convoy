import { StoreApi, UseBoundStore, create } from 'zustand'

export interface ModalState<ModalData, ModalIdentifier extends string> {
    modalQueue: ModalIdentifier[]
    activeModal: ModalIdentifier | null
    modalData: ModalData | null
    openModal: (modal: ModalIdentifier, data?: ModalData) => void
    closeModal: (clearQueue?: boolean) => void
}

export type ModalConfigs<ModalIdentifier extends string> = Record<
    ModalIdentifier,
    ModalMiddleware<ModalIdentifier>
>

export interface ModalConfig<ModalIdentifier extends string> {
    middleware?: ModalMiddleware<ModalIdentifier>
}

export interface ModalMiddleware<ModalIdentifier extends string> {
    id: ModalIdentifier
    shouldContinue: () => boolean
}

export type ModalStore<
    ModalData,
    ModalIdentifier extends string,
> = UseBoundStore<StoreApi<ModalState<ModalData, ModalIdentifier>>>

const createModalStore = <ModalData, ModalIdentifier extends string>(
    modalConfigs?: ModalConfigs<ModalIdentifier>,
    transitionDelay: number = 250
) => {
    return create<ModalState<ModalData, ModalIdentifier>>((set, get) => ({
        modalQueue: [],
        activeModal: null,
        modalData: null,
        openModal: (modal, data) => {
            const hasActiveModal = Boolean(get().activeModal)

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
        closeModal: clearQueue => {
            set({
                activeModal: null,
            })

            setTimeout(
                () =>
                    set(state => {
                        const updatedQueue = clearQueue
                            ? []
                            : state.modalQueue.slice(0, -1)
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
