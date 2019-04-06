let array=[];
let id=0;
let addObject = (input) => {      // For adding the object data into the array
    async function getData() {
        let apiKey='3322af922214d41bf1872542e400742b';
        let proxy='https://cors-anywhere.herokuapp.com/';
        let data=await fetch(`${proxy}api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`)
        let result=await data.json();
        return result;
    }
    let data=getData()
    .then(res => {
        document.getElementById("loader").style.display="none";
        array.push(res);
        addElement();
        document.querySelector('#weather').addEventListener('click',(event) => {
            let element=event.target.parentNode;
            let elementId=element.id;
            let parent=event.target.parentNode.parentNode;
            array.splice(elementId,1);
            parent.removeChild(element);
            id--;
            console.log(id);
        })
    })
    .catch(error => {
        console.log(error);
    })
}

let addElement = () => {      // For adding the element to the UI
    let container=document.getElementById("weather");
    let image=`http://openweathermap.org/img/w/${array[id].weather[0].icon}.png`;
    let template=`
        <div class="container bg-light p-2 mt-3" id="${id}">
            <i class="fas fa-times float-right cross"></i>
            <h2 class="display-4">${array[id].name}</h2>
            <img src="${image}">
            <p>${Math.round(array[id].main.temp-272)}&#8451;</p>
            <p>${array[id].weather[0].main}</p>
        </div>         
     `
    container.insertAdjacentHTML('beforeend',template);
    id++;
}

let loader = () => {         // For the loader before fetching
    let loaderIcon=document.getElementById("loader");
    loaderIcon.style.display="block";
    loaderIcon.innerHTML = `
    <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>`  
}

let init = () => {           // Main controller
document.addEventListener('keypress',(event) => {
    if(event.keyCode===13)
    {
        loader();
        let input = document.getElementById("city").value;
        addObject(input);
    }
});
}

init();
