//获取到按钮和各个输入框
const btn= document.querySelector('.start')
const find_btn = document.querySelector('#find_start')
const boy_number_input = document.querySelector('#boy_number');
const girl_number_input = document.querySelector('#girl_number');
const boy_number_find_input = document.querySelector('#boy_number_find');
const girl_number_find_input = document.querySelector('#girl_number_find')
const song_number_input = document.querySelector('#song_number');
const showlist = document.querySelector('#showlist')
const result = document.querySelector('#Result')
const err_text= document.querySelector("erro_text");

//定义一个全局变量用来保存歌曲
var song_store=[];

//查询的画布，获取到画布和画笔
const mycanvas = document.querySelector('#mycanvas')
const ctx = mycanvas.getContext('2d');

var boy_number=0;
var girl_number=0;
var song_number=0;
var boy_number_find  = 0;
var girl_number_find = 0;
//为开始按键添加点击事件
btn.addEventListener('click',(e)=>{
    e.preventDefault();
    boy_number = boy_number_input.value;
    girl_number = girl_number_input.value;
    song_number = song_number_input.value;
    let myarr =startDance(boy_number,girl_number,song_number);
    let boy_arr= myarr.first;
    let girl_arr=myarr.second;
    let second_boy_arr = myarr.third;
     animation(boy_arr);
    animation2(girl_arr);
    animation3(second_boy_arr);
});

find_btn.addEventListener('click',(e)=>{
    e.preventDefault();;
    boy_number_find = boy_number_find_input.value;
    girl_number_find = girl_number_find_input.value;
    if(boy_number_find==""){
        const li = document.createElement('li');
            li.style.color="red"
            li.style.listStyle="none"
            li.style.fontSize="xx-small"
            li.style.margin="5px"
            li.style.borderRadius="3px"
            li.style.background=":rgba(0,0,50,0.8)"
            const text =`请输入男孩子的号数`
            li.appendChild(document.createTextNode(text));
            result.appendChild(li);
            return ;
    }
    if(girl_number_find==""){
        const li = document.createElement('li');
            li.style.color="red"
            li.style.listStyle="none"
            li.style.fontSize="xx-small"
            li.style.margin="5px"
            li.style.borderRadius="3px"
            li.style.background=":rgba(0,0,50,0.8)"
            const text =`请输入女孩子的号数`
            li.appendChild(document.createTextNode(text));
            result.appendChild(li);
            return ;
    }
    console.log(song_store)
    const flag = 0;
    for(let i =0;i<song_store.length;i++){
        if(song_store[i].song_match[0]==boy_number_find&&song_store[i].song_match[1]==girl_number_find){
            const li = document.createElement('li');
            li.style.color="lightcyan"
            li.style.listStyle="none"
            li.style.fontSize="xx-small"
            li.style.margin="5px"
            li.style.borderRadius="3px"
            li.style.background=":rgba(0,0,50,0.8)"
            const text =`第${boy_number_find}号男生和第${girl_number_find}号女生在第${song_store[i].number}首歌相遇`
            li.appendChild(document.createTextNode(text));
            result.appendChild(li);
            flag =1;
        }
    }
    if(flag==0){
        const li = document.createElement('li');
            li.style.color="lightcyan"
            li.style.listStyle="none"
            li.style.fontSize="xx-small"
            li.style.margin="5px"
            li.style.borderRadius="3px"
            li.style.background=":rgba(0,0,50,0.8)"
            const text =`第${boy_number_find}号男生和第${girl_number_find}号女生没有相遇`
            li.appendChild(document.createTextNode(text));
            result.appendChild(li);
    }
})


