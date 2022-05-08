<template>
<meta http-equiv=”refresh” content=”0″> 
  <div class="gifts"  v-if="existedUser().token != ''">
    <!--<h1>Partagez vos articles preferes</h1>-->
    <table  >
     <!-- <tr>
        <td class="dep">Département:</td>
        <td class="dep">
          <select id="department">
            <option value="1">Commercial</option>
            <option value="2">Resources humaines</option>
            <option value="3">Information technonogy</option>
          </select>
        </td>
      </tr>-->
    </table>
    <div>
       <div id="chat" >
         <div v-for="i in existedAllChat()" :key="i.id" class="chatAll" :id="i.id+'chatPosition'">
            <span class="chatDataTime">
             {{ i.dateTime }} &nbsp; {{ i.hour }}:{{ i.minute }}:{{ i.second }}
            </span> @<span class="chatName">{{ i.first_name }}</span> 
            <i v-if="i.id_user==i.xid_user" class="fa fa-pencil fa-fw" @click="UpdateOneChat(i.id, i.comment)" title="Update"></i>
            <i v-if="i.id_user==i.xid_user" class="fa fa-times-circle-o fa-fw rouge" @click="DeleteOneChat(i.id)" title="Delete"></i> 
           <div class="chatComment" >
             <div v-if="i.id_user==i.xid_user" v-html="i.comment" class="bg" :id="i.id+'chatComment'"></div>
             <div v-else v-html="i.comment" :id="i.id+'chatComment'"></div>
           
             <div v-if="i.like == 1">
               <i class="fa fa-thumbs-up green" @click="like(i.id, i.id_user)" :id="i.id+'like'" :title="i.id+'like'"></i>
               <span :id="i.id+'likeResult'" >{{ i.likes }}</span>&nbsp;&nbsp;
               <i class="fa fa-thumbs-down"   :id="i.id+'dislike'"  :title="i.id+'dislike'" :disabled="disabled" ></i>
               <span :id="i.id+'dislikeResult'">{{ i.dislikes }}</span>
              <span ></span>
              </div>
              <div v-else-if="i.dislike==0">
               <i class="fa fa-thumbs-up" @click="like(i.id, i.id_user, i.like)" :id="i.id+'like'" :title="i.id+'like'"></i>
               <span :id="i.id+'likeResult'" >{{ i.likes }}</span>&nbsp;&nbsp;
               <i class="fa fa-thumbs-down" @click="dislike(i.id, i.id_user)"  :id="i.id+'dislike'"  :title="i.id+'dislike'"></i>
               <span :id="i.id+'dislikeResult'">{{ i.dislikes }}</span>
              <span ></span>
              </div>
              <div v-else>
               <i class="fa fa-thumbs-up" :id="i.id+'like'" :title="i.id+'like'" :disabled="disabled"></i>
               <span :id="i.id+'likeResult'" >{{ i.likes }}</span>&nbsp;&nbsp;
               <i class="fa fa-thumbs-down rouge" @click="dislike(i.id, i.id_user, i.dislike)" :id="i.id+'dislike'"  :title="i.id+'dislike'"></i>
               <span :id="i.id+'dislikeResult'">{{ i.dislikes }}</span>
              <span ></span>
              </div>
            </div>
         </div>
       </div>
       <table class="table" >
         <tr>
           <td ><div id="comment" contenteditable="true"></div></td>
           <td style="width:1%;" id="BtnOk">
             <input type="hidden" id="idChat" value="-1">
             <i  class="fa fa-send rougeatre" @click="inputChat" @keydown.enter="inputChat" title="Soumettre" id="inputChat"></i>
             <!--<button id="inputChat" @click="inputChat">OK</button>-->
           <i class="fa fa-edit rougeatre" @click="UdateOneChatNow()"  title="Update" id="updateChat"></i>
           </td>
           </tr>
       </table>
    </div>
  </div>
