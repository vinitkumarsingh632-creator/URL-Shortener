import qrcode from 'qrcode'
const svg = document.getElementById('svg')
const img = document.getElementsByClassName('qrcode')
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
   const data = await fetch('https://localhost:4000',{
    method:'post',
    body:JSON.stringify({
        url:value
    }),
    headers:{
        contentType:'application/json'
    }
   })
   const base64 = qrcode.toDataURL(data.url)
   qrcode.src = base64
   url.textContent = data.url
   loading.style.display = 'none'
}
else{
    alert('Please Enter the URL')
}}
