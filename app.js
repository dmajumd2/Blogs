var counter = 0;
var posts;
var postLength;

var comments;
var users;
var newComments = [];
var v = 0;
var num = 1;
if (!localStorage.udata && !localStorage.pdata && !localStorage.cdata) {

} 
else {
    jQuery("#Btn").hide();
    posts = JSON.parse(localStorage.pdata);
     users = JSON.parse(localStorage.udata);
     comments = JSON.parse(localStorage.cdata);
    load();
}

 function getData(){  
     console.log("asd");
    if (localStorage.pdata){
        posts = JSON.parse(localStorage.pdata);
        users = JSON.parse(localStorage.udata);
        comments = JSON.parse(localStorage.cdata);
        //load();
    }
    else{
    jQuery.ajax({
        url: "https://jsonplaceholder.typicode.com/posts",
        type: "GET",
        async: false,
        success: function(postData) {
            var posts = new Promise((resolve, reject)=>{
                
            })
             localStorage.pdata = JSON.stringify(postData);     
        },
        error : function(jqXHR, textStatus, errorThrown) {
        },
    });

    jQuery.ajax({
        url: "https://jsonplaceholder.typicode.com/comments",
        type: "GET",
        async: false,
        success: function(commentsData) {
            var deferred = new $.Deferred();
            localStorage.cdata = JSON.stringify(commentsData);
        },
        error : function(jqXHR, textStatus, errorThrown) {
        },
    });


    jQuery.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        type: "GET",
        async: false,
        success: function(usersData) {
            localStorage.udata = JSON.stringify(usersData);
        },
        error : function(jqXHR, textStatus, errorThrown) {
        },
    });
         
    }
    posts = JSON.parse(localStorage.pdata);
    users = JSON.parse(localStorage.udata);
    comments = JSON.parse(localStorage.cdata);
    createPost();
    load();
    jQuery("#Btn").hide();
}

$(window).scroll(function() {
  //console.log(Math.ceil($(window).scrollTop()) + ":" + $('#div1').height() +":" +$(document).height())
    if(Math.ceil($(window).scrollTop()) + $('#div1').height() >= $(document).height()){
        num++;
       load();
    }
});



function createPost(){
    var html = `
    <input type="button"  class="btn btn-primary" name="createPost" value="Create Post" onclick="createPostForm()"/>
    <div id="newForm" class="form-group" style="display:none">
    <br><input class="form-control" id ="new_art_name" name="name" type="text" class="input_comment_name" placeholder="Name..." required/>
    <br><input class="form-control" id ="new_art_title" name="title" type="text" class="input_comment_email" placeholder="Title..." required/>
    <br><input class="form-control" id ="new_art_body" name="body" type="text" class="input_comment_body" placeholder="Body..." required/>
     <br> <button class = "btn btn-success" onclick="addPost()">New Post</button>   
    </div>
    `;
    jQuery('#div1').append(html);

}


function createPostForm(){
    if(document.getElementById('newForm').style.display == "none"){
        document.getElementById('newForm').style.display = "block";
     } else {
       document.getElementById('newForm').style.display = "none";
     }
}

function addPost(){
    if(document.getElementById("new_art_body").value != "" && document.getElementById("new_art_title").value!= ""
    && document.getElementById("new_art_name").value != ""){
    var newId = posts.length+1;
    var userId =  posts.length;
    console.log(userId);
    var id = users.length+1;
    var post = {
    
        'body': document.getElementById("new_art_body").value,
        'id': newId,
        'title': document.getElementById("new_art_title").value,
    };
    var user = {
        'name': document.getElementById("new_art_name").value,
        'id' : id,
        'username' : 'Pratik',
        'email' : 'deb@gmail.com'
    }
    users.push(user);
    localStorage.udata = JSON.stringify(users);

    console.log(post);
    posts.push(post);
    console.log(posts);
    localStorage.pdata = JSON.stringify(posts);
    alert("Post added successfully");
}
else{
    alert("Please fill the form");
}
}

function load(){
    //console.log(posts);
     
     var html = `
             `;
            for(var i = (num-1)*2; i < num*2; i++){ 
                //console.log(i);          
                html +=`
                
                <div id = "delPost${i}" class="form-group">
                <table id = "table${i}">
                    <tbody>
                    <tr><td>Name:</td></tr><br>
                     <tr>
                         <td><p><h3>${users[posts[i].userId-1].name}</h3></p></td>
                     </tr>
                     <tr><td>Title:</td></tr><br>
                    <tr>
                        <td><p><h3>${posts[i].title}</h3></p></td><br>
                    </tr>
                    <tr><td>Post:</td><br>
                    <tr>
                        <td><h3 id="post${i}">${posts[i].body}</h3></td><br>
                    </tr>
                    <tr>
                        <td>
                        <input type="button"  class="btn btn-primary" name="comments" onclick="commentsShow(${i})" value="comments" id="commentshow${i}"/>
                        <input type="button"  class="btn btn-danger" name="deletepost" value="Delete Post" onclick="removePost(${i})"/>
                        
                        </td>
                    </tr>
                    <tr>
                    <td>
                        <br><input type="button"  class="btn btn-primary" name="commentButton" value="Add comment" onclick="addComments(${i})"/><br><br>
                        <textarea class="form-control" id="addcomments${i}" rows="1" cols="100" placeholder="Write a comment..."></textarea><br> 
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    <div id = "delComments${i}" style="display: none;">
                    `
                        for(var j = 0; j < comments.length; j++){
                            if(posts[i].id == comments[j].postId){
                                html+=`
                                <table>

                                <tr>
                                <td>
                            
                                <h3 name="comment" class ="textInput${j}" id='textInput${j}'>${comments[j].body}</h3>
                                <input type="button" name="Delete comment"  class="btn btn-danger" id="deleteCommentId${j}" class="deleteCommentClass${j}" value="Delete Comment" onclick="deleteComment(${comments[j].id}, ${j})"/>
                                <span class="icon${j}" id="iconId${j}"><i onclick='myLike(this)' class='fa fa-thumbs-up'></span></i><br>
                            
                                </td>
                              
                                </tr>

                                </table>
                                
                        
                            `;                   
                        }
                    }
                    html += `
                    </div>
                    <tr><td><hr></td></tr>
                    </tbody>
                    </table>
                    </div>`;
                            
            }
        jQuery('#div1').append(html);
    }

