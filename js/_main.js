
//strapi main variables
/*** __test */ let strapi_on=false
let strapi_url='https://edicao.setma.co.mz:3003' /// 'http://localhost:1337'


function pub_show_more(e) {
   e.parentElement.classList.toggle('active')
} 


document.querySelectorAll('._publicacoes ._only_show span').forEach(e=>{

        e.onclick=()=>{
        document.querySelectorAll('._publicacoes ._only_show span').forEach(j=>{
                j.classList.remove('active')
        }) 
        e.classList.add('active')

         document.querySelectorAll('._publicacoes ._flex ._div').forEach(d=>{

                    if (e.getAttribute('type')=="all") {
                         d.style.display="block" 
                    }else{
                        if (d.classList.contains(e.getAttribute('type'))) {
                                d.style.display="block" 
                        }else{
                         d.style.display="none"
                        }
                    }
                   
             })
          }
   })
function _show_more(element,div){
    element.classList.toggle('active')
    document.querySelectorAll(`.${div}`).forEach(e=>{
        e.style.display="block"
    })
    document.querySelectorAll(`[_div-2]`).forEach(e=>{
        e.style.display="none"
    })
    document.querySelector(`._show_more`).style.display="none"

}

let times_increased=0
function _resize_font(v) {
let add=0
let spets=1
let max=spets*2


if (v=='plus' && times_increased < max) {
times_increased+=spets
add=spets
}else if (v=='minus' && times_increased > 0) {
times_increased-=spets
add=-spets
}


if (times_increased >= max) {
document.querySelector('.top-header').classList.remove('increase')
}else if (times_increased <= 0) {
document.querySelector('.top-header').classList.remove('decrease')
}else{
document.querySelector('.top-header').classList.add('increase')
document.querySelector('.top-header').classList.add('decrease')
}



const not_permited_elements=['DIV']



document.querySelectorAll('body *').forEach(e=>{

if ((not_permited_elements.includes(e.tagName) && !e.getAttributeNames().includes('resizable')) || e.getAttributeNames().includes('not_resizable')) {
   return
}
const size=parseFloat(window.getComputedStyle(e).fontSize)
e.style.fontSize=`${size+add}px`

})


}



const video_container=document.querySelector('.playing-video-container')

const my_video=document.querySelector('.playing-video-container video')


function play_video(file) {
   my_video.src=file
   video_container.style.display="flex"
}

function close_video() {
  my_video.pause()
  video_container.style.display="none"
}




function view_event_img(e) {

  if(document.body.getAttribute('_ed_active')=="true"){
     return
   }

   document.querySelector('img[event_img]').src=e.children[0].src
   document.querySelector('._event-img-view').style.display="flex"


}



try{
document.querySelector('._main_silder_editing_painel .bg').addEventListener('click',()=>{
   document.querySelector('._main_silder_editing_painel').style.display="none"
})

}catch(e){
  
}


try{

function resize_main_y_video() {
  
  if (window.innerWidth - (window.innerWidth/5) > 800) {
    document.querySelector('.main-y-video').width=335
    document.querySelector('.main-y-video').height=320
  }else{
    document.querySelector('.main-y-video').width=window.innerWidth - (window.innerWidth/5)
    document.querySelector('.main-y-video').height=window.innerWidth / 2
  }

}



window.addEventListener('resize',()=>{
  resize_main_y_video()
})

resize_main_y_video()




let swiper=new Swiper('.partners-slider',{
  loop:true,
  spaceBetween:48,
  slidesPerView: 5,
  spaceBetween: 6,
  pagination:{
    el:'.swiper-pagination',
    clickable:true,
    dynamicBullets:true
  },
  breakpoints: {
    1205:{
      slidesPerView: 5,
      spaceBetween:8
    },
    1200:{
      slidesPerView: 4,
      spaceBetween:8
    },
    990: {
      slidesPerView: 4,
      spaceBetween: 8
    },
    720: {
      slidesPerView: 3,
      spaceBetween: 6
    },
    540: {
      slidesPerView: 2,
      spaceBetween: 4
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 2
    }
   
  }
})
}catch(e){

}



function setActiveNavLink(){
  const active_link=document.querySelector(`nav a[href='${window.location.pathname.split('/').getLast()}']`)
  active_link.classList.add('active')
  active_link.getParents()[2].childNodes[1].classList.add('active')
  active_link.getParents()[2].parentElement.childNodes[1].classList.add('active')

}