</template>
<style scoped lang="scss">
table {margin: auto; margin-top:10px; }
.table {margin: auto; margin-top:3px; max-width:600px;}
td {text-align: left;}
h1{display:inline;}
a{text-decoration: none;}
.dep {padding-bottom:15px;}
#chat{margin:auto; max-width:600px; min-height:300px; max-height:300px; background: #eee;
   overflow: overlay;
  overflow-y: overlay;
  
  overflow-x: hidden;
  border:1px #999 solid;
  border-top-left-radius: 30px;
  border-bottom-right-radius: 30px;
  padding: 25px;
  text-align: left; 
}
#chat::-webkit-scrollbar  {
      background:transparent; // manage scrollbar background color here
    }
#comment {
  border: 1px solid gray;
  min-height: 40px;  /* if you want Flexible textarea/div then give min-height instead of height */
  overflow: auto; 
  padding: 2px;
  resize: both;
  width: 100%;
  font-size:15px;
  color:#000;
  overflow: hidden;
}
/*.chatDataTime{font-size: 12px; color:rgb(132, 0, 255);}*/
/*textarea{width:500px;}*/
.delete {color: red;}
.rouge {color: #c31;}
button {margin:5px 5px 5px 0; cursor: pointer;}
.chatDataTime{font-size: 14px; color:rgb(132, 0, 255);}
i{color:#999; font-size: 18px; cursor: pointer;}
.chatComment{padding-left:20px; margin-bottom: 10px; color:#000; font-size:15px;}
.bg{padding:5px; background-color: rgb(212, 195, 250); border-radius: 10px;}
#comment{font-size: 15px; background: white; border-radius: 10px; padding: 5px;}
.chatName{font-size:12px; font-weight:bold;}
.chatAll{font-size:10px;}            
.green{color:green;}
.rougeatre{color:#c31; font-size: 20px;}
#updateChat{display:none;}
*{ box-sizing: border-box;}

@media only screen and (max-width: 769px) {
  .chatDataTime{font-size: 13px;}
  .chatName{font-size:12px; }
  i{font-size: 18px;}
  .chatComment{font-size:15px;}
}
</style>

<script>
 
export default {
 /* name: 'HomeTemplate',
  props: {
    msg: String
  },*/

  data() {
		return {
     zeroUser: '[{"id":"","id_dep":"","role":"","token":"", "first_name":"","last_name":""}]'
		}
	},
  methods: {
    deconnectUser() { 
     localStorage.setItem("oneUser",this.zeroUser);
      //localStorage.removeItem("oneUser");
      let a = localStorage.getItem("oneUser");
      //this.lanceUser();
      location.reload();
      a = JSON.parse(a);
      return a[0];
    },
    existedUser() {
      this.lanceChat();
      var a = localStorage.getItem("oneUser"); 
      if(a !=""){ //var a = this.lanceUser();
       a = JSON.parse(a);  
       if(a[0].token =='')
       this.$router.push('/login');
        return a[0]; 
      } else
      {
        return JSON.parse(this.zeroUser);
      }
      
		}, 
    DeleteOneChat(id){
       let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      if(confirm("Souhaitez vous supprimer ce post № "+id))
      fetch(`http://localhost:3000/api/chat/${id}`, {
        method: "delete",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }/*, 
       body: JSON.stringify(z)*/
      })
      .then(function(res) {
        if (res.ok) { 
          return res.json(); 
        } 
      })
      .then(function (value) {
        console.log(value); let d=''; //let comment=""; 
          for(let i of value.v){
            let dateTime = new Date(i.times).toDateString();
            let hour = new Date(i.times).getHours();
            let minute = new Date(i.times).getMinutes();
            let second = new Date(i.times).getSeconds();

            let idCurrentUser = JSON.parse(localStorage.getItem("oneUser"))[0].id;
            var likes = 0; 
            var dislikes = 0; 
            if(i.userlike != null && i.userlike !="[null]"){
              for(let j of JSON.parse(i.userlike)) { 
                if(j.like == 1 && j.id_user == idCurrentUser){ likes = 1; break;}
                if(j.dislike == 1 && j.id_user == idCurrentUser){ dislikes = 1; break;}
              }     
            } 
            let xid_user = JSON.parse(localStorage.getItem("oneUser"))[0].id;     
            d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
            "last_name":"${i.last_name}", "email":"${i.email}", 
            "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
            "comment":"${i.comment}", "like":"${likes}", "dislike":"${dislikes}", "likes":"${i.likes}", "dislikes":"${i.dislikes}", "xid_user": "${xid_user}"}, `;
            
          }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); 
        
        let contentChat = document.getElementById("chat");
        contentChat.scrollTop = contentChat.scrollHeight;
        location.reload();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: DeleteOneChat  "+err.message);
      });

    },
    UpdateOneChat(id, comment){
      console.log(comment);
      let eltComment = document.getElementById("comment");
      let eltInputChat = document.getElementById("inputChat");
      let eltUpdateChat = document.getElementById("updateChat");
      let eltIdChat = document.getElementById("idChat");
      eltComment.focus();
      eltComment.innerHTML = document.getElementById(id+"chatComment").innerHTML; 
      eltComment.style.background = "rgb(212, 195, 250)";

      eltInputChat.style.display = "none"; 
      eltUpdateChat.style.display = "block"; 
      eltIdChat.value =id;      
      return id;
    },
    existedAllChat() { 
    this.lanceChat();
    //var a = document.getElementById("tout1").innerHTML;
    //localStorage.removeItem("allDep"); 
    var a = localStorage.getItem("allChat"); 
    
    a = JSON.parse(a); 

			return a;

		},
    UdateOneChatNow(){
      let id = document.getElementById("idChat").value;
      let comment = document.getElementById("comment").textContent;
      comment = comment.replace(/'/g,"&apos;");
      comment = comment.replace(/`/g,"&apos;");
      comment = comment.replace(/"/g,"&quot;");
      //let xid = JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let z = {chat:{
                      id : id,
                      comment : comment
                    }
              };  
      //localStorage.setItem("unChat","0");
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      if(id>0)
      fetch(`http://localhost:3000/api/chat/${id}`, {
        method: "PUT",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }, 
       body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) { 
          return res.json(); 
        } 
      })
      .then(function (value) {
        console.log(value); let d=''; //let comment=""; 
          for(let i of value.v){
            let dateTime = new Date(i.times).toDateString();
            let hour = new Date(i.times).getHours();
            let minute = new Date(i.times).getMinutes();
            let second = new Date(i.times).getSeconds();

            let idCurrentUser = JSON.parse(localStorage.getItem("oneUser"))[0].id;
            var likes = 0; 
            var dislikes = 0; 
            if(i.userlike != null && i.userlike !="[null]"){
              for(let j of JSON.parse(i.userlike)) { 
                if(j.like == 1 && j.id_user == idCurrentUser){ likes = 1; break;}
                if(j.dislike == 1 && j.id_user == idCurrentUser){ dislikes = 1; break;}
              }     
            } 
            let xid_user = JSON.parse(localStorage.getItem("oneUser"))[0].id;     
            d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
            "last_name":"${i.last_name}", "email":"${i.email}", 
            "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
            "comment":"${i.comment}", "like":"${likes}", "dislike":"${dislikes}", "likes":"${i.likes}", "dislikes":"${i.dislikes}", "xid_user": "${xid_user}"}, `;
            
          }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); 
        
        
        document.getElementById('comment').innerHTML=""; 
        document.getElementById("comment").style.background="white";
        
        let eltInputChat = document.getElementById("inputChat");
        let eltUpdateChat = document.getElementById("updateChat");
        eltInputChat.style.display = "block"; 
        eltUpdateChat.style.display = "none";

        document.getElementById(value.id_now+'chatComment').innerHTML = value.comment_now;
        document.getElementById(value.id_now+'chatPosition').focus();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: UpdateOneChat  "+err.message);
      });

    },
    like(id, id_user){
      console.log(id_user); 
      let elt = document.getElementById(`${id}like`);
      let eltResult = document.getElementById(`${id}likeResult`);
      let like = 0;
      
      //let idCurrentUser =  JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let eltDislike = document.getElementById(`${id}dislike`); //alert(eltDislike.style.cursor);
      function myEmty() {
            console.info("empty");//document.getElementById("demo").innerHTML = "Hello World";
          }
     //if(elt.style.cursor!="text")
      if (elt.getAttribute("class") == "fa fa-thumbs-up"){ 
        eltDislike.style.cursor = "text";
        eltDislike.disabled = true;
        eltDislike.onclick=myEmty();
        elt.onclick=`like(${id}, ${id_user})`;
        elt.setAttribute("class", "fa fa-thumbs-up green");
        //likeResult = eltResult.textContent++;
        if(eltResult.textContent=="") eltResult.textContent=0;
        eltResult.textContent ++;
        like = 1;
      }else {
        eltDislike.style.cursor = "pointer";
        elt.setAttribute("class", "fa fa-thumbs-up");
        eltDislike.onclick=`dislike(${id}, ${id_user})`;
        eltResult.textContent--;
        if (eltResult.textContent == 0) eltResult.textContent="";
        like = 0;
      }
      let xid = JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let z = {chat:{
                      id : id,
                      like : like,
                      id_user : xid
                    }
              };  
      localStorage.setItem("unChat","0");
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      fetch(`http://localhost:3000/api/chat/${id}/like/`, {
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }, 
       body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) { 
          return res.json(); 
        } 
      })
      .then(function (value) {
        //-----------------
         console.log(value); let d=''; //let comment=""; 
          for(let i of value.v){
            let dateTime = new Date(i.times).toDateString();
            let hour = new Date(i.times).getHours();
            let minute = new Date(i.times).getMinutes();
            let second = new Date(i.times).getSeconds();

            let idCurrentUser = JSON.parse(localStorage.getItem("oneUser"))[0].id;
            var likes = 0; 
            var dislikes = 0; 
            if(i.userlike != null && i.userlike !="[null]"){
              for(let j of JSON.parse(i.userlike)) { 
                if(j.like == 1 && j.id_user == idCurrentUser){ likes = 1; break;}
                if(j.dislike == 1 && j.id_user == idCurrentUser){ dislikes = 1; break;}
              }     
            } 
            let xid_user = JSON.parse(localStorage.getItem("oneUser"))[0].id;     
            d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
            "last_name":"${i.last_name}", "email":"${i.email}", 
            "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
            "comment":"${i.comment}", "like":"${likes}", "dislike":"${dislikes}", "likes":"${i.likes}", "dislikes":"${i.dislikes}", "xid_user": "${xid_user}"}, `;
            
          }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); 
        
        //let contentChat = document.getElementById("chat");
        //contentChat.scrollTop = contentChat.scrollHeight;
        //----------------
        
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: Like  "+err.message);
      });
      //if(localStorage.getItem("unChat") == 1)location.reload();//this.lanceChat();
    },
    dislike(id, id_user){
       console.log(id_user); 
      let eltDislike = document.getElementById(`${id}dislike`);
      let eltDislikeResult = document.getElementById(`${id}dislikeResult`);
      let dislike = 0;
      
      //let idCurrentUser =  JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let elt = document.getElementById(`${id}like`); //alert(eltDislike.style.cursor);
      function myEmty() {
        //alert(1);//document.getElementById("demo").innerHTML = "Hello World";
        1;
      }
     //if(elt.style.cursor!="text")
      if (eltDislike.getAttribute("class") == "fa fa-thumbs-down"){ 
        elt.style.cursor = "text";
        elt.onclick=myEmty();
        eltDislike.onclick=`dislike(${id}, ${id_user})`;
        eltDislike.setAttribute("class", "fa fa-thumbs-down rouge");
        //likeResult = eltResult.textContent++;
        if(eltDislikeResult.textContent=="") eltDislikeResult.textContent=0;
        eltDislikeResult.textContent ++;
        dislike = 1;
      }else {
        elt.style.cursor = "pointer";
        elt.onclick=`dislike(${id}, ${id_user})`;
        eltDislike.setAttribute("class", "fa fa-thumbs-down");
        eltDislike.disabled = true;
        eltDislikeResult.textContent--;
        if (eltDislikeResult.textContent == 0) eltDislikeResult.textContent="";
        dislike = 0;
      }
      let xid = JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let z = {chat:{
                      id : id,
                      dislike : dislike,
                      id_user : xid
                    }
              };  
      localStorage.setItem("unChat","0");
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      fetch(`http://localhost:3000/api/chat/${id}/dislike/`, {
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }, 
       body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) { 
          return res.json(); 
        } 
      })
      .then(function (value) {
        //-----------------
         console.log(value); let d=''; //let comment=""; 
          for(let i of value.v){
            let dateTime = new Date(i.times).toDateString();
            let hour = new Date(i.times).getHours();
            let minute = new Date(i.times).getMinutes();
            let second = new Date(i.times).getSeconds();

            let idCurrentUser = JSON.parse(localStorage.getItem("oneUser"))[0].id;
            var likes = 0; 
            var dislikes = 0; 
            if(i.userlike != null && i.userlike !="[null]"){
              for(let j of JSON.parse(i.userlike)) { 
                if(j.like == 1 && j.id_user == idCurrentUser){ likes = 1; break;}
                if(j.dislike == 1 && j.id_user == idCurrentUser){ dislikes = 1; break;}
              }     
            } 
            let xid_user = JSON.parse(localStorage.getItem("oneUser"))[0].id;     
            d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
            "last_name":"${i.last_name}", "email":"${i.email}", 
            "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
            "comment":"${i.comment}", "like":"${likes}", "dislike":"${dislikes}", "likes":"${i.likes}", "dislikes":"${i.dislikes}", "xid_user": "${xid_user}"}, `;
            
          }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); 
        
        //let contentChat = document.getElementById("chat");
        //contentChat.scrollTop = contentChat.scrollHeight;
        //----------------
        
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: DisLike  "+err.message);
      });
       //if(localStorage.setItem("unChat") == "1") this.lanceChat();
    },
    inputChat(){ 
      let comment = document.getElementById("comment").textContent;
      comment = comment.replace(/'/g,"&apos;");
      comment = comment.replace(/`/g,"&apos;");
      comment = comment.replace(/"/g,"&quot;");
      let id_user =  JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let z = {chat:{
                      comment : comment,
                      id_user : id_user
                    }
              }; 
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      fetch(`http://localhost:3000/api/chat`, {
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json',
          'Authorization':  x
       }, 
       body: JSON.stringify(z)
      })
      .then(function(res) {
        if (res.ok) { 
          return res.json(); 
        } 
      })
      .then(function (value) {
        console.info(value);
        let d=''; //let comment=""; 
        for(let i of value.v){
          let dateTime = new Date(i.times).toDateString();
          let hour = new Date(i.times).getHours();
          let minute = new Date(i.times).getMinutes();
          let second = new Date(i.times).getSeconds();

          i.comment = i.comment.replace("\n","<br/>");
         // i.comment = i.comment.replace(/&apos;/g,"'");  
          //i.comment = i.comment.replace(/&apos;/g,"'"); 
          //let userlike = i.userlike;
          let idCurrentUser = JSON.parse(localStorage.getItem("oneUser"))[0].id;
          var likes = 0; 
          var dislikes = 0; 
          if(i.userlike != null && i.userlike !="[null]"){
            for(let j of JSON.parse(i.userlike)) { 
              if(j.like == 1 && j.id_user == idCurrentUser){ likes = 1; }
              if(j.dislike == 1 && j.id_user == idCurrentUser){ dislikes = 1; }
            }     
          } 
          let xid_user = JSON.parse(localStorage.getItem("oneUser"))[0].id;    
          d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
          "last_name":"${i.last_name}", "email":"${i.email}", 
          "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
          "comment":"${i.comment}", "like":"${likes}", "dislike":"${dislikes}", "likes":"${i.likes}", "dislikes":"${i.dislikes}", "xid_user": "${xid_user}"}, `;
            
        }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); //alert(localStorage.getItem("allChat"));
        //document.getElementById("chat").innerHTML = comment;
        //document.getElementById("comment").value = ""; 
        document.getElementById("comment").value = "";
        
        location.reload();
      })
      .catch(function(err) {
        alert("Une Erreur est survenue: ADD Comment "+err.message);
      });
      
    },
    lanceChat(){ 
      //alert(localStorage.getItem("oneUser"));
    if(localStorage.getItem("oneUser")!=this.zeroUser){ 
      //let xid = JSON.parse(localStorage.getItem("oneUser"))[0].id; 
      let x = JSON.parse(localStorage.getItem("oneUser"))[0].token; 
      fetch(`http://localhost:3000/api/chat/`, {
          method: "GET",
          headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization':  x
        }/*, 
        body: JSON.stringify(z)*/
        })
        .then(function(res) {
          if (res.ok) { 
            return res.json(); 
          } 
        })
        .then(function (value) {
          let d=''; //let comment=""; 
          for(let i of value.v){
            let dateTime = new Date(i.times).toDateString();
            let hour = new Date(i.times).getHours();
            let minute = new Date(i.times).getMinutes();
            let second = new Date(i.times).getSeconds();

           // i.comment = i.comment.replace("\n","<br/>");
            //i.comment = i.comment.replace(/&apos;/g,"'");
            //i.comment = i.comment.replace(/&quot;/g,"");
            //let userlike = i.userlike;
            let idCurrentUser = JSON.parse(localStorage.getItem("oneUser"))[0].id;
            var likes = 0; 
            var dislikes = 0; 
            if(i.userlike != null && i.userlike !="[null]"){
              for(let j of JSON.parse(i.userlike)) { 
                if(j.like == 1 && j.id_user == idCurrentUser){ likes = 1; break;}
                if(j.dislike == 1 && j.id_user == idCurrentUser){ dislikes = 1; break;}
              }     
            } 
            let xid_user = JSON.parse(localStorage.getItem("oneUser"))[0].id;     
            d +=`{"id":"${i.id_chat}", "id_user":"${i.id_user}", "id_dep":"${i.id_dep}", "first_name":"${i.first_name}", 
            "last_name":"${i.last_name}", "email":"${i.email}", 
            "times":"${i.times}", "dateTime":"${dateTime}", "hour":"${hour}", "minute":"${minute}", "second":"${second}", 
            "comment":"${i.comment}", "like":"${likes}", "dislike":"${dislikes}", "likes":"${i.likes}", "dislikes":"${i.dislikes}", "xid_user": "${xid_user}"}, `;
            
          }
        d = d.substring(0,d.length-2); //supprime la derniere virgule
        d = `[${d}]`;  
        localStorage.setItem("allChat",d); 
        
        let contentChat = document.getElementById("chat");
        contentChat.scrollTop = contentChat.scrollHeight;

        //alert(localStorage.getItem("allChat"));
        //document.getElementById("chat").innerHTML = comment;
        //document.getElementById("comment").value = ""; 
        //return d; 
        //location.reload();
        })
        .catch(function(err) {
          alert("Une Erreur est survenue: ALL CHAT "+err.message);
        });
        //return localStorage.getItem("allChat");
      }
    },
    lanceChat2(){location.reload();}
  }
}
</script>