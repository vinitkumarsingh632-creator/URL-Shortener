import qrcode from 'qrcode'
const serverStarting = document.getElementsByClassName('serverStarting')[0]
window.addEventListener('DOMContentLoaded',async()=>{
    console.log('Request Sent')
    console.log(serverStarting)
    await fetch('https://url-shortener-ukgs.onrender.com/start')
    serverStarting.style.display = 'none'
    console.log('Done')

})
const svg = document.getElementById('svg')
const img = document.getElementsByClassName('qrcode')[0]
const url = document.getElementsByClassName('url')[0]
const popup = document.getElementsByClassName('copy')[0]
svg.onclick = async() =>{
 await navigator.clipboard.writeText(url.textContent)
 popup.style.opacity = 1
 setTimeout(()=>{
    popup.style.opacity = 0
 },1000)
}


const submit = document.getElementsByClassName('submit')[0]
const input = document.getElementsByTagName('input')[0]
const loading = document.getElementsByClassName('loading')[0]
submit.onclick = async() => {
    const value = input.value
    if(value){
        loading.style.display = 'block'
    input.value = ""
   const data = await fetch('https://url-shortener-ukgs.onrender.com/url',{
    method:'post',
    body:JSON.stringify({
        fullURL:value
    }),
    headers:{
        'Content-Type':'application/json'
    }
   })
   const jsonData = await data.json()
   const base64 = await qrcode.toDataURL(jsonData.shortURL)
   console.log(img)
   img.src = base64
   url.textContent = jsonData.shortURL
   loading.style.display = 'none'
}
else{
    alert('Please Enter the URL')
}}
