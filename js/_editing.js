let edit_mode=true
let __changing_images=[]

let Pages

let last_clicked_element;
let pub_news_data=[]
let pub_ids=[]
let change_image_containers={
	content:'',
	container:'',
	
}

 
function formatDoc(cmd, value=null) {
	if (cmd=="fontName") {
	
    document.execCommand(cmd, false, 'Open Sans');

		document.querySelectorAll('font').forEach(e=>{
			e.style.fontFamily="Open Sans"
			
		})
	}
	if(value) {
		document.execCommand(cmd, false, value);
	} else {
		document.execCommand(cmd);
	}

	if (cmd=="unlink" && last_clicked_element.tagName=="A" && !last_clicked_element.parentElement.getAttribute('_ed_editable')) {
		last_clicked_element.removeAttribute('href')
	}

}

function addLink() {
	const url = prompt('Insert url');
	formatDoc('createLink', url);

	if (last_clicked_element.tagName=="A" && !last_clicked_element.parentElement.getAttribute('_ed_editable')) {

               last_clicked_element.href=url
         
	}

}
  





const content = document.querySelector('[contenteditable]');

/*content.addEventListener('mouseenter', function () {
	return
	
	const a = content.querySelectorAll('a');
	a.forEach(item=> {
		item.addEventListener('mouseenter', function () {
			content.setAttribute('contenteditable', false);
			item.target = '_blank';
		})
		item.addEventListener('mouseleave', function () {
			content.setAttribute('contenteditable', true);
		})
	})
})*/



let changing_img=""


function _ed_change_img(e){
  if(document.body.getAttribute('_ed_edit')!="true") {
    	return
    }

	changing_img=e
	document.querySelector('#change_image').click()
}


function changing_img_cancelled(e){
	 console.log(e.value)
}


function change_image() {
	  /* const file=document.querySelector('#change_image')
	   const f=file.files[0]
	   const reader=new FileReader()
	   reader.addEventListener('load',()=>{
	     changing_img.src=reader.result
	   })
	   reader.readAsDataURL(f)*/
	   document.querySelector('.form-loader').style.display="flex"
	   

	   setTimeout(()=>{
		if(!document.querySelector("#change_image").value) return

	   
	
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					//document.querySelector("#change_image").files[0].name
					changing_img.src=`uploaded_imgs/${xhr.responseText}`
					document.querySelector('.form-loader').style.display="none"
				} else {
					document.querySelector('.form-loader').style.display="none"
					setTimeout(()=>{
						alert('Ocorreu um erro ao carregar a imagem, tente novamente!')
					},200)
					
				}
			}
		};
	
		xhr.open('POST','server/upload-img.php',true);
		var formData = new FormData();
		document.querySelector("#change_image").files[0].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		formData.append("upload", document.querySelector("#change_image").files[0]);
		xhr.send(formData);
	   },200)


	 
}

function _ed_change_gallery_img(e){
	if(document.body.getAttribute('_ed_active')!="true") {
    	return
    }
	changing_img=e
	document.querySelector('#_ed_change_gallery_image').click()

}



function _ed_change_gallery_image() {
	   const file=document.querySelector('#_ed_change_gallery_image')
	   const f=file.files[0]
	   const reader=new FileReader()
	   reader.addEventListener('load',()=>{
	     changing_img.src=reader.result
	     changing_img.parentElement.href=changing_img.src
	     document.querySelector('.lb-image').src=changing_img.src
	   })
       reader.readAsDataURL(f)
}


let changing_hover_img=""
function _ed_change_bottom_img(e){
	
	 if(document.body.getAttribute('_ed_edit')!="true") {
    	return
    }

	changing_hover_img=e
	document.querySelector('#change_hover_image').click()

}

