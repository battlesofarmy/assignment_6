const myFnc = async(value="") => {
    // const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    // const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=coding`);
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${value}`);
    const val = await response.json();
    loadPosts(val.posts);
}
myFnc()


function  loadPosts(value){
    const posts = document.getElementById("posts");
    posts.innerHTML="";
    value.forEach(val => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="post grid grid-cols-6 gap-8 p-10 my-6 ${val.id}">
            <div class="col-span-1">
            <div class="img-div">
                <div class="status ${val.isActive}"></div>
                <img src="${val.image}" alt="">
            </div>
            </div>
            <div class="col-span-5">
            <p># ${val.category} <span>Author : ${val.author.name}</span></p>
            <h2>${val.title}</h2>
            <p class="py-3">${val.description}</p>
            <hr>
            <div class="icon-box flex justify-between items-center">
                <div class="flex justify-between">
                    <div class="mr-6"><i class="fa-regular fa-comment-dots"></i>${val.comment_count}</div>
                    <div class="mr-6"><i class="fa-regular fa-eye"></i>${val.view_count}</div>
                    <div class="mr-6"><i class="fa-regular fa-clock"></i>${val.posted_time} min</div>
                </div>
                <div>
                    <div><i onclick="markRead('${val.title.replace(/'/g, "\\'")}', ${val.view_count}, ${val.id})" class="fa-regular fa-envelope env"></i></div>
                </div>
            </div>
            </div>
        </div>
        `
        posts.appendChild(div);
    })
}
// If mark is read then add append Elements 
let count = 0;
function markRead(text, view, id){
    const postItem = document.getElementById('post-item');
    const totalRead = document.getElementById('mark-read-count');
    const div = document.createElement('div');
    // console.log("sumu")
    // console.log(ele.length)
    div.innerHTML = `
            <div class="grid grid-cols-5 items-center item my-4 ${id}">
                <div class="col-span-4"><h2>${text}</h2></div>
                <div class="col-span-1 text-center"><i class="fa-regular fa-eye"></i> ${view}</div>
            </div>
        `;



const allDiv = document.getElementById('post-item');
const ele = allDiv.querySelectorAll('.grid');
let c = 0;

ele.forEach(element => {
    const checkId = element.classList.contains(id);
    if (checkId) {
            // console.log("Element with id found, removing...");
            // Remove the element from its parent
            element.parentNode.removeChild(element);
            c=1;
            count--;
        }
});


    // const tem = document.querySelector('.env').classList.contains('fa-envelope-open')
    // console.log(tem)
    if(c==0){
     postItem.appendChild(div);
     count++;
    }  
    
    totalRead.innerText = count;


    if(count!=0){
        document.getElementById('readFirst').style.display = 'none';
    }else{
        document.getElementById('readFirst').style.display = 'block';
    }

}




// Add a click event listener to a parent element
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('fa-envelope')) {
        event.target.classList.remove('fa-envelope');
        event.target.classList.add('fa-envelope-open');
        // console.log(event.target.inn) 
    }else if(event.target.classList.contains('fa-envelope-open')){
        event.target.classList.remove('fa-envelope-open');
        event.target.classList.add('fa-envelope');
    }
});






document.getElementById('preloader').style.display = 'none';


function search(){
  const val = document.getElementById('search-btn').value;
//   myFnc("?category="+val);
  document.getElementById('posts').style.display = 'none';
  document.getElementById('preloader').style.display = 'block';
  document.getElementById('preloaderDiv').style.padding = "100px";
  setTimeout(() => {
    document.getElementById('posts').style.display = 'block';
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('preloaderDiv').style.padding = "0px";
  }, 2000);

myFnc("?category=" + encodeURIComponent(val));
  // console.log(val)
}



// Latest Posts ---------------
const latestPosts = async()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const val = await res.json();
    const latestCard = document.getElementById('latestCard')
    console.log(val)
    
    val.forEach((post)=>{
    const div = document.createElement('div');
    div.innerHTML =  `
       <div class="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md my-4">
          <div class="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
            <img src="${post.cover_image}" alt="img-blur-shadow" layout="fill"/>
          </div>
          <div class="p-6">
            <h6 class="mb-4 text-sm"> <i class="fa-regular fa-clock"></i> ${post.author.posted_date === undefined ? "No Publish Date": post.author.posted_date}</h6>
            <h5 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              ${post.title}
            </h5>
            <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
              ${post.description}
            </p>
            <div class="author grid grid-cols-4 place-items-center mt-6">
              <img class="col-span-1 rounded-full w-16" src="${post.profile_image}" alt="">
              <div class="col-span-3">
                <h5>${post.author.name}</h5>
                <p>${post.author.designation === undefined ? "Unknown" : post.author.designation}</p>
              </div>
            </div>
          </div>
        </div>
    `;
    latestCard.appendChild(div);
    })
    console.log(val[0].cover_image)
}
latestPosts();