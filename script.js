//Add a listener in order to display the hidden items if user clicks on it.
const plus = document.querySelector('.show');
plus.addEventListener('click', () => {
    document.querySelectorAll('.reveal').forEach(item => {
        item.classList.toggle('reveal');
    }
    )
    document.querySelector('.show').style.display = "none";
    document.querySelector('.moins').style.display = "inline-block";
})
//Add an listener in order to show less items if user clicks on it.
const moins = document.querySelector('.moins');
moins.addEventListener('click', () => {
    document.querySelectorAll('.show_item').forEach(item => {
        item.classList.toggle('reveal');
    })

    document.querySelector('.show').style.display = "inline-block";
    document.querySelector('.moins').style.display = "none";
})

const allSpans = document.querySelectorAll('#filter span');
allSpans.forEach(span => span.addEventListener('click', toggleFilter));
/**
 * Create an function named toggleFilter which will create a filter of items
 * @param {PointerEvent} event 
 */
function toggleFilter(event) {
    const filter = event.currentTarget.getAttribute('data-filter');
    event.currentTarget.parentElement.querySelector('.active').classList.remove('active');
    event.currentTarget.classList.add('active');
    if (filter === "read") {
     document.querySelectorAll('.loading').forEach(item => {
        item.classList.add('hide-loading');
     });
     document.querySelectorAll('.still_no_read').forEach(item => {
        item.classList.add('hide-no-read');
     });
     document.querySelectorAll('.already_read').forEach(item => {
        item.classList.remove('hide-read');
     })
     document.querySelector('.moins').classList.add('moins');
    }
    else if (filter === 'load') {
        document.querySelectorAll('.loading').forEach(item => {
            item.classList.remove('hide-loading');
         });
         document.querySelectorAll('.still_no_read').forEach(item => {
            item.classList.add('hide-no-read');
         });
         document.querySelectorAll('.already_read').forEach(item => {
            item.classList.add('hide-read');
         })
         
    }
    else if (filter === 'unread') {
        document.querySelectorAll('.loading').forEach(item => {
            item.classList.add('hide-loading');
         });
         document.querySelectorAll('.still_no_read').forEach(item => {
            item.classList.remove('hide-no-read');
         });
         document.querySelectorAll('.already_read').forEach(item => {
            item.classList.add('hide-read');
         })
    }
    else {
        document.querySelectorAll('.loading').forEach(item => {
            item.classList.remove('hide-loading');
         });
         document.querySelectorAll('.still_no_read').forEach(item => {
            item.classList.remove('hide-no-read');
         });
         document.querySelectorAll('.already_read').forEach(item => {
            item.classList.remove('hide-read');
         })
    }
}



