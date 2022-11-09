const namespaced = true;

const state = {
  value: "",
  reloadCount: 0
};

const getters:any = {
  getValue: (state: any) => state.value,
  getReload: (state: any) => state.reloadCount
};

const actions:any = {
  async setValue(state:any, value:any) {
    state.commit("setValue", value);
  },
  async reload(state:any){
    state.commit("setReloadCount", state.getters.getReload + 1)
  }
};

const mutations:any = {
  setValue: (state:any, value:any) => (state.value = value),
};

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
