import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        uid: "",
        passwd: "",
        authority : ""
    }),
    getters: {

    },
    actions: {

    },
})