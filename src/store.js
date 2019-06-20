import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        status: '',
        chrono: {
            minutes: 0,
            seconds: 0,
            toString: '00 : 00',
            idInterval: 0,
            running: false,
        },
        stars: 0,
        lastAddedStars: {
            numbler: 0,
            show: false
        },
        userInterface: null,
        prevRoute: null
    },
    mutations: {
        setUserInterface(state, payload) {
            state.userInterface = payload;
        },
        addStars(state, payload) {
            state.stars = state.stars + payload;
        },
        setLastAddedStars(state, payload) {
            // state.lastAddedStars = 0;
            // console.log(payload)
            if (payload != 0 && payload != 24) {
                state.lastAddedStars.number = payload;
                state.lastAddedStars.show = true;
                setTimeout(() => {
                    state.lastAddedStars.show = false;
                }, 1000)
            }
        },
        setStatus(state, payload) {
            state.status = payload;
        },
        runChrono(state) {
            if (state.chrono.running == false) {
                state.chrono.running = true;
                state.chrono.idInterval = setInterval(() => {
                    state.chrono.seconds += 1;
                    if (state.chrono.seconds === 60) {
                        state.chrono.seconds = 0;
                        state.chrono.minutes = state.chrono.minutes + 1;
                    }
                    let minutes = state.chrono.minutes;
                    let seconds = state.chrono.seconds;

                    state.chrono.toString = minutes + ' : ' + seconds;
                    //put a 0 when & where needed
                    if (minutes < 10) {
                        state.chrono.toString = '0' + minutes + ' : ' + seconds;
                    }
                    if (seconds < 10) {
                        state.chrono.toString = minutes + ' : 0' + seconds;
                    }
                    if (seconds < 10 && minutes < 10) {
                        state.chrono.toString = '0' + minutes + ' : 0' + seconds;
                    }
                }, 1000);
            }
        },
        resetChrono(state) {
            state.chrono.seconds = 0;
            state.chrono.minutes = 0;
            state.chrono.toString = '00 : 00';
        },
        stopChrono(state) {
            state.chrono.running = false;
            clearInterval(state.chrono.idInterval);
            if (state.status != 'WIN' && state.status != 'PAUSE') {
                this.commit('resetChrono');
            }
        }
    }
})