function change_hover_image() {
	const file=document.querySelector('#change_hover_image')
	const f=file.files[0]
	const reader=new FileReader()
	reader.addEventListener('load',()=>{

	changing_hover_img.style.backgroundImage=`url(${reader.result})`
	changing_hover_img.style.positionY="0%"

	})
	reader.readAsDataURL(f)
}

 function setActiveNavLink(){
  const active_link=document.querySelector(`nav .t3-megamenu [href='${window.location.pathname.split('/').getLast()}']`).parentElement
  active_link.classList.add('current')
  active_link.classList.add('active')

  for (let i = 0; i < active_link.getParents().length; i++) {
    
    if(active_link.getParents()[i].tagName=="LI"){
      active_link.getParents()[i].classList.add('active')
      return
    }
  
  }
} 

 function removeActiveNavLink(){
  const active_link=document.querySelector(`nav .t3-megamenu li.current`)
  active_link.classList.remove('current')
  active_link.classList.remove('active')


  for (let i = 0; i < active_link.getParents().length; i++) {
    
    if(active_link.getParents()[i].tagName=="LI"){
      active_link.getParents()[i].classList.remove('active')
      return
    }
  
  }

} 
function savePageChanges() {

	   document.querySelector('#session').innerHTML=`
	 
		<?php if(isset($_SESSION['username'])):?>
				let _gagoo_=true	
		<?php else: ?>
				let _gagoo_=false	
		<?php endif; ?>
	   `

	   document.querySelector('._ed_add_and_select_page').classList.remove('delete')
	   document.querySelector('._ed_add_and_select_page').classList.remove('rename')
	   document.querySelector('._ed_add_and_select_page').classList.remove('new')

	       
		let active_navs=document.querySelectorAll('nav .active')
		for (let i = 0; i < active_navs.length; i++) {
			active_navs[i].classList.remove('active')
		}




 
	      try{change_slide_image('0')}catch(e){}

	      document.body.setAttribute('_ed_edit',false)
	      let isActive=false

	      if(document.body.getAttribute('_ed_active') == "true") {
            _ed_quit()
            isActive=true
	      }

	      try{
              removeActiveNavLink()
	      }catch(e){}
  
          const nav=encodeURIComponent(document.querySelector('nav').innerHTML)
		  const footer=encodeURIComponent(document.querySelector('footer').innerHTML)

          document.querySelectorAll('._news-container ._flex > div').forEach(e=>{
                 e.style.display="block"
          })

          let news=""

          if (document.querySelector('#update_news')) {

			  let news__data=""
			  document.querySelectorAll('._news-container ._flex > div._item').forEach((e,i)=>{
				  if(i <= 2){
					  news__data+=e.outerHTML
				  }
			  })

          	  document.querySelector('#update_news').contentDocument.querySelector('._news-container ._flex').innerHTML=news__data 
              news=`<!DOCTYPE html>
								<html prefix="og: http://ogp.me/ns#" lang="pt-pt" dir="ltr" class='com_sppagebuilder view-page itemid-686 j35 mm-hover'>
 								   ${document.querySelector('#update_news').contentDocument.html.innerHTML}
 			      </html>
		     `;
          }

          if (document.querySelector('._news-container ._flex') && document.querySelector('._news-container ._flex').getAttribute('last_news_count')) {
     
		      const num=parseFloat(document.querySelector('._news-container ._flex').getAttribute('last_news_count'))
		      document.querySelectorAll('._news-container ._flex > div').forEach((e,i)=>{
		             if (i >= num) {
		                e.style.display="none"
		             }else{
		                e.style.display="block"
		             }
		      })

           }

		  

           

            document.querySelectorAll('._publicacoes ._flex > ._div').forEach(e=>{

			   	    try{
						
				   	   	const id=e.getAttribute('_id')
				   	    const index=pub_news_data.findIndex(i=>i.id==id)
				   	    if (e.classList.contains('active')) {
							e.classList.remove('active')
							pub_news_data[index].content=e.outerHTML
							e.classList.add('active')
				   	    }else{
		                 	pub_news_data[index].content=e.outerHTML
				   	    }

			   	   }catch(err){
			   	   	   let id=e.getAttribute('_id')
					   if(!id) id=Math.random()
					   e.setAttribute('_id',id)
	                   pub_news_data.unshift({
	                   	   id,
	                   	   page:location.pathname.split('/')[location.pathname.split('/').length - 1],
	                   	   content:e.outerHTML 
	                   })
			   	   }

		     })

			 let tmp_painel=`${document.querySelector('.editing-painel').innerHTML}`

			 document.querySelector('._ed_add_and_select_page .pages').innerHTML=""
			 document.querySelector('.editing-painel').innerHTML=""


			 pub_news_data=pub_news_data.filter(u=>!pub_ids.includes(u.id.toString()))

             let tmp_pub
			 if(document.querySelector('._publicacoes ._flex')){
				tmp_pub=`${document.querySelector('._publicacoes ._flex').innerHTML}`
				document.querySelector('._publicacoes ._flex').innerHTML=` <div class="_loader"><div></div></div>`
			 }
			 
		     if(document.querySelector('.form-loader')) document.querySelector('.form-loader').style.display="none"
             const data=`
           <?php
	          session_start();
           ?>
           <!DOCTYPE html>
								<html prefix="og: http://ogp.me/ns#" lang="pt-pt" dir="ltr" class='com_sppagebuilder view-page itemid-686 j35 mm-hover'>
 								${document.html.innerHTML}
 								</html>
		     `;
			 
			 document.querySelector('.editing-painel').innerHTML=tmp_painel
			 if(document.querySelector('.form-loader')) document.querySelector('.form-loader').style.display="flex"
            
			  if(document.querySelector('._publicacoes ._flex')){
				document.querySelector('._publicacoes ._flex').innerHTML=tmp_pub
			 }
			
			 for (let i = 0; i < active_navs.length; i++) {
				active_navs[i].classList.add('active')
			 }

			try{
			    	 setActiveNavLink()
				} catch(e){}

				document.body.setAttribute('_ed_edit',true)
					if(isActive) {
		        _ed_init()
		    }


			console.log(pub_news_data)

			setTimeout(()=>{
				       
					    var _xml = new XMLHttpRequest();
						_xml.open("POST", "../../_server-side/write_all_news.php", false);
						_xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						_xml.send(`data=${encodeURIComponent(JSON.stringify(pub_news_data))}`);
						var _resp = _xml.responseText;

						var news_xml = new XMLHttpRequest();
						news_xml.open("POST", "../../_server-side/news_update.php", false);
						news_xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						news_xml.send(`news=${encodeURIComponent(news)}&newsfile=index.php`);
						var resp_news = news_xml.responseText;


						var xml = new XMLHttpRequest();
						xml.onreadystatechange = function() {
							if (xml.readyState === XMLHttpRequest.DONE) {
								if (xml.status === 200) {
									    if(document.querySelector('.form-loader')) document.querySelector('.form-loader').style.display="none"
										setTimeout(()=> alert('Página actualizada com sucesso!'),100)
						               
								} else {
									   if(document.querySelector('.form-loader')) document.querySelector('.form-loader').style.display="none"
						               setTimeout(()=> alert('Ocorreu um erro, tente novamente!'),100)
								}
							}
						};

						xml.open("POST", "../../_server-side/save_page.php", false);
						xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						let url=window.location.href.split('/')[window.location.href.split('/').length - 1]
						url=url.split('?')[0];
						xml.send(`filedata=${encodeURIComponent(data)}&filename=${url==""?"index.php":url}&nav=${nav}&footer=${footer}`);

			},1000)	
}
function getPages() {
			var xml = new XMLHttpRequest();
		    xml.open("POST", "../../_server-side/get_pages.php", false);
		    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		    xml.send(`getpages=true`);
			
		    var resp = xml.responseText.split('-----------');
		    
		    let pages=resp;
            
		    let htmlpages=[]

		    for (var i = 0; i < pages.length; i++) {

		    	if(pages[i]){
		    		if(pages[i].includes('.php')){
		    		htmlpages.push(pages[i])
		          }
		    	 }
		    	
		    	 
		    }
			document.querySelector('.form-loader').style.display="none"

		    Pages=htmlpages
		    return htmlpages
}

function _ed_change_img_toggle(e){
	const imgs=e.getAttribute('_ed_image_toggle').split(',')
	const current_img_index=imgs.indexOf(e.getAttribute('src'))
	
	if(current_img_index < imgs.length - 1){
      e.src=imgs[current_img_index+1]
	}else{
      e.src=imgs[0]
	}

}

function Clipboard(text){
     let clipboard=document.querySelector('#copy-to-clipboard')
     clipboard.value=text
     clipboard.select()
     document.execCommand('copy')
}

function _ed_add_new(item){
	const container=item.parentElement
	const div=document.createElement('div')
	div.className='_div _ed _ed_item'
	div.innerHTML=_ed_default_item_content['_ed_posts']
	div.setAttribute('_ed_model','_ed_model_option_2')
	div.setAttribute('_ed_default','_ed_posts')
	container.appendChild(div)
	document.querySelector('._publicacoes ._flex ._ed_add_new').classList.remove('active')
	_ed_quit()
	setTimeout(()=>_ed_init(),500)
}

