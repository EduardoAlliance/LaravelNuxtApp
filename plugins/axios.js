export default function({$axios, store,$router}){
  $axios.onError(res => {
    if(res.response.status === 422) {
      store.dispatch("validation/setErrors", res.response.data.errors)
    }

    if(res.response.status === 401){
      console.log(res.response);
      //$router.push('/login')
    }

    return Promise.reject(res)

  });

  $axios.onRequest(()=>{
      store.dispatch('validation/clearErrors')
  })
}