try{
  setActiveNavLink()
} catch(e){}
    

const url_params=document.location.href.split('?')



let update_pages_number=0

let current_page=""

async function updatePage(){

await fetch('updates/nav.json').then(e=>{
    if(!e.ok){
         setTimeout(()=>updatePage(),5000)
         return
    }
    return e.text()
}).then(res=>{
   document.querySelector('nav').innerHTML=res
   let navLinks = document.querySelector(".nav-links");
  let menuOpenBtn = document.querySelector(".navbar .bx-menu");
  let menuCloseBtn = document.querySelector(".nav-links .bx-x");
  menuOpenBtn.onclick = function() {
  navLinks.style.left = "0";
  }
  menuCloseBtn.onclick = function() {
  navLinks.style.left = "-100%";
  }
  if(window.pageYOffset > 60){
    document.querySelector('nav').classList.add('float')
  }else{
    document.querySelector('nav').classList.remove('float')
  }
  document.querySelector('nav').style.display="block"

  
  document.querySelectorAll('a').forEach(e=>{
  //  e.addEventListener('click',link_action)
 })


})

await fetch('updates/footer.json').then(e=>e.text()).then(res=>{
  document.querySelector('footer').innerHTML=res
})
try{
  setActiveNavLink()
}catch(e){}



 if (_gagoo_===true) {

      const url_params=document.location.href.split('#')[0].split('?')

      if(url_params.includes('_ed_active')){
        document.body.setAttribute('_ed_edit',true)
        _ed_init()
       } 
     }

     try{
      if(!document.querySelectorAll('._publicacoes ._flex ._div').length){
          document.querySelector('._publicacoes ._flex ._ed_add_new').classList.add('active')
      }
     }catch(e){}
    
}
updatePage()