function add_item_action(action,item) {
	if (action=='clone') {
		const container=item.parentElement.parentElement.parentElement
		const content=item.parentElement.parentElement
	    const div=content.cloneNode(true)
		if(div.getAttribute('_id') || container.parentElement.classList.contains('_publicacoes')) div.setAttribute('_id', Math.random())
		container.insertBefore(div,content)
		_ed_quit()
		setTimeout(()=>_ed_init(),500)
		
	}if(action=="add-heading") {
        const container=item.parentElement.parentElement.parentElement
		const content=item.parentElement.parentElement
		const h3=document.createElement('h3')
		h3.setAttribute('contenteditable','true')
	   	h3.setAttribute('spellcheck','false')
		h3.className="_ed _ed_item __sub-title left"
		h3.setAttribute("_ed_model","_ed_model_option_5")
		h3.innerHTML=`<div class="_ed _ed_top-options" contenteditable="false">           <span class="btn-move-left" onclick="add_item_action('move-left',this)"> <i class="fa-solid fa-arrow-up-long"></i></span>
		<span class="btn-move-right" onclick="add_item_action('move-right',this)"> <i class="fa-solid fa-arrow-down-long"></i></span> 
		<span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
		<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
        </div>Novo titulo`
		container.insertBefore(h3,content)
	}if(action=="add-text") {
		const content=item.parentElement.parentElement
		const p=document.createElement('p')
		p.setAttribute('contenteditable','true')
	   	p.setAttribute('spellcheck','false')
		p.className="_ed _ed_item"
		p.setAttribute("_ed_model","_ed_model_option_13")
		p.innerHTML=`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
		Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
		when an unknown printer took a galley of type and scrambled it to make a type
		specimen book.`

		
		if(content.querySelector('._content').childElementCount){
			content.querySelector('._content').insertBefore(p,content.querySelector('._content').childNodes[0])
			content.querySelector('._content').parentElement.classList.add('active')
		}else{
			content.querySelector('._content').appendChild(p)
		}
		_ed_quit()
		setTimeout(()=>_ed_init(),500)

	}else if(action=='remove'){

		const container=item.parentElement.parentElement.parentElement
		const content=item.parentElement.parentElement
		for (let i = 0; i < content.getParents().length; i++) {
			if(content.getParents()[i].classList.contains('_publicacoes')){
				pub_ids.push(content.getAttribute('_id'))
				console.log(document.querySelectorAll('._publicacoes ._flex ._div').length)
		
				try{
					if(document.querySelectorAll('._publicacoes ._flex ._div').length==1 && container.classList.contains('_flex')){
						document.querySelector('._publicacoes ._flex ._ed_add_new').classList.add('active')
					}
				}catch(e){}
			}
		}
        container.removeChild(content)

	}else if(action=='default'){
		const content=item.parentElement.parentElement
		content.innerHTML=_ed_default_item_content[content.getAttribute('_ed_default')]
		_ed_quit()
		setTimeout(()=>_ed_init(),500)

	}else if(action=='align-left'){
		const content=item.parentElement.parentElement
		content.style.textAlign="left"
	}else if(action=='align-center'){
		const content=item.parentElement.parentElement
		content.style.textAlign="center"
	}else if(action=='left'){
		const container=item.parentElement.parentElement.parentElement
		const content=item.parentElement.parentElement
	    const div=content.cloneNode(true)
		container.insertBefore(div,content)

	}else if(action=='right'){
		const content=item.parentElement.parentElement
		const div=content.cloneNode(true)
		content.insertAdjacentElement('afterend',div);

	}else if(action=='move-left'){
		const content=item.parentElement.parentElement
		const container=item.parentElement.parentElement.parentElement
		const div=content
		const previous_div=content.getPrevious()
		if (!previous_div) return
		container.removeChild(content)
		previous_div.insertAdjacentElement('beforebegin',div);
	}
	else if(action=='move-right'){
		const content=item.parentElement.parentElement
		const container=item.parentElement.parentElement.parentElement
		const div=content
		const next_div=content.getNext()
		if (!next_div) return

		container.removeChild(content)
		next_div.insertAdjacentElement('afterend',div);

	}else if(action=='youtube-link'){
		const frame=item.parentElement.getNext()
		const url=prompt('Insira um novo link')
		if(url) frame.src="https://www.youtube.com/embed/"+url.split('=')[url.split('=').length - 1]

	}else if(action=='social-link'){
		const content=item.parentElement.getNext()
		const url=prompt('Insira um novo link')
		if(url) content.href=url
	}else if(action=='pdf-link'){
		const content=item.parentElement.parentElement
		Clipboard(content.href)
	}else if(action=='a-link'){
		const content=item.parentElement
		const url=prompt('Insira um novo link')
		content.href=url
	}else if(action=='active-nav-link'){

		if(item.parentElement.parentElement.tagName=="A"){
        	item.parentElement.parentElement.classList.add('active')
           return	
        }

		document.querySelectorAll('nav .active').forEach(e=>{
			e.classList.remove('active')

		})

		item.parentElement.parentElement.classList.add('current')
		item.parentElement.parentElement.classList.add('active')
	}else if(action=='add-placeholder'){

	   const name=prompt('Inserir placeholder')

       item.parentElement.parentElement.childNodes[item.parentElement.parentElement.childNodes.length - 1].setAttribute('placeholder',name)

	}else if(action=='upload-doc'){
	   const content=item.parentElement.parentElement
	   changing_doc=content
	   document.querySelector('.upload_docs').click()
	}else if(action=='add-download-btn'){
		const a=document.createElement('a')
	    a.className="_ed _ed_item"
	    a.setAttribute('_ed_model','_ed_model_option_12')
	    a.href='#'
        a.innerHTML=`<div class="_ed _ed_top-options" contenteditable="false"> ${_ed_model_options['_ed_model_option_12']} </div> <button>Download</button>`

		if (item.parentElement.parentElement.classList.contains('_div')) {
			const c=item.parentElement.parentElement.querySelector('._content')
			c.parentElement.classList.add('active')
			if (!c.childElementCount) {
				c.appendChild(a)
			}else{
               c.insertBefore(a,c.childNodes[0])
			}
			changing_doc=a
			document.querySelector('.upload_docs').click()
            return

		}

	    const container=item.parentElement.parentElement.parentElement
		const content=item.parentElement.parentElement
		content.insertAdjacentElement('afterend',a);
		changing_doc=a
		document.querySelector('.upload_docs').click()

	}else if(action=='add-pub-img'){

		const div=document.createElement('div')
		div.className="_ed _ed_item"
		div.classList.add('selecting_img_div')
	    div.setAttribute('_ed_model','_ed_model_option_5')
		div.innerHTML=`<div class="_ed _ed_top-options" contenteditable="false"> ${_ed_model_options['_ed_model_option_5']} </div>`
		div.style.marginBottom='1rem'
	    const img=document.createElement('img')
		img.className='nesw-resize'
		img.setAttribute('onclick','resize_img(this)')
		img.style.width="40%"
		img.src='../../images/others/no_bg.png'
		div.appendChild(img)

		

       if (item.parentElement.parentElement.classList.contains('_div')) {
			const c=item.parentElement.parentElement.querySelector('._content')
			c.parentElement.classList.add('active')
			if (!c.childElementCount) {
               c.appendChild(div)
			}else{
			   c.insertBefore(div,c.childNodes[0])
			}

			changing_img=img
			document.querySelector('#change_image').click()
            return

		}

		const container=item.parentElement.parentElement.parentElement
		const content=item.parentElement.parentElement
		content.insertAdjacentElement('afterend',div);
		changing_img=img
		document.querySelector('#change_image').click()
	}

	document.querySelectorAll('a').forEach(e=>{
    	e.removeEventListener('click',link_action)
    })

	document.querySelectorAll('a').forEach(e=>{
    	e.addEventListener('click',link_action)
    })





	document.querySelectorAll('[contenteditable]').forEach(e=>{
		e.addEventListener('keyup',(k)=>{
			if(!e.textContent.trim()){
				const model=e.getAttribute('_ed_model')
				if (!model) return
				const div=document.createElement('div')
				div.className="_ed _ed_top-options"
				div.setAttribute('contenteditable','false')
				div.innerHTML=_ed_model_options[model] 
				e.innerHTML=`&nbsp;`
				e.insertBefore(div,e.childNodes[0])
				e.blur()
			}
		})
	})


}


