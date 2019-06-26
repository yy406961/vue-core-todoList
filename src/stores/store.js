import Vuex from 'vuex'

import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

export default () => {
    const store = new Vuex.Store({
        state: defaultState, // 这么起名，是因为state里的数据只是默认的，后面可能会修改
        mutations,
        getters,
        actions,
        // 插件 方法
        // plugins: [
        //     (store) => {
        //         console.log('my plugin invoked')
        //     }
        // ],
        modules: {
            a: {
                namespaced: true,
                state: {
                    text: 1
                },
                mutations: {
                    updateText (state, text) {
                        state.text = text
                    }
                }
            },
            b: {
                state: {
                    text: 2
                }
            }
        }
    })

    if (module.hot) {
        module.hot.accept([
            './state/state',
            './mutations/mutations',
            './actions/actions',
            './getters/getters'
        ], () => {
            const newState = require('./state/state').default
            const newMutations = require('./mutations/mutations').default
            const newActions = require('./actions/actions').default
            const newGetters = require('./getters/getters').default
      
            store.hotUpdate({
              state: newState,
              mutations: newMutations,
              getters: newGetters,
              actions: newActions
            })
        })
    }
    return store
}

