const selectMenu = document.querySelectorAll("select"),
currentTime = document.querySelector("h1"),
setBtn = document.querySelector(".btn"),
content = document.querySelector(".content");

let alaramTime,isAlarmSet,
ringtone = new Audio("files/ringtone.mp3");

for(let i=12;i>0;i--){
    i = i < 10 ? `0${i}` : i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=59;i>=0;i--){
    i = i<10 ? `0${i}`:i;
    let option = `<option value="${i}">${i}</option>`;
    selectMenu[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
for(let i=2;i>0;i--){
    let ampm = i == 1? "AM" :"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectMenu[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
setInterval(function(){
    let time = new Date();
    let hr = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    day = "AM";
    if(hr>12){
        hr=hr-12;
        day="PM";
    }
    if(hr==0){
        hr=12;
    }
    if(hr<10){
        hr="0"+hr;
    }
    if(min<10){
        min="0"+min;
    }
    if(sec<10){
        sec="0"+sec;
    }
    currentTime.innerHTML = `${hr}:${min}:${sec} ${day}`;
    if(alaramTime == `${hr}:${min} ${day}`){
        ringtone.play();
        ringtone.loop=true;
    }
    
})

function setAlarm(){
    if(isAlarmSet){
        content.classList.remove("disable");
        setBtn.innerText="Set Alarm";
        alaramTime = "";
        ringtone.pause();
        return isAlarmSet = false;
    }
    time=`${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;
    console.log(time);
    if(time.includes('Hour')||time.includes('Minute')||time.includes('AM/PM')){
        alert("Please select valid time");
    }
    else{
        alaramTime = time;
        isAlarmSet = true;
        console.log(alaramTime);
        content.classList.add("disable");
        setBtn.innerText="Clear Alarm";}
}
setBtn.addEventListener("click",setAlarm);