const _ed_model_options={
	_ed_model_option_1:
	`           
	             <span class="btn-move-left" onclick="add_item_action('move-left',this)"> <i class="fa-solid fa-arrow-left-long"></i></span>
	             <span class="btn-move-right" onclick="add_item_action('move-right',this)"> <i class="fa-solid fa-arrow-right-long"></i></span> 
		 	 	 <span class="btn-add-left" onclick="add_item_action('left',this)"><i class="fa-solid fa-chevron-left"></i><i class="fa-solid fa-plus" style="font-size: 0.9rem"></i></span> 
		 	 	 <span class="btn-add-right" onclick="add_item_action('right',this)"><i class="fa-solid fa-plus" style="font-size: 0.9rem"></i><i class="fa-solid fa-chevron-right"></i></span> 
                 <span class="btn-new" onclick="add_item_action('default',this)"><i class="fa-regular fa-file"></i></span>
		 	 	 <span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
		 	 	 <span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
		 	 	 
	`,
	_ed_model_option_2:
	`            <span class="btn-move-left" onclick="add_item_action('add-text',this)"><i class='bx bx-text'></i></span>   
	             <span class="btn-move-left" onclick="add_item_action('add-pub-img',this)"><i class='bx bx-image-add'></i></span> 
				 <span class="btn-move-left" onclick="add_item_action('add-download-btn',this)"> <i class="fa-solid fa-download"></i></span>
	             <span class="btn-move-left" onclick="add_item_action('move-left',this)"> <i class="fa-solid fa-arrow-up-long"></i></span>
	             <span class="btn-move-right" onclick="add_item_action('move-right',this)"> <i class="fa-solid fa-arrow-down-long"></i></span> 
		 	 	 <span class="btn-add-up" onclick="add_item_action('left',this)"><i class="fa-solid fa-plus" style="font-size: 0.9rem"></i><i class="fa-solid fa-chevron-up"></i></span> 
		 	 	 <span class="btn-add-down" onclick="add_item_action('right',this)"><i class="fa-solid fa-plus" style="font-size: 0.9rem"></i><i class="fa-solid fa-chevron-down"></i></span> 
                 <span class="btn-new" onclick="add_item_action('default',this)"><i class="fa-regular fa-file"></i></span>
		 	 	 <span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
		 	 	 <span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
		 	 	 
	`,
	_ed_model_option_3:
	`
		 	 	 <span class="btn-add-youtube-link" onclick="add_item_action('youtube-link',this)"><i class="fa-solid fa-link"></i></span> 
		 	 	 
	`,
	_ed_model_option_4:
	`
		 	 	 <span class="btn-add-social-link" onclick="add_item_action('social-link',this)"><i class="fa-solid fa-link"></i></span> 
		 	 	 
	`,
	_ed_model_option_5:
	`           <span class="btn-move-left" onclick="add_item_action('align-left',this)"><i class="fa-solid fa-align-left"></i></span>
				<span class="btn-move-right" onclick="add_item_action('align-center',this)"><i class="fa-solid fa-align-center"></i></span>
				<span class="btn-move-left" onclick="add_item_action('move-left',this)"> <i class="fa-solid fa-arrow-up-long"></i></span>
	            <span class="btn-move-right" onclick="add_item_action('move-right',this)"> <i class="fa-solid fa-arrow-down-long"></i></span> 
				<span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
				<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span>
	`,
	
	_ed_model_option_5_1:

	`        
            	<span class="btn-remove" onclick="add_item_action('add-heading',this)"><i class='bx bx-heading'></i></span>    
            	<span class="btn-move-left" onclick="add_item_action('move-left',this)"> <i class="fa-solid fa-arrow-up-long"></i></span>
	            <span class="btn-move-right" onclick="add_item_action('move-right',this)"> <i class="fa-solid fa-arrow-down-long"></i></span> 
				<span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
				<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span>
				
				
		 	 	 
	`,
	_ed_model_option_6:
	`         
	            <span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
				<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
		 	 	 
	`,
	_ed_model_option_7:
	`        
	            <span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
				<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
		 	 	 
	`,
	_ed_model_option_8:
	`           <span class="btn-active-link" onclick="add_item_action('active-nav-link',this)"><i class="fa-regular fa-clone"></i></span>
		 	 	 
	`,
	_ed_model_option_9:
	`          <span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
		 	 	 
	`,
	_ed_model_option_10:
	`           <span class="btn-clone" onclick="add_item_action('add-placeholder',this)">P</span>   
	            <span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
				<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
		 	 	 
	`,
	_ed_model_option_11:
	`           	 <span class="btn-add-youtube-link" onclick="add_item_action('youtube-link',this)"><i class="fa-solid fa-link"></i></span> 
		 	 	      <span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
				<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
	`

,
	_ed_model_option_12:
	`   
	           <span class="btn-move-left" onclick="add_item_action('move-left',this)"> <i class="fa-solid fa-arrow-up-long"></i></span>
	             <span class="btn-move-right" onclick="add_item_action('move-right',this)"> <i class="fa-solid fa-arrow-down-long"></i></span> 
	          <span class="btn-add-social-link" onclick="add_item_action('pdf-link',this)"><i style="transform:scale(1.3);" class='bx bx-link-alt'></i></span> 
	            <span class="btn-move-left" onclick="add_item_action('upload-doc',this)"><i style="transform:scale(1.3);" class='bx bxs-file-plus'></i></span>
	            <span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span>
	`,
	_ed_model_option_13:
	`
	<span class="btn-move-left" onclick="add_item_action('align-left',this)"><i class="fa-solid fa-align-left"></i></span>
	<span class="btn-move-right" onclick="add_item_action('align-center',this)"><i class="fa-solid fa-align-center"></i></span>
				<span class="btn-move-left" onclick="add_item_action('add-download-btn',this)"> <i class="fa-solid fa-download"></i></span>
				<span class="btn-move-left" onclick="add_item_action('move-left',this)"> <i class="fa-solid fa-arrow-up-long"></i></span>
				<span class="btn-move-right" onclick="add_item_action('move-right',this)"> <i class="fa-solid fa-arrow-down-long"></i></span> 
				<span class="btn-clone" onclick="add_item_action('clone',this)"><i class="fa-regular fa-clone"></i></span>
				<span class="btn-remove" onclick="add_item_action('remove',this)"><i class="fa-solid fa-minus"></i></span> 
		 	 	 
	`
  
}


const _ed_default_item_content={
	_ed_news:`
              <div class="_ed _ed_top-options" contenteditable="false">           
	             ${_ed_model_options['_ed_model_option_1']}
	          </div>
	         
	          <div class="_image">
		 	 	 <span class="date" spellcheck="false" >00/00/00</span>
		 	 	 <img onclick="_ed_change_img(this)" src="../../images/noticias/default-img.jpg">
                  <span class="_image-size" _ed_show>358 X 240</span>
		 	 </div>
		 	 <div class="_text-content">
			 	<a href="index.php" class="title" _ed_editable  spellcheck="false">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        k</a>
			 	 <p _ed_editable  spellcheck="false">Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                   when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book..  </p>
			 	 <div class="read_more">
					<a href="index.php" _ed_editable  spellcheck="false">
									Ler Mais								
						<i class="fa fa-long-arrow-right"></i>
					</a>
				 </div>
		 	 </div>
	`,
	_ed_posts:`
             
	          <div class="_top" onclick="pub_show_more(this)">
				<div class="_pdf-icon"><img onclick="_ed_change_img_toggle(this)" _ed_image_toggle="../../images/_icons/newspaper.svg,../../images/_icons/pdf.svg" width="28px" height="28px"  src="../../images/_icons/pdf.svg"></div>
			 	<div class="_text">
					<h3 _ed_editable  spellcheck="false"> Lorem Ipsum is simply dummy text</h3>
					<span _ed_editable  spellcheck="false">Lorem Ipsum - 00/00/00</span>
			 	</div>
			 	<div class="_arrow"><i class="fas fa-chevron-down"></i></div>
		 	</div>
		 	<div class="_content">
		 		<p _ed_editable class="_ed _ed_item" _ed_model="_ed_model_option_13"  spellcheck="false">
				  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type
                  specimen book.
				 </p>
		 	</div>
	`
}


 

function _ed_add_models(action){
	if (action) {
	    document.querySelectorAll('._ed_item').forEach(item=>{

			for (let i = 0; i < item.getParents().length; i++) {
				if(item.getParents()[i].classList.contains('_ed_not_editable_c')) return
			}
			const model=item.getAttribute('_ed_model')

			if (!model) return

	        const div=document.createElement('div')
	        div.className="_ed _ed_top-options"
	        div.setAttribute('contenteditable','false')
	        div.innerHTML=_ed_model_options[model]
	        item.insertBefore(div,item.childNodes[0])
		})

	}else{
       document.querySelectorAll('._ed_item').forEach(item=>{
		
		      try{
		        if(item.childNodes[0].classList.contains('_ed_top-options')) item.removeChild(item.childNodes[0])
		      }catch(e){}
		  
			
		})
	}
	
}




