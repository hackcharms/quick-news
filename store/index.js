
import axios from "~/plugins/axios";
export const state=()=>({
    isNewsLoading:false,
    selectedCategory:"",
    selectedCountry:"in",
    newsData:[],
    paginatorCurrentPage:1
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
    },
    updateNewsData(state,value){
        state.newsData=value;
    },
    updatePaginatorCurrentPage(state,value){
        state.paginatorCurrentPage=value;
    }
}

export const actions = {
    resetPaginatorCurrentPage({commit}){
        commit('updatePaginatorCurrentPage',1);
    }
};
export const getters={
    isNewsLoading(state){
        return state.isNewsLoading;
    },
    selectedCategory(state){
        return state.selectedCategory;
    },
    selectedCountry(state){
        return state.selectedCountry;
    },
    newsData(state){
        return state.newsData;
    },
    paginatorCurrentPage(state){
        return state.paginatorCurrentPage;
    }
}