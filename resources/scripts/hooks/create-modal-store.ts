import { StoreApi, UseBoundStore, create } from 'zustand'

export interface ModalState<ModalData, ModalIdentifier extends string> {
    modalQueue: ModalIdentifier[]
    activeModal: ModalIdentifier | null
    modalData: ModalData | null
    openModal: (modal: ModalIdentifier, data?: ModalData) => void
    closeModal: (modal: ModalIdentifier) => void
    backOutFromMiddleware: (middlewareId: ModalIdentifier) => void
}

export interface ModalConfig<ModalIdentifier extends string> {
    middleware: ModalMiddleware<ModalIdentifier>
}

export type ModalConfigs<ModalIdentifier extends string> = Partial<
    Record<ModalIdentifier, ModalConfig<ModalIdentifier>>
>

export interface ModalMiddleware<ModalIdentifier extends string> {
    // ID here is the fallback modal to show if shouldContinue() is false
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
            if (get().modalQueue.includes(modal)) {
                return
            }

            const middleware = modalConfigs?.[modal]?.middleware
            const hasActiveModal = Boolean(get().activeModal)

            if (middleware && !middleware.shouldContinue()) {
                // Middleware says we cannot continue, queue fallback modal + requested modal
                if (hasActiveModal) {
                    set({ activeModal: null })
                }

                setTimeout(
                    () => {
                        set(state => ({
                            modalQueue: [
                                ...state.modalQueue,
                                modal,
                                middleware.id,
                            ],
                            activeModal: middleware.id,
                            modalData: data ?? state.modalData,
                        }))
                    },
                    hasActiveModal ? transitionDelay : 0
                )

                return
            }

            // Otherwise, normal flow
            if (hasActiveModal) {
                set({ activeModal: null })
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
        closeModal: modal => {
            if (get().activeModal !== modal) {
                return
            }

            set({ activeModal: null })

            setTimeout(() => {
                set(state => {
                    const updatedQueue = state.modalQueue.slice(0, -1)

                    return {
                        modalQueue: updatedQueue,
                        activeModal: updatedQueue[updatedQueue.length - 1],
                    }
                })
            }, transitionDelay)
        },
        backOutFromMiddleware: middlewareId => {
            if (get().activeModal !== middlewareId) {
                return
            }

            set({ activeModal: null })
            setTimeout(() => {
                set(state => {
                    // Remove the top two modals: the fallback modal and the requested modal
                    const updatedQueue = state.modalQueue.slice(0, -2)

                    return {
                        modalQueue: updatedQueue,
                        activeModal: updatedQueue[updatedQueue.length - 1],
                    }
                })
            }, transitionDelay)
        },
    }))
}

export default createModalStore