function _ed_add_editable(action){



	if (action) {
	    document.querySelectorAll('[_ed_editable]').forEach(e=>{
			
			for (let i = 0; i < e.getParents().length; i++) {
				if(e.getParents()[i].classList.contains('_ed_not_editable_c')) return
			}

	   	   e.setAttribute('contenteditable','true')
	   	   e.setAttribute('spellcheck','false')

	    })
		document.querySelectorAll('[_ed_style]').forEach(e=>{
				for (let i = 0; i <e.getAttribute('_ed_style').split(',').length; i++) {
					const styles=e.getAttribute('_ed_style').split(',')[i].split(':')
					e.style[styles[0]]=styles[1]
				}
		})
   
    }else{
       document.querySelectorAll('[_ed_editable]').forEach(e=>{
	   	   e.removeAttribute('contenteditable')
	   	   e.removeAttribute('spellcheck')
	   })
	   document.querySelector('.top-header').style.marginTop="0"

		document.querySelectorAll('[_ed_style]').forEach(e=>{
			e.setAttribute('style','disply:none')
		})
	   
    }
}





function _ed_init() {

	 return
	  edit_mode=true
      _ed_add_models(true)
      _ed_add_editable(true)
      document.querySelectorAll('[_ed_editable]').forEach(e=>{
      	e.onfocus=()=>{
      			last_clicked_element=e
      	}
      })


    document.querySelectorAll('a').forEach(e=>{
    	e.addEventListener('click',link_action)
    })

	document.querySelectorAll('[contenteditable]').forEach(e=>{
		e.addEventListener('keyup',(k)=>{

			if(!e.textContent.trim()){
				const model=e.getAttribute('_ed_model')
				if (!model) return
				const div=document.createElement('div')
				div.className="_ed _ed_top-options"
				div.setAttribute('contenteditable','false')
				div.innerHTML=_ed_model_options[model] 
				e.innerHTML=`&nbsp;`
				e.insertBefore(div,e.childNodes[0])
				e.blur()
			}
		})
	})

   document.body.setAttribute('_ed_active',true)     

}


function link_action(event){

	  return
	  
	  let e=event.target


	  try{ 
	      if(!e.parentElement.parentElement.parentElement){
			event.preventDefault();
			return
		  }
	  }catch(e){
		event.preventDefault();
		return
	  }
	  

	  
	 
	  if ((e.parentElement.parentElement.classList.contains('links') ||
	   e.parentElement.classList.contains('sub-menu') ||
		e.parentElement.parentElement.classList.contains('sub-menu') ||
		 e.parentElement.parentElement.parentElement.classList.contains('sub-menu')) && 
		 document.body.getAttribute('_ed_active') == "false" && _gagoo_==true && document.location.href.split('?').includes('_ed_active')) {
	      		      	event.preventDefault();
	                   window.location.href=e.href+"?_ed_active"
	  }


	 let to_edit=false
	 for (let i = 0; i < e.getParents().length; i++) {
		if(e.getParents()[i].classList.contains('_news-container')) to_edit=true
	 }

	
	 if(to_edit && document.body.getAttribute('_ed_active')=="false"){
		 event.preventDefault()
		 let to_url=e.href?e.href:e.parentElement.href 
		 window.location.href=to_url+"?_ed_active"
	  }
	 

	if(document.body.getAttribute('_ed_active')!="true"){
	    return
	}

	event.preventDefault();
}


function _ed_quit() {
	 edit_mode=false
	 document.body.setAttribute('_ed_active',false)
	 _ed_add_models(false)
   _ed_add_editable(false)
}







function startMainSlide() {
    document.querySelector('._main_silder_editing_painel').style.display="flex"
    const slider=document.querySelector('._main_silder_editing_painel .slides')
    const images_preview=document.querySelector('._main_silder_editing_painel .images')
    slider.innerHTML=""
    images_preview.innerHTML=""

     const mainSliderImages=document.querySelectorAll('._main-slider ._slide').forEach((e,i)=>{
      if(i == document.querySelectorAll('._main-slider ._slide').length - 1) return
      const id=Math.random()	
      const div1=document.createElement('div')
      div1.setAttribute('id',id)
      div1.className="slide"
      div1.setAttribute('ondblclick',`_change_slider_img(${id})`)
      div1.style.backgroundImage=window.getComputedStyle(e).backgroundImage
      slider.appendChild(div1)
      const div2=document.createElement('div')
      div2.setAttribute('id',id)
      div2.innerHTML=`
      <div class="bg" onclick="moveMainSlider(${id},true)" ondblclick="_change_slider_img(${id})"></div>
      <div class="options">
                 <span class="btn-move-left" onclick="_ed_main_slider_action('move-left',this,${id})"> <i class="fa-solid fa-arrow-left-long"></i></span>
	             <span class="btn-move-right" onclick="_ed_main_slider_action('move-right',this,${id})"> <i class="fa-solid fa-arrow-right-long"></i></span> 

		 	 	 
      </div>`
      div2.style.backgroundImage=window.getComputedStyle(e).backgroundImage
      images_preview.appendChild(div2)

    })

    slider.style.width=`${(slider.childElementCount) * 100}%`
   // images_preview.innerHTML+=`<div class="new" onclick="document.querySelector('#add_slider_image').click()"><i class="fa-solid fa-plus"></i></div>`
}





function moveMainSlider(v,to){

                   
	if (to) {
		document.querySelectorAll(`._main_silder_editing_painel .slides .slide`).forEach((e,i)=>{
			if (e.getAttribute('id') == v) {
				v=i
			}
			
		})
	}

	

    const slider=document.querySelector('._main_silder_editing_painel .slides')
    let marginLeft=to ? (-v * document.querySelector('._main_silder_editing_painel .slider').clientWidth) : parseInt(window.getComputedStyle(slider).marginLeft) + (v * document.querySelector('._main_silder_editing_painel .slider').clientWidth)
    if(marginLeft >= 0){
      document.querySelector('._main_silder_editing_painel .navigation .left span').classList.remove('active')
    }else{
      document.querySelector('._main_silder_editing_painel .navigation .left span').classList.add('active')
    }

    if(-marginLeft >= document.querySelector('._main_silder_editing_painel .slider').clientWidth * (document.querySelector('._main_silder_editing_painel .slides').childElementCount - 1)){
      document.querySelector('._main_silder_editing_painel .navigation .right span').classList.remove('active')
    }else{
      document.querySelector('._main_silder_editing_painel .navigation .right span').classList.add('active')
    }




    slider.style.marginLeft=`${marginLeft}px` 
}



function add_slider_image(){
    const file=document.querySelector('#add_slider_image')
	const f=file.files[0]
	const reader=new FileReader()
	reader.addEventListener('load',()=>{
	  const images_preview=document.querySelector('._main_silder_editing_painel .images')
	  const id=Math.random()
      const div=document.createElement('div')
      div.innerHTML=`
       <div class="bg" onclick="moveMainSlider(${id},true)" ondblclick="_change_slider_img(${id})"></div>
       <div class="options">
                 <span class="btn-move-left" onclick="_ed_main_slider_action('move-left',this,${id})"> <i class="fa-solid fa-arrow-left-long"></i></span>
	             <span class="btn-move-right" onclick="_ed_main_slider_action('move-right',this,${id})"> <i class="fa-solid fa-arrow-right-long"></i></span> 
 
      </div>`
      div.style.backgroundImage=`url(${reader.result})`
      images_preview.insertBefore(div,images_preview.childNodes[images_preview.childElementCount - 1])

      const slider=document.querySelector('._main_silder_editing_painel .slides')
      const div1=document.createElement('div')
      div1.setAttribute('id',id)
      div1.className="slide"
      div1.style.backgroundImage=`url(${reader.result})`
      slider.appendChild(div1)
      slider.style.width=`${(slider.childElementCount) * 100}%`
  
	  
	})
	reader.readAsDataURL(f)
	file.value=""
}


