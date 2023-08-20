export const url = "https://instagramapi.mhmdlkylny.repl.co"
export  async function ajax(path,data=false,method="get"){
    let res
  if(data){
          res = await fetch(url+path,{
                     method:"post",
                     body: data
                 })
                 const dataSever = await res.json(res)
    return dataSever
  }else if(method=="get"){
    console.log(method)
    try{

        res = await fetch(url+path,{
          method:method
      })
    }catch(err){
        console.log(err)
    }  
    const dataSever = await res.json(res)
    return dataSever  
  }else{
 const res  =await fetch(url+path,{
        method
    })
    console.log(res)
  }
 

 }