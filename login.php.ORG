

<?php
	      session_start();
?>

<!DOCTYPE html>
<html>
<head>
	<title>DNAAS - ADMININSTRATOR</title>
	<meta charset="UTF-8">
	<style type="text/css">
		*{
			padding: 0;
			margin:0;
			box-sizing: border-box;
		}
        .container{
        	width: 100%;
        	height: 100vh;
        	display: flex;
        	justify-content: center;
        	align-items: center;
        }

        .container .box{
        	width: 280px;
        	box-shadow:0 5px 10px rgba(0,0,0,0.07);
        	border-radius: 0.4rem;
        	padding: 2rem 1rem;
        }

         .container .box input{
         	display: block;
         	width: 100%;
         	height: 45px;
         	border: 1px solid #eee;
         	border-bottom: 2px solid #eee;
         	border-bottom: 2px solid #3b70b6;
         	border-radius: 0.4rem;
         	margin-bottom: 0.6rem;
         	padding: 0 0.5rem;
         	outline: none;

         }

         .container .box button{
         	display: block;
         	width: 100%;
         	height: 45px;
         	border: 1px solid #eee;
         	border-bottom: 2px solid #eee;
         	margin-bottom: 2 solid #3b70b6;
         	border-radius: 0.4rem;
         	background: #eee;
         	cursor: pointer;
         	outline: none;
         	opacity: .5;
         }

         .container .box button.active{
         	background:  #3b70b6;
         	transition: 0.1s;
         	color: #fff;
         	opacity: 1;
         }


         .container .box span{
         	font-size: 1.4rem;
         	margin-bottom: 0.9rem;
         	display: block;
         	font-weight: 500;
         }

		 .form-loader{
			width: 100%;
			height: 100vh;
			background: rgba(0,0,0,0.5);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999999;
			display: flex;
			justify-content: center;
			align-items: center;
			}
			.form-loader .loader-c{
			padding: 2rem;
			background: #fff;
			border-radius: 0.4rem;
			}

			.form-loader .loader{
			border: 3px solid #f3f3f3;
			border-top: 3px solid #3498db;
			border-radius: 50%;
			width: 24px;
			height: 24px;
			animation: spin2 1.5s linear infinite;
			}
			@keyframes spin2 {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
			}
			

	</style>
</head>

<body>
	<div class="form-loader" style="display: none;">
		<div class="loader-c">
			<div class="loader">
				
			</div>
		</div>
	</div>  
   <div class="container">
   	    <div class="box">
   	    	<span>Login</span>
			<input type="text"  placeholder="Usuário" name="username">
   	    	<input type="password"  placeholder="Senha"  name="password">
   	    	<button>Entrar</button>
   	    </div>
   </div>

   <script type="text/javascript">

	  function check_inputs() {
		if(document.querySelector('input[name=password]').value && document.querySelector('input[name=username]').value){
                document.querySelector('button').classList.add('active')
   	   	   }else{
                document.querySelector('button').classList.remove('active')
   	   	   }
	  }

	document.querySelectorAll('input').forEach(e=>{
			e.addEventListener('input',()=>{
				check_inputs()
			})
	})

	document.querySelector('button').addEventListener('click',()=>{
			login()
	})

		function login(){
			document.querySelector('.form-loader').style.display="flex"
			setTimeout(() => {
				var xml = new XMLHttpRequest();
				xml.open("POST", "./login-verify.php", false);
				xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xml.send(`username=${document.querySelector('input[name=username]').value}&password=${document.querySelector('input[name=password]').value}`);
				var resp = xml.responseText;

				if(resp==1){
					document.querySelector('.form-loader').style.display="none"
					window.location.href="index.php?_ed_active"
				}else{
					document.querySelector('.form-loader').style.display="none"
					alert('Usuário ou senha incorretos!')
				}
			}, 200);
		}
   </script>
</body>
</html>