function _ed_main_slider_action(action,item,id){
	if(action=='move-left'){
		const content=item.parentElement.parentElement
		const container=item.parentElement.parentElement.parentElement
		const div=content
		const previous_div=content.getPrevious()
		const slide=document.querySelector(`._main_silder_editing_painel .slides [id='${id}']`)
		const slider=document.querySelector(`._main_silder_editing_painel .slides`)
		const div2=slide
		const previous_div2=slide.getPrevious()
		if (!previous_div) return
			
		container.removeChild(content)
	    slider.removeChild(slide)
		previous_div.insertAdjacentElement('beforebegin',div);
		previous_div2.insertAdjacentElement('beforebegin',div2);

	}
	else if(action=='move-right'){
		const content=item.parentElement.parentElement
		const container=item.parentElement.parentElement.parentElement
		const div=content
		const next_div=content.getNext()
		const slide=document.querySelector(`._main_silder_editing_painel .slides [id='${id}']`)
		const slider=document.querySelector(`._main_silder_editing_painel .slides`)
		const div2=slide
		const next_div2=slide.getNext()
		if (!next_div || next_div?.classList.contains('new')) return

		container.removeChild(content)
     	slider.removeChild(slide)
		next_div.insertAdjacentElement('afterend',div);
		next_div2.insertAdjacentElement('afterend',div2);

	}else if(action=='remove'){
		document.querySelectorAll(`._main_silder_editing_painel .slides .slide`).forEach((e,i)=>{
			if (e.getAttribute('id') == id) {
				let Id
                const slider=document.querySelector('._main_silder_editing_painel .slides')
                const previous_div=e.getPrevious()
                const next_div=e.getNext()
                if(previous_div){
                    Id=previous_div.getAttribute('id') 
                }else if(next_div){
                    Id=next_div.getAttribute('id')
                }

               
                e.parentElement.removeChild(e)
                slider.style.width=`${(slider.childElementCount) * 100}%`
                if(!next_div && !previous_div){
                  document.querySelector('._main_silder_editing_painel .navigation .left span').classList.remove('active')
                  document.querySelector('._main_silder_editing_painel .navigation .right span').classList.remove('active')
                  return
                }
                moveMainSlider(Id,true)
                
			}
			
		})
		const container=item.parentElement.parentElement.parentElement
		const content=item.parentElement.parentElement
        container.removeChild(content)

	}
}






function _change_slider_img(id){
	let images=document.querySelectorAll(`._main_silder_editing_painel [id='${id}']`)
	__changing_images=images

	document.querySelector('#change_slider_image').click()

}

function change_slider_image() {

    /*	const file=document.querySelector('#change_slider_image')
	const f=file.files[0]
	const reader=new FileReader()
	reader.addEventListener('load',()=>{

	 for(let i=0;i<__changing_images.length;i++){
	 	__changing_images[i].style.backgroundImage=`url(${reader.result})`
	 }

	})
	reader.readAsDataURL(f)

	file.value=""*/

	document.querySelector('.form-loader').style.display="flex"

	

	setTimeout(()=>{
	   var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					for(let i=0;i<__changing_images.length;i++){
						//let new_url=document.querySelector("#change_slider_image").files[0].name
						//new_url=new_url.split(' ').join('%20')
						__changing_images[i].style.backgroundImage=`url(uploaded_imgs/${xhr.responseText})`
					}
					document.querySelector('.form-loader').style.display="none"
				} else {
					document.querySelector('.form-loader').style.display="none"
					setTimeout(()=>{
						alert('Ocorreu um erro, tente novamente!')
					},200)
				}
			}
		};
	
		xhr.open('POST','server/upload-img.php',true);
		var formData = new FormData();
		document.querySelector("#change_slider_image").files[0].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		console.log(formData)
		formData.append("upload", document.querySelector("#change_slider_image").files[0]);
		xhr.send(formData);

	},200)
}


let changing_doc

function upload_docs_(url){

 document.querySelector('.upload_doc_form').addEventListener('submit',e=>{

	e.preventDefault()

	document.querySelector('.form-loader').style.display="flex"

	

    setTimeout(()=>{
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					changing_doc.href=`documentos-media/${document.querySelector(".upload_docs").files[0].name}`
					document.querySelector('.form-loader').style.display="none"
				} else {
					document.querySelector('.form-loader').style.display="none"
					setTimeout(()=>{
						alert('Ocorreu um erro, tente novamente!')
					},200)
				}
			}
		}
	
		xhr.open('POST','server/upload-docs.php',true);
		var formData = new FormData();
		document.querySelector(".upload_docs").files[0].name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		console.log(document.querySelector(".upload_docs").files[0].name)
		formData.append("upload", document.querySelector(".upload_docs").files[0]);
		xhr.send(formData);
	},200)
	

   })

   document.querySelector('.upload_docs').getNext().click()


}









function saveMainSlider(){
    const mainSlider=document.querySelector('._main-slider ._slides')
    mainSlider.innerHTML=""
    const _ed_slides=document.querySelectorAll(`._main_silder_editing_painel .slides .slide`)
	_ed_slides.forEach((e,i)=>{
        const div=document.createElement('div')
        div.className="_slide"
        div.style.backgroundImage=window.getComputedStyle(e).backgroundImage

		if(i==0){
			div.className="_slide aba"
			div.innerHTML=`
				<div class="_text">Abastecimento <span>de Água</span></div>
			    <div class="_text">Abastecimento</div>
			`
		}else if(i==1){
			div.className="_slide san"
			div.innerHTML=`
				<div class="_text">Saneamento</div>
			    <div class="_text">Saneamento</div>
			`
		}

		

		mainSlider.appendChild(div)

    })


     const div=document.createElement('div')
     div.className="_slide"
     div.style.backgroundImage=window.getComputedStyle(mainSlider.childNodes[0]).backgroundImage
     div.innerHTML=mainSlider.childNodes[0].innerHTML
     mainSlider.appendChild(div)

     document.querySelector('._main_silder_editing_painel').style.display='none'
  
}




function _ed_main_silde_img_p(action){
	let index
	const btns=document.querySelectorAll('._dnnas-desc ._navigation span').forEach((e,i)=>{
         if (e.classList.contains('active')) {
         	index=i
         }
         
	})


	 document.querySelectorAll('._main-slider ._slides ._slide')[index].style.backgroundPosition=action
}




function _ed_show_hide_(){



  if (document.querySelector('._ed_show_hide_').classList.contains('_hidden')) {
     document.body.setAttribute('_ed_active',true)
     _ed_init()
  }else{
     document.body.setAttribute('_ed_active',false)
     _ed_quit()
  }	
  document.querySelector('._ed_show_hide_').classList.toggle('_hidden')
}

function _ed_add_and_select_page_search(value){
         const boxContainer=document.querySelector('._ed_add_and_select_page .box .pages')
         const pages=Pages.filter(item=>item.toLowerCase().includes(value.toLowerCase()))
         boxContainer.innerHTML=""
         for (var i = 0; i < pages.length; i++) {
	        boxContainer.innerHTML+=`
         	<div class="page"><div class="bg" onclick="_ed_add_and_select_page('go-to','${pages[i]}')"></div><span class="name">${pages[i]}</span><div class="right"><div class="btns"><span class="btn-clone" onclick="_ed_add_and_select_page('copy-link',this)"><i  class="fa-solid fa-link"></i></span>
			  	<span class="btn-remove" onclick="_ed_add_and_select_page('clone',this.parentElement.parentElement.parentElement)"><i class="fa-regular fa-clone"></i></span> 
		    	</div></div></div>
         	`
         }
}

