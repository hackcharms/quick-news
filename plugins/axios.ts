import { Context } from "@nuxt/types"

export default function ({ $axios,$config, redirect }:Context) {
  $axios.onRequest(config => {
    config.params.apiKey=$config.API_KEY
    return config;
  })
  
  $axios.onError((error:any) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400');
    }
  })
  $axios.setBaseURL('https://newsapi.org/v2/')
  
}