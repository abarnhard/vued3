import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const GET_CHART_DATA = 'GET_CHART_DATA';
export const RECEIVE_CHART_DATA = 'RECEIVE_CHART_DATA';

const defaultState = {
  chartData: [],
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  [RECEIVE_CHART_DATA](state, data) {
    state.chartData = data;
  },
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  increment: ({ commit }) => commit('increment'),
  [GET_CHART_DATA]({ commit }) {
    const data = [
      ['2017-03-01T01:00:00', 1, 3],
      ['2017-03-02T01:00:00', 2, 6],
      ['2017-03-03T01:00:00', 2, 6],
      ['2017-03-04T01:00:00', 2, 6],
      ['2017-03-05T01:00:00', 2, 6],
      ['2017-03-06T01:00:00', 4, 6],
      ['2017-03-07T01:00:00', 9, 7],
      ['2017-03-08T01:00:00', 18, 14],
      ['2017-03-09T01:00:00', 23, 16],
      ['2017-03-10T01:00:00', 24, 16],
      ['2017-03-11T01:00:00', 24, 16],
      ['2017-03-12T01:00:00', 24, 16],
      ['2017-03-13T01:00:00', 25, 18],
      ['2017-03-14T01:00:00', 26, 19],
      ['2017-03-15T01:00:00', 30, 21],
      ['2017-03-16T01:00:00', 32, 23],
      ['2017-03-17T01:00:00', 32, 23],
      ['2017-03-18T01:00:00', 32, 23],
      ['2017-03-19T01:00:00', 32, 23],
      ['2017-03-20T01:00:00', 32, 23],
      ['2017-03-21T01:00:00', 32, 25],
      ['2017-03-22T01:00:00', 32, 26],
      ['2017-03-23T01:00:00', 32, 28],
      ['2017-03-24T01:00:00', 32, 29],
      ['2017-03-25T01:00:00', 32, 29],
      ['2017-03-26T01:00:00', 32, 29],
      ['2017-03-27T01:00:00', 32, 29],
      ['2017-03-28T01:00:00', 35, 29],
      ['2017-03-29T01:00:00', 35, 29],
      ['2017-03-30T01:00:00', 35, null],
      ['2017-03-31T01:00:00', 35, null],
    ];

    commit(RECEIVE_CHART_DATA, data);
  },
};

// getters are functions
const getters = {
  evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd',
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state: defaultState,
  getters,
  actions,
  mutations,
});
