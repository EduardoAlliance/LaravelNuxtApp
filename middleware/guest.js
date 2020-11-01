export default function({store,redirect}){
  if(store.getters['authtenticated']){
      return redirect('/dashboard/profile')
  }
}
