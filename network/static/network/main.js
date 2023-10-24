document.addEventListener('DOMContentLoaded', function(){

    
    const modal= document.querySelector("[data-modal]");
    const openButton = document.querySelector("[data-open-modal]");
    const closeButton = document.querySelector("[data-close-modal]");

    console.log(modal);


    // // Open the dialog when the "Open Dialog" button is clicked
     openButton.addEventListener("click", function(e) {
        e.preventDefault();
        modal.showModal();
     });

    // // // Close the dialog when the "Close" button is clicked
      closeButton.addEventListener("click", function(e) {
         e.preventDefault();
         modal.close();
     });


     modal.addEventListener("click", function(e) {
         const dialogDimensions = modal.getBoundingClientRect()
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
           e.clientY < dialogDimensions.top ||
           e.clientY > dialogDimensions.bottom
         ) {
           modal.close()
         }
      })

      // to get data from form

    $.ajaxSetup({
        beforeSend: function beforeSend(xhr, settings) {
            function getCookie(name) {
                let cookieValue = null;
    
    
                if (document.cookie && document.cookie !== '') {
                    const cookies = document.cookie.split(';');
    
                    for (let i = 0; i < cookies.length; i += 1) {
                        const cookie = jQuery.trim(cookies[i]);
    
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
    
                return cookieValue;
            }
    
            if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
                // Only send the token to relative URLs i.e. locally.
                xhr.setRequestHeader('X-CSRFToken', getCookie('csrftoken'));
            }
        },
    });
    
    
        // ON Submit 

    $(document).on("click", ".js-submit", function(e){
        e.preventDefault();
        console.log('I am clicked')
        const text = $('.js-post-text').val().trim()
        const $btn = $(this)
        const dialog = document.querySelector('.js-modal'); // Select the dialog element
        const newButton = $('<div class="d-grid js-submit mb-2"><button type="button" class="btn btn-primary mb-1">Make Another Post</button></div>'); // Create a new button

        if(!text.length){
            return false
        }
        $('.js-modal').addClass("hidden")
        $('.js-post-text').val('')

    //  i copy and paste this 

    $btn.prop("disabled", true).text("Posting!")
    $.ajax({
        type: 'POST',
        url: $(".js-post-text").data("post-url"),
        data: {
            text: text
        },
        success: (dataHtml) => {
            dialog.close(); // Close the HTML <dialog> element
            $("#posts-container").prepend(dataHtml);
           $btn.replaceWith(newButton); // Replace the existing button with the new one
            $(".js-post-text").val('')
        },
        error: (error) => {
            console.warn(error)
            $btn.prop("disabled", false).text("Error");
        }
    });
})



// Follow and Unfollow 

.on('click', '.js-follow', function(e){
    e.preventDefault();
    action = $(this).attr('data-action')
    console.log('I am clicked')
    $.ajax({
        type: 'POST',
        url: $(this).data("url"),
        data: {
            action: action,
            username: $(this).data('username'),
        },
        success: (data) => {
            console.log(data)
            $('.js-follow-text').text(data.wording)
             if(action == "follow") {
                // change the word to unfollow
                $(this).attr("data-action", "unfollow")
               

            }else{
                // The opposite
                $(this).attr("data-action", "follow")
             
                
            }
            
        },
        error: (error) => {
            console.warn(error)
            
        }
    });



})

});



document.addEventListener('DOMContentLoaded', function(){

    // using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');

    
    // get form data
    const editButton = document.querySelector('.edit-post');
    const showEditForm = document.querySelector('.show-edit-form');

    const cardText = document.querySelector('.card-text');
    const editPostForm = document.querySelector('.js-post-text');
    const saveButton = document.querySelector('.save-post');
    const postId = editPostForm.getAttribute('data-id');
    
    editButton.addEventListener('click', function () {
        // Hide the post text and show the textarea for editing
        cardText.style.display = 'none';
        showEditForm.style.display = 'block';
        editPostForm.value = cardText.innerText;
        saveButton.style.display = 'block';

        
    });
    
    saveButton.addEventListener('click', () => {
        const updatedText = editPostForm.value;
        const url= `http://localhost:8000/api/post-update/${postId}/`
        
    
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Ensure you have a function to get the CSRF token
            },
            body: JSON.stringify({
                text: updatedText,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    // Update the displayed post text and hide the textarea
                    cardText.innerText = updatedText;
                    cardText.style.display = 'block';
                    editPost.style.display = 'none';
                    saveButton.style.display = 'none';
                } else {
                    // Handle error
                    console.error(data.message);
                }
            });
    });
    


    // testing api connection 

    const url = 'http://localhost:8000/api/post-list/'

function buildList(){
    fetch(url)
    .then(response => response.json())
    .then(data => {

        var list = data

        console.log(list)
        console.log(list[3])

        for ( var i in list) {
          
            const editButton = document.querySelector('.edit-post')[i];
            console.log(editButton)
        }

    })
}
// call the function 
//buildList()




  })
  