const pageSettings={
	clone:""
}

function _ed_add_and_select_page(action,item){
	const container=document.querySelector('._ed_add_and_select_page')
	const boxContainer=document.querySelector('._ed_add_and_select_page .box .pages')
	if (action=="remove") {
         container.classList.remove('new')
		 container.classList.remove('delete')
		 container.classList.remove('rename')
         container.style.display='none'
         document.querySelector('._ed_add_and_select_page .clone input').value=""
          document.querySelector('._ed_add_and_select_page .box input').value=""
    }else if (action=="show") {
		document.querySelector('.form-loader').style.display="flex"

         setTimeout(()=>{
			container.style.display='block'
			boxContainer.innerHTML=""
			let pages=getPages()
			for (var i = 0; i < pages.length; i++) {
				boxContainer.innerHTML+=`
				<div class="page"><div class="bg" onclick="_ed_add_and_select_page('go-to','${pages[i]}')"></div><span class="name">${pages[i]}</span><div class="right"><div class="btns"><span class="btn-clone" onclick="_ed_add_and_select_page('copy-link',this)"><i  class="fa-solid fa-link"></i></span>
					<span class="btn-remove" onclick="_ed_add_and_select_page('clone',this.parentElement.parentElement.parentElement)"><i class="fa-regular fa-clone"></i></span> 
				</div></div></div>
				`
			}
		 },200)

    }else if (action=="clone") {
         container.classList.add('new')
         container.style.display='block'
         document.querySelector('._ed_add_and_select_page .clone .title').innerHTML=`<font color="#3b70b6">Replicar</font>:&nbsp;`+item.childNodes[1].innerHTML
         pageSettings.clone=item.childNodes[1].innerHTML

    }else if (action=="delete") {
		let current_name=document.location.href.split('?')[0].split('/')[document.location.href.split('?')[0].split('/').length - 1].split('.')[0]
		if(!current_name || current_name=="index") {
			alert('Esta página não pode ser eliminada')
			return
		}
		container.classList.add('delete')
		container.style.display='block'

   }else if (action=="rename") {
     	getPages()
	    let current_name=document.location.href.split('?')[0].split('/')[document.location.href.split('?')[0].split('/').length - 1].split('.')[0]
		document.querySelector('._ed_add_and_select_page .rename .title').innerHTML=`<font color="#3b70b6">Renomear</font>:&nbsp;`+current_name
		if(!current_name || current_name=="index") {
			alert('Esta página não pode ser renomeada')
			return
		}
		document.querySelector('.rename_page_input').value=current_name
		container.classList.add('rename')
		container.style.display='block'

  }else if (action=="go-back") {
         container.classList.remove('new')
         container.style.display='block'
         document.querySelector('._ed_add_and_select_page .clone input').value=""
    }else if (action=="create") {
    	 const value=document.querySelector('._ed_add_and_select_page .clone input').value
    	 pageSettings.new=value
         document.querySelector('._ed_add_and_select_page .loader').classList.add('loading')
		 setTimeout(()=> _ed_add_and_select_page_create(),200)
        

    }else if (action=="delete_page") {
		
		if(document.querySelector('.confirm_delete').value=="confirmar"){

			container.classList.remove('delete')
			document.querySelector('.form-loader').style.display="flex"
            container.style.display='none'

			let current_name=document.location.href.split('?')[0].split('/')[document.location.href.split('?')[0].split('/').length - 1].split('.')[0]
			
			setTimeout(()=>{
			            var xml = new XMLHttpRequest();
						xml.open("POST", "../../_server-side/delete_file.php", false);
						xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xml.send(`filename=${current_name}.php`);
						var resp=xml.responseText;

						if(resp){
							
							document.querySelector('.form-loader').style.display="none"
							setTimeout(()=>alert('Página eliminada!'),300)
							setTimeout(()=>document.location.href="index.php?_ed_active",2000)
						}else{
							document.querySelector('.form-loader').style.display="none"
							setTimeout(()=>alert('Erro ao eliminar a página, tente novamente!'),300)
						}
					},200)
		}
		
		return
		

   }else if (action=="rename_page") {
		
	if(canRaname){

		container.classList.remove('rename')
		document.querySelector('.form-loader').style.display="flex"
		container.style.display='none'

		let current_name=document.location.href.split('?')[0].split('/')[document.location.href.split('?')[0].split('/').length - 1].split('.')[0]
		

					setTimeout(()=>{
							var xml = new XMLHttpRequest();
						xml.open("POST", "../../_server-side/rename_file.php", false);
						xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
						xml.send(`old=${current_name}.php&new=${document.querySelector('.rename_page_input').value+".php"}`);
						var resp=xml.responseText;

						if(resp){
							document.querySelector('.form-loader').style.display="none"
							setTimeout(()=>alert('Página renomeada!'),300)
							setTimeout(()=>document.location.href=`${document.querySelector('.rename_page_input').value}.php?_ed_active`,2000)
						}else{
							document.querySelector('.form-loader').style.display="none"
							setTimeout(()=>alert('Erro ao renomear a página, tente novamente!'),300)
						}
					},200)

	}
	
	return

}else if (action=="go-to") {
    	console.log(item)
    	window.location.href=item+"?_ed_active"

    }else if (action=="copy-link") {
    	
    const text=item.parentElement.parentElement.parentElement.childNodes[1].innerHTML
		 

     
     Clipboard(text)


	container.style.display='none'
    _ed_add_and_select_page_search('')
    }


}


/* let text = document.getElementById('myText').innerHTML;


  */

 function _ed_add_and_select_page_create(){
            var xml = new XMLHttpRequest();
		    xml.open("POST", "../../_server-side/get_page_content.php", false);
 		    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		    xml.send(`filename=${pageSettings.clone}`);
		    var resp = xml.responseText;
		    let content=""
            lines=JSON.parse(resp)

            for (var i = 0; i < lines.length; i++) {
            	if(lines[i]!="\r\n"){
            		content+=lines[i]

            	}
            	
            }

             _ed_create_new_file(content)

     
		    
 }

 function  _ed_create_new_file(content){

            var xml = new XMLHttpRequest();
		    xml.open("POST", "../../_server-side/create_new.php", false);
		    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		    xml.send(`data=${encodeURIComponent(content)}&filename=${pageSettings.new}`);
		    var resp = xml.responseText;
		    getPages()
		    
		    document.querySelector('._ed_add_and_select_page .loader').classList.remove('loading')
            document.querySelector('._ed_add_and_select_page .clone input').value=""
            _ed_add_and_select_page_search(pageSettings.new+".php")
            document.querySelector('._ed_add_and_select_page').classList.remove('new')
            document.querySelector('._ed_add_and_select_page .box input').value=pageSettings.new+".php"

	        const text=pageSettings.new+".php"

            Clipboard(text)
            alert('Página criada com sucesso!')

		    
 }

 window.addEventListener('mouseover',()=>{
	
 })

 function change_page_title(){
	let new_title=prompt('Alterar o título da página',document.title)
	document.title=new_title ? new_title : document.title
 }

 function confirm_delete(){
     if(document.querySelector('.confirm_delete').value=="confirmar"){
		document.querySelector('.delete_btn').classList.add('go')
	 }else{
		document.querySelector('.delete_btn').classList.remove('go')
	 }
 }

 let canRaname=false
 function rename_page_check(){
	let current_name=document.location.href.split('?')[0].split('/')[document.location.href.split('?')[0].split('/').length - 1].split('.')[0]
	Pages=Pages.filter(p=>p!=current_name+".php")
	if(Pages.includes(document.querySelector('.rename_page_input').value+".php")){
		document.querySelector('.rename_btn').classList.remove('go')
		document.querySelector('.rename_res').innerHTML="Arquivo já existe!"
		canRaname=false

	 }else if(!document.querySelector('.rename_page_input').value){
		document.querySelector('.rename_btn').classList.remove('go')
		document.querySelector('.rename_res').innerHTML="Campo não deve estar vazio!"
		canRaname=false

	 }else{

		document.querySelector('.rename_btn').classList.add('go')
		document.querySelector('.rename_res').innerHTML=""
		canRaname=true
	 }
 }