function startDance(boy_number,girl_number,song_number){
    console.log(boy_number,girl_number,song_number)
    var boys=[];//男孩子队列二
    var boys2 =[];//男孩子队列一
    var girls=[];//女孩子队列
    var songs =[];//歌曲的结构体
    // 创建男生和女生的队伍,男生优先级设置为0
    for(let i=1;i<=boy_number;i++){
        boys.push({number:i});
    }


    //存储男孩子的动画帧
    var virtualArr = [{first:boys.concat(boys2),second:'start',third:-1}];

    for(let i=1;i<=girl_number;i++){
        girls.push({number:i});
    }

    //存储女孩子的动画帧
    var girl_virtualArr=[{first:girls.slice(),second:'start'}]

    //存储第二个队列的男孩子的动画帧
    var second_boy_virtualArr = [{first:boys2.slice(),second:'end'}]


    //创建歌曲
    for(let i=1;i<=song_number;i++){
        songs.push({number:i,song_match:[]});
    }
    for (let i = 1;i <=song_number; ++i) {

            //这时候存放一帧男孩子开头的，让开头的元素先变成灰色
            virtualArr.push({first:boys.slice(),second:'start',third:-1});
            
            //这时候存放一帧女孩子开头的，让开头的元素变成灰色
            girl_virtualArr.push({first:girls.slice(),second:'start'})

            //得保持同步
            second_boy_virtualArr.push({first:boys2.slice(),second:"end"})
            
            while(Math.round(Math.random())==0){
                if(boys.length==0){
                    boys.push.apply(boys,boys2);
                    boys2 =[];
                }
                //第以队的男孩子没了的话，就需要清空第二队的男孩子数目，这时候变成空了
                second_boy_virtualArr.push({first:boys2.slice(),second:"end"})
                //被拒绝之后进来，那么这时候，这个男孩子还在队首，先让他的头像变红
                virtualArr.push({first:boys.slice(),second:'start_match_fail',third:-1});  
                //这时候女孩子的队首也变成红色的
                girl_virtualArr.push({first:girls.slice(),second:'start_match_fail'})
                
                //男孩子回到队尾去了，因为没有被拒绝
                boys2.push(boys.shift());  


                //存放一帧第二个队列的男孩子
                second_boy_virtualArr.push({first:boys2.slice(),second:"end"})


                //这时候存放一帧开头的，让开头的元素先变成灰色
                virtualArr.push({first:boys.slice(),second:'start',third:-1});
                girl_virtualArr.push({first:girls.slice(),second:'start'})    
            }
            if(boys.length==0){
                boys.push.apply(boys,boys2);
                boys2 =[];
            }
            //这边是没有被拒绝的，男孩子的队首元素需要进行变绿的处理，代表这时候匹配了
            virtualArr.push({first:boys.slice(),second:'start_match_success',third:-1});
            girl_virtualArr.push({first:girls.slice(),second:'start_match_success'})
            second_boy_virtualArr.push({first:boys2.slice(),second:"end"})
            //歌曲存放进去男孩子和女孩子的编号
            songs[i-1].song_match.push(boys[0].number);
            songs[i-1].song_match.push(girls[0].number);


            //添加到我们的界面
            const li = document.createElement('li');
            li.style.color="lightcyan"
            li.style.listStyle="none"
            li.style.fontSize="xx-small"
            li.style.margin="5px"
            li.style.borderRadius="3px"
            li.style.background=":rgba(0,0,50,0.8)"
            const text =`第${i}首歌匹配到了${boys[0].number}号男生和${girls[0].number}号女生`
            li.appendChild(document.createTextNode(text));
            showlist.appendChild(li);

            //男孩子放在我们的队尾
            boys.push(boys.shift());


            //这时候需要再存放一次男孩子回到队尾的图片，用棕色进行表示,这时候还没有进行堆的调整
            virtualArr.push({first:boys.slice(),second:'end',third:-1});  

            //女孩子放在我们的队尾
            girls.push(girls.shift());

            //存放一帧我们女孩字回到队尾的图片
            girl_virtualArr.push({first:girls.slice(),second:'end'})

            //这一帧也需要保持同步，不然逻辑又乱了
            second_boy_virtualArr.push({first:boys2.slice(),second:"end"})
    }
    song_store =songs.slice();
    let MY_virtualArr ={first:virtualArr,second:girl_virtualArr,third:second_boy_virtualArr}
    console.log(second_boy_virtualArr);
    return MY_virtualArr;

}



