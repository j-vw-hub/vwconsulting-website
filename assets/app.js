document.getElementById('year').textContent=new Date().getFullYear();
const menu=document.querySelector('.menu');
menu.addEventListener('click',()=>{const nav=document.querySelector('.header nav');const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
const form=document.getElementById('contactForm');
if(form){
  const status=document.getElementById('formStatus');
  const button=form.querySelector('button[type=submit]');
  const show=(text,type)=>{status.textContent=text;status.className=type;};
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form));
    if(data.access_key==='WEB3FORMS_ACCESS_KEY'){show('Het formulier is nog niet gekoppeld. Mail ons via info@vwconsulting.nl.','error');return;}
    button.disabled=true;show('Bezig met verzenden…','');
    try{
      const res=await fetch(form.action,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(data)});
      const json=await res.json();
      if(!res.ok||!json.success)throw new Error(json.message);
      form.reset();show('Dank je wel! Je bericht is verzonden. Ik neem zo snel mogelijk contact met je op.','ok');
    }catch(err){
      show('Verzenden is niet gelukt. Probeer het later opnieuw of mail naar info@vwconsulting.nl.','error');
    }finally{button.disabled=false;}
  });
}