async function show_news(){

  current_page=location.pathname.split('/')[location.pathname.split('/').length - 1] == "" ? "index.php" :  location.pathname.split('/')[location.pathname.split('/').length - 1]

  if(current_page=="index.php" || current_page==""){
    return
  }
  
  if(current_page!="index.php" || current_page=="")
  await fetch('updates/all-news.json').then(e=>e.json()).then(res=>{
    pub_news_data=res
    
     if (document.querySelector('._publicacoes') && !document.querySelector('._publicacoes ._ignore')) {
          let pub_content=""
          document.querySelector('._publicacoes ._flex').innerHTML=`
           <div class="_ed_add_new" style="display:none;" onclick="_ed_add_new(this)">
              <span>Adicionar novo</span>
           </div>`

          for (var i = 0; i < res.length; i++) {

               if (res[i].page==current_page && (current_page!="index.php" || current_page=="")) {
                   pub_content+=res[i].content.replace(/\\"/g, '"')
               }else if(current_page=="index.php" || current_page==""){
                     if (i <= 5) {
                        pub_content+=res[i].content.replace(/\\"/g, '"')
                     }
               }
          }
          document.querySelector('._publicacoes ._flex').innerHTML+=pub_content

      }

 })
}


const renderRichText = (richTextArray) => {
  let html = '';

  richTextArray.forEach((item) => {
    if (item.type === 'paragraph') {
      html += `<p>${renderTextChildren(item.children)}</p>`;
    } else if (item.type === 'list') {
      const listType = item.format === 'ordered' ? 'ol' : 'ul';
      html += `<${listType}>${item.children.map(child => `<li>${renderTextChildren(child.children)}</li>`).join('')}</${listType}>`;
    } else if (item.type === 'heading') {
      html += `<h${item.level}>${renderTextChildren(item.children)}</h${item.level}>`;
    }
  });
  return html;
};

const renderTextChildren = (children) => {
  return children.map(child => {
    let text = child.text || '';
    if (child.bold) text = `<strong>${text}</strong>`;
    if (child.italic) text = `<em>${text}</em>`;
    if (child.underline) text = `<u>${text}</u>`;
    if (child.strikethrough) text = `<del>${text}</del>`;
    if (child.type === 'link') text = `<a href="${child.url}">${text}</a>`;
    return text;
  }).join('');
};


let strapi_f={
  
    noticias:function(res,strapi_url){

          let sinas_content=`
          <div class="sinas-box">
              <div class="content">
                <div class="title">SINAS - Sistema de Informação Nacional de Água e Saneamento</div>
              <a href="https://www.sinasmz.com/">
            <div class="img">
              <img src="../../images/projectos/sinas.png">
            </div>
              </a
          </div>
          </div>`

          let container=document.querySelector('._strapi_noticias')
          container.innerHTML=""
 
          let data=window.location.href.includes('noticias') ? res.data : res.data.filter((_i,i)=>i <= 2)
          if(!window.location.href.includes('noticias') && !data.length){
            container.innerHTML+=sinas_content
          }
          data.forEach((i,_i)=>{
               let item=i.attributes
               container.innerHTML+=`
                    <div class="_item _ed _ed_item" _ed_model="_ed_model_option_1" _ed_default="_ed_news" style="display: block;">
                    <div class="_image">
                            <span class="date" spellcheck="false" >${item.data.split('-')[2]}-${item.data.split('-')[1]}-${item.data.split('-')[0]}</span>
                            <img onclick="_ed_change_img(this)"  src="${strapi_url+item.imagem.data[0].attributes.url}">
                    </div>
                        <div class="_text-content">
                             <a href="index.php" class="title" _ed_editable="">
                                   <span>
                                    ${item.titulo}
                                   </span>
                                   <br>
                              </a> 
                                  <p>${renderRichText(item.texto).slice(0,360)}...</p>
                                  <div class="read_more">
                                    <a href="noticia.php?id=${i.id}">
                                      Ler Mais
                                      <i class="fa fa-long-arrow-right"></i>
                                    </a>
                                  </div>
                        </div>
                   </div>
               `

                  //start sinas

              
                if(!window.location.href.includes('noticias') &&  (_i==1 || (_i==data.length - 1 && data.length <= 1))){
                  container.innerHTML+=sinas_content
                }


               // end sinas
          })


          


    },
    noticia:function(res,strapi_url){

    item=res.data.attributes  

    let container=document.querySelector('._strapi_noticia ._n')


    container.innerHTML=`
            <h2 _ed_editable>${item.titulo}</h2>
            <div class="image">
              <img onclick="_ed_change_img(this)"  src="${strapi_url+item.imagem.data[0].attributes.url}">
              <div class="date">
              <span _ed_editable>${item.data.split('-')[2]}-${item.data.split('-')[1]}-${item.data.split('-')[0]}</span>
                </div>
            </div>
            
            <div class="text">
                ${renderRichText(item.texto)}
            </div>
            `

    },
    documentos: function(res,strapi_url){
      let container=document.querySelector('._strapi_documentos')
      container.innerHTML=""

     let data=res.data

     current_page=location.pathname.split('/')[location.pathname.split('/').length - 1] == "" ? "index.php" :  location.pathname.split('/')[location.pathname.split('/').length - 1]

     if(current_page=="index.php" || current_page==""){
        data=data.filter((i,_i)=> _i < 8)
     }
      
     let cat=document.querySelector('._strapi_documentos').getAttribute('cat')
       
     if(!data) return

     data.forEach(i=>{
           
            let item=i.attributes
            let content=`<div class="_div anu _ed _ed_item" _ed_model="_ed_model_option_2" _ed_default="_ed_posts"> 
            <div class="_top" onclick="pub_show_more(this)">
              <div class="_pdf-icon"><img onclick="_ed_change_img_toggle(this)" _ed_image_toggle="../../images/_icons/newspaper.svg,../../images/_icons/pdf.svg" width="28px" height="28px" src="../../images/_icons/newspaper.svg"></div>
              <div class="_text">
               <h3 _ed_editable="">${item.titulo}</h3>
               <span _ed_editable="">${item.data.split('-')[2]}-${item.data.split('-')[1]}-${item.data.split('-')[0]}</span>
              </div>
              <div class="_arrow"><i class="fas fa-chevron-down"></i></div>
            </div>
            <div class="_content">
                ${renderRichText(item.texto)}
            </div>
            </div>`

            if(cat && item.tipo_de_documento.data.attributes.slug!=cat){
                content=""
            }

            container.innerHTML+=content 
      })
    }
}



let called__strapi_urls=[]
async function strapi(){
        

    /*** __test */
     if(!strapi_on){
           document.querySelectorAll('.__hidden').forEach((e)=>{
              e.style.display="block"
           })
           document.querySelectorAll('._loader').forEach((e)=>{
            e.style.display="none"
           })
           return
     }
     
     /*** __test */

      
      
      let urls=[]
      
      if(document.querySelector('._strapi_noticias') && !called__strapi_urls.includes('noticias')){
           urls.push({from:'noticias',url:strapi_url+"/api/noticias?populate=*"})
           called__strapi_urls.push('noticias')
      }
      
      if(document.querySelector('._strapi_documentos') && !called__strapi_urls.includes('documentos')){
         urls.push({from:'documentos',url:strapi_url+"/api/documentos?populate=*"})
         called__strapi_urls.push('documentos')
      }
      if(document.querySelector('._strapi_noticia') && !called__strapi_urls.includes('noticia')){
        let id=window.location.search.split('?id=')[1].replace('?_ed_active','')
        called__strapi_urls.push('noticia')
        if(!isNaN(id)){ 
          urls.push({from:'noticia',url:strapi_url+`/api/noticias/${id}?populate=*`})
        }else{
          alert('Noticia não encontrada, clique, ok para ir para página inicial.')
          window.location.href="/" 
          return
        }
      } 


      urls.forEach(i=>{
        fetch(i.url).then(response => {
          if (!response.ok) {
            if(response.status=="404" && i.from=="noticia"){
              alert('Noticia não encontrada, clique ok para ir para página inicial.') 
              window.location.href="/"
            }else if(response.status=="404" && i.from!="noticia"){
              alert('Item não encontrado, clique ok para ir para página inicial.')
              window.location.href="/" 
            }
  
            throw new Error('Error');
          }else{
            called__strapi_urls.push(i.from)
          }
  
          return response.json();
        })
        .then(data => {
          strapi_f[i.from](data,strapi_url)
        })
        .catch(error => {
          setTimeout(()=>strapi(),3000)
          console.log(error)
        });
      })

     
     
     
      
}

let _int

_int=setInterval(()=>{
    if(!called__strapi_urls.length){
      strapi()
    }else{
      clearInterval(_int)
    }
    //console.log('ok')
},2000)


window.addEventListener('load',()=>{
  strapi()
  /*** __test */  if(!strapi_on)  show_news()
})



function send_email() {
        const name=document.querySelector('._contact form input[name=name]').value
        const matter=document.querySelector('._contact form input[name=matter]').value
        const message=document.querySelector('._contact form textarea[name=message]').value
        const email=document.querySelector('._contact form input[name=email]').value



        if (!name || !matter || !message || !email) {
               alert('Por favor, preencha todos os campos.');
               return
        }else if(!grecaptcha.getResponse()){
               alert('Por favor, verifique se voçê não é um robô antes de prosseguir.');
               return
        }

        document.querySelector('.form-loader').style.display="flex"
       

        var xml = new XMLHttpRequest();
        xml.open("POST", "server/mail.php", false);
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //xml.send();
        xml.send(`name=${name}&message=${message}&email=${email}&matter=${matter}&g-recaptcha-response=${grecaptcha.getResponse()}`);
        var resp = xml.responseText;


        if (resp) {
              document.querySelector('.form-loader').style.display="none"
        }


        
        
        if (resp==1) {
          alert('Agradecemos pelo seu contato! Retornaremos em breve.');
          document.querySelector('._contact form').reset()
          grecaptcha.reset()
        }else if(resp == 2){
          alert('Por favor, verifique se voçê não é um robô antes de prosseguir.');
        }else if(resp == 3){
          alert('Por favor, preencha todos os campos.');
          grecaptcha.reset()
        }else{
          alert('Ocorreu um erro ao enviar a mensagem, tente novamente.');
          grecaptcha.reset()
        }

        


  
}







// sidebar open close js code


// sidebar submenu open close js code

document.querySelectorAll(".htmlcss-arrow").forEach(e=>{
   e.addEventListener('click',()=>{
       e.classList.toggle("show1");
   })
})


window.addEventListener('scroll',()=>{
  const windowY=window.pageYOffset

  if(window.pageYOffset > 100){
    document.querySelector('nav').classList.add('float')
  }else{
    document.querySelector('nav').classList.remove('float')
  }

})

window.addEventListener('onload',()=>{
  if(window.pageYOffset > 60){
    document.querySelector('nav').classList.add('float')
  }else{
    document.querySelector('nav').classList.remove('float')
  }
})





























