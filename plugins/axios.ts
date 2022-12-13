import { Context } from "@nuxt/types"

export default function ({ $axios,$config, redirect }:Context) {
  $axios.onRequest(config => {
    // console.log("env",process.env)
    // console.log("this.$config",$config)
    if(config.url?.includes('?')){
      if(config.url?.endsWith('&')||config.url?.endsWith('?')){
        config.url=config.url+'apiKey='+$config.API_KEY
      }else{
        config.url=config.url+'&apiKey='+$config.API_KEY
      }
    }else{
        config.url=`${config.url}?apiKey=${$config.API_KEY}`
    }
    return config;
  })
  
  $axios.onError((error:any) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400');
    }
  })
  $axios.setBaseURL('https://newsapi.org/v2/')
  
  $axios.setHeader("Access-Control-Allow-Origin","*")  
}