function draw(arr){
    const width =25;
    var space =10;
    ctx.clearRect(0,0,mycanvas.width,99);
    ctx.font = "18px serif";
    ctx.fillText("男孩子队列",width,25)
    switch(arr.second){
        case "start":
            for(let i =0;i<arr.first.length;i++){
                if(i==0){
                    ctx.fillStyle = 'gray'
                }else{
                    ctx.fillStyle = '#61C5FE'     
                }            
                ctx.fillRect(i*(width+space),50,width,width);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),75);

            }
            break;
        case "start_match_fail":
            for(let i =0;i<arr.first.length;i++){
                if(i==0){
                    ctx.fillStyle = 'red'
                }else{
                    ctx.fillStyle = '#61C5FE'     
                } 
                ctx.fillRect(i*(width+space),50,width,width);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),75);
            }
            break;
        case "start_match_success":
            for(let i =0;i<arr.first.length;i++){
                if(i==0){
                    ctx.fillStyle = 'green'
                }else{
                    ctx.fillStyle = '#61C5FE'     
                }                     
                ctx.fillRect(i*(width+space),50,width,width);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),75);
            }
            break;
        case "end":
            for(let i =0;i<arr.first.length;i++){
                if(i==arr.first.length-1){
                    ctx.fillStyle = 'green';
                }else{
                    ctx.fillStyle = '#61C5FE';
                }                  
                ctx.fillRect(i*(width+space),50,width,width);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),75);
            }
            break;
    }
}

function animation(arr){
    var virtualArr=arr;
    var interval =700;
    virtualArr.forEach((item,index)=>{
        setTimeout(()=>draw(item),index*interval);
    });
}



function draw2(arr){
    const width =25;
    var space =10;
    ctx.clearRect(0,99,mycanvas.width,125);
    ctx.moveTo(0,100);
    ctx.lineTo(mycanvas.width,100);
    ctx.moveTo(0,125);
    ctx.lineTo(mycanvas.width,125);
    ctx.stroke();
    ctx.font = "18px serif";
    ctx.fillText("女孩子队列",25,150)
    switch(arr.second){
        case "start":
            for(let i =0;i<arr.first.length;i++){
                if(i==0){
                    ctx.fillStyle = 'gray'
                    ctx.fillText("歌曲开始,匹配中",i*(width+space),175)
                }else{
                    ctx.fillStyle = '#61C5FE'     
                }            
                ctx.fillRect(i*(width+space),100,width,25);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),125);

            }
            break;
        case "start_match_fail":
            for(let i =0;i<arr.first.length;i++){
                if(i==0){
                    ctx.fillStyle = 'red'
                    ctx.fillText("歌曲结束,匹配失败",i*(width+space),175)
                }else{
                    ctx.fillStyle = '#61C5FE'     
                } 
                ctx.fillRect(i*(width+space),100,width,25);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),125);
            }
            break;
        case "start_match_success":
            for(let i =0;i<arr.first.length;i++){
                if(i==0){
                    ctx.fillStyle = 'green'
                    ctx.fillText("歌曲结束,匹配成功",i*(width+space),175)
                }else{
                    ctx.fillStyle = '#61C5FE'     
                }                     
                ctx.fillRect(i*(width+space),100,width,25);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),125);
            }
            break;
        case "end":
            for(let i =0;i<arr.first.length;i++){
                if(i==arr.first.length-1){
                    ctx.fillStyle = 'green';
                }else{
                    ctx.fillStyle = '#61C5FE';
                }                  
                ctx.fillRect(i*(width+space),100,width,25);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),125);
            }
            break;
    }
}

function animation2(arr){
    var virtualArr=arr;
    var interval =700;
    virtualArr.forEach((item,index)=>{
        setTimeout(()=>draw2(item),index*interval);
    });
}


function draw3(arr){
    const width =25;
    var space =10;
    ctx.clearRect(0,185,mycanvas.width,300);
    if(arr.first.length==0){
        ctx.fillText("男孩子第二队列为空",(width+space),275);
    }else{
        ctx.fillText("男孩子第二队列不为空",(width+space),275);
    }
    switch(arr.second){
        case "end":
            for(let i =0;i<arr.first.length;i++){
                ctx.fillStyle = '#61C5FE';              
                ctx.fillRect(i*(width+space),225,width,25);
                ctx.fillStyle ='#240be4';
                ctx.fillText(arr.first[i].number,i*(width+space),250);
            }
            break;
    }

}

function animation2(arr){
    var virtualArr=arr;
    var interval =700;
    virtualArr.forEach((item,index)=>{
        setTimeout(()=>draw2(item),index*interval);
    });
}

function animation3(arr){
    var virtualArr=arr;
    var interval =700;
    virtualArr.forEach((item,index)=>{
        setTimeout(()=>draw3(item),index*interval);
    });
}