const _ed_items=[{class:'editing-painel'  ,content:`
        <input type="text" id="copy-to-clipboard" style="position: absolute;pointer-events: none;opacity: 0;">
    	<div hidden="true">
    		<input type="file" name="file" id="change_image" oninput="change_image()" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*">
    		<input type="file" name="file" id="add_slider_image"  oninput="add_slider_image()" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*">
    		<input type="file" name="file" id="change_slider_image"  oninput="change_slider_image()" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*">
    		<input type="file" name="file" id="change_hover_image"  oninput=" change_hover_image()" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*">
    		<input type="file" name="file" id="_ed_change_gallery_image" oninput="_ed_change_gallery_image()" accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*">
			<form  class="upload_doc_form">
				<input type="file" name="_image" class="upload_docs" oninput="upload_docs_()" accept=".pdf, .xls, .xlsx, .docx, .doc, .pptx, .ppt">
                <input type="submit" name="send">
			</form>
			
    	</div>
     
   	  <div class="btn-toolbar">
				<button onclick="formatDoc('undo')"><i class='bx bx-undo' ></i></button>
				<button onclick="formatDoc('redo')"><i class='bx bx-redo' ></i></button>
				<button onclick="formatDoc('bold')"><i class='bx bx-bold'></i></button>
				<button onclick="formatDoc('underline')"><i class='bx bx-underline' ></i></button>
				<button onclick="formatDoc('italic')"><i class='bx bx-italic' ></i></button>
				<button onclick="formatDoc('strikeThrough')"><i class='bx bx-strikethrough' ></i></button>
				<button onclick="addLink()"><i class='bx bx-link' ></i></button>
				<button onclick="formatDoc('unlink')"><i class='bx bx-unlink' ></i></button>
				<!--<button onclick="formatDoc('fontName','Open Sans')"><i class='bx bx-font'></i></button>-->
				<div class="color">
					<span>Cor</span>
					<input type="color" oninput="formatDoc('foreColor', this.value); this.value='#000000';">
				</div>
				<div class="color">
					<span>Cor de fundo</span>
					<input type="color" oninput="formatDoc('hiliteColor', this.value); this.value='#000000';">
				</div>
				<button onclick="_ed_add_and_select_page('show')">Páginas</button>
				<button class="p" onclick="change_page_title()">Título</button>
				<button class="p" onclick="_ed_add_and_select_page('delete')">Eliminar</button>
				<button class="p" onclick="_ed_add_and_select_page('rename')">Renomear</button>
				<button onclick="_ed_show_hide_()" class="_ed_show_hide_">
					<span class="_show"><i class='bx bx-show'></i></span>
					<span class="_hide"><i class='bx bx-hide'></i></span>
				</button>
				<button onclick="savePageChanges()">Salvar</button>
		
		</div>`},
		{class:`_ed_add_and_select_page`,content:`<div class="container">
		<div class="bg" onclick="_ed_add_and_select_page('remove')"></div>
		<div class="clone">
			<span class="go-back"  onclick="_ed_add_and_select_page('go-back')">Voltar</span>
			<div class="title"></div>
			<div class="input-section">
				<input type="text" name="" placeholder="Nome da página">
				<button onclick="_ed_add_and_select_page('create')" ><div class="loader"><span></span></div>Criar</button>
			</div>
		</div>

		<div class="rename">
			    <div class="title">Renomear</div>
			    <div class="input-section">
				<input type="text" name="" oninput="rename_page_check()" class="rename_page_input" placeholder="Novo nome da página">
				<button class="rename_btn" onclick="_ed_add_and_select_page('rename_page')" ><div class="loader"><span></span></div>Alterar</button>
			    </div>
				<label class="rename_res"></label>
		</div>
		<div class="delete">
			<div class="title">Digite &nbsp;<font color="#3b70b6">confirmar</font>  &nbsp; para eliminar a página</div>
			<div class="input-section">
				<input type="text" oninput="confirm_delete()" class="confirm_delete">
				<button class="delete_btn" onclick="_ed_add_and_select_page('delete_page')"><div class="loader"><span></span></div>Eliminar</button>
			</div>
		</div>

		<div class="box">
			<span class="title">Páginas</span>
			<div class="input-section">
				<input type="text" name="" placeholder="Pesquisar página" oninput=" _ed_add_and_select_page_search(this.value)">
			</div>
			<div class="pages">
			
			</div>
		</div>
	</div>`},
	{class:'_main_silder_editing_painel',content:`<div class="bg"></div>

	<div class="container">
		<div class="top-options"><span onclick="document.querySelector('._main_silder_editing_painel').style.display='none'">Cancelar</span><span onclick="saveMainSlider()">Salvar</span></div>
		<div class="slider">
			<div class="slides">
				
				<div class="slide">
					
				</div>
			</div>
			<div class="navigation">
				<div class="left"><span onclick="moveMainSlider(1)"><i class="fa-solid fa-chevron-left"></i></span></div>
				<div class="right"><span class="active" onclick="moveMainSlider(-1)"><i class="fa-solid fa-chevron-right"></i></span></div>
			</div>
		</div>
		<div class="images">
			<div class="new"></div>
		</div>
	</div>`}]

for (var i = 0; i < _ed_items.length; i++) {
	 document.querySelector(`.${_ed_items[i].class}`).innerHTML=_ed_items[i].content  
}

function _silde_img_position_range(value,input) {

    if(input=="l_r"){
    	document.querySelectorAll('._main-slider ._slides > div')[index_s].style.backgroundPositionX=`${value}%`
    	console.log(document.querySelectorAll('._main-slider ._slides > div')[index_s])
    }else{
    	document.querySelectorAll('._main-slider ._slides > div')[index_s].style.backgroundPositionY=`${value}%`
    }

}

function resize_img(img){
		if(document.body.getAttribute('_ed_edit')!="true") {
			return
		}
	 const container = img
	 const image = img

	 initialX = event.clientX;
	 initialY = event.clientY;
	 initialWidth = container.clientWidth;
	 initialHeight = container.clientHeight;
	
	 function handleMouseDown(event) {
		event.preventDefault();
		initialX = event.clientX;
		initialY = event.clientY;
		initialWidth = container.clientWidth;
		initialHeight = container.clientHeight;
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleMouseUp);
	}

	function handleMouseMove(event) {
			event.preventDefault();
			const deltaX = event.clientX - initialX;
			const deltaY = event.clientY - initialY;
			const newWidth = initialWidth + deltaX;
			const newHeight = initialHeight + deltaY;
			container.style.width = newWidth + "px";
			container.style.height = newHeight + "px";
	 }

	 function handleMouseUp() {
		document.removeEventListener("mousemove", handleMouseMove);
		document.removeEventListener("mouseup", handleMouseUp);
	 }
	 container.addEventListener("mousedown", handleMouseDown);
}
















