const inputs = document.querySelectorAll(".input");
const likeDOM = document.querySelector('.fa-thumbs-up');

function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});

// like event
likeDOM.addEventListener('click',(e)=>{
	e.preventDefault();
	likeDOM.classList.toggle('fa-solid');
})

//Source :- https://github.com/sefyudem/Responsive-Login-Form/blob/master/img/avatar.svg