var clicks = 0;

function savePost(k){
    if(document.getElementById("postBox"+k).value != ""){
        var newId = posts.length+1;
        var post = {
            'userId' : posts[k].userId,
            'id' : newId,
            'title': document.getElementById("title"+k).value,
            'body': document.getElementById("postBox"+k).value
        };
        //console.log(post);
        posts.push(post);
        localStorage.pdata = JSON.stringify(posts);
        alert("New post created");
        document.getElementById("postBox"+k).value = "";
        var element1 = document.getElementById("postBox"+k);
        element1.parentNode.removeChild(element1);   
    } else {
        alert("Please enter the post");
    } 
}


function addPosts(j){
    clicks++;
    if(clicks >= 1){
    var ht = document.getElementById("postAdd"+j);
    ht.insertAdjacentHTML("afterend", "<textarea id='postBox' rows='3' cols='100' id=''></textarea><br><br>");
    document.getElementById('postBox').id = 'postBox'+j;
    }
    
    // document.getElementById("commentBox"+comment).value = newComment;
    // document.getElementById("addcomments"+comment).value = "";
}


function addComments(comment){
    if(document.getElementById("addcomments"+comment).value != ""){

    var newComment = document.getElementById("addcomments"+comment).value;
    var h = document.getElementById("addcomments"+comment);
    //var idCount = 1;
    
    h.insertAdjacentHTML("afterend", "<h3 id='commentBox'></h3> <br> <input type='button' name='Delete comment' class='btn btn-danger' id='del' class='' value='Delete Comment'/> <span class='' id=''><i onclick='myLike(this)' class='fa fa-thumbs-up'></span></i><br>");
    
    $('#del').attr('id', comment);
    
    commentBox.innerText = newComment;
    document.getElementById('commentBox').id = 'commentBox'+comment;
    document.getElementById("commentBox"+comment).value = newComment;
    document.getElementById("addcomments"+comment).value = "";


    if(document.getElementById("addcomments"+comment) != ""){
        var newId = comments.length+1;
        var newPostId = comments.length+1;
        var newcomment = {
            'postId' : newPostId,
            'id' : newId,
            'name': 'Debashish'+comment,
            'email': 'abc123@gmail.com'+comment,
            'body': document.getElementById("addcomments"+comment).value
        };

        comments.push(newcomment);
        localStorage.cdata = JSON.stringify(comments);
        console.log(comments);

    }
    document.getElementById("addcomments"+comment).value = ""; 
}

}

function removePost(i) {
    console.log(i);
               for(var k = 0; k < posts.length; k++){
                 if(k == i){ 
                     console.log("In");
                     posts.splice(k, 1);
                 }
             }
             localStorage.pdata = JSON.stringify(posts);
             //load();       
        console.log(posts);
        var element = document.getElementById("delPost"+i);
        element.parentNode.removeChild(element);
    } 

    // function delComments(){

    // }
    
function deleteComment(id, j){
    console.log("in the del");
        for(var k = 0; k<comments.length; k++){
            //console.log(posts[k].id+ "is"+ comments[k].id);
            if(comments[k].id==id){
                console.log(comments[k].id+ "is"+ id);
                comments.splice(k, 1);
                var comText = document.getElementById("textInput"+j);
                console.log(comText);
                comText.parentNode.removeChild(comText);
                var comIcon = document.getElementById("iconId"+j);
                comIcon.parentNode.removeChild(comIcon);
                var comButton = document.getElementById("deleteCommentId"+j);
                comButton.parentNode.removeChild(comButton);
            }
            
        }
        
        console.log(comments);
        localStorage.cdata = JSON.stringify(comments);
        load(); 

        
}   




 function commentsShow(i) {   
           if(document.getElementById('delComments'+i).style.display == "none"){
             document.getElementById('delComments'+i).style.display = "block";
          } else {
            document.getElementById('delComments'+i).style.display = "none";
          }
 
 }

$(function()
{

    // Initially hide the text box
    $("#text").hide();

    $("#driver").click(function()
    {

         $("#text").toggle();
         return false; // We don't want to submit anything here!

    });

});


function myLike(x) {
    x.classList.toggle("fa-thumbs-down");
}
