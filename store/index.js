export const state=()=>({
    isNewsLoading:false,
    selectedCategory:"",
    selectedCountry:"in"
});
export const mutations={
    updateIsnewsLoading(state,value){
        state.isNewsLoading=value;
    },
    updateSelectedCategory(state,value){
        state.selectedCategory=value;
    },
    updateSelectedCountry(state,value){
        state.selectedCountry=value;
    }
}

export const actions = {};
export const getters={
    isNewsLoading(state){
        return state.isNewsLoading;
    },
    selectedCategory(state){
        return state.selectedCategory;
    },
    selectedCountry(state){
        return state.selectedCountry;
    }
}