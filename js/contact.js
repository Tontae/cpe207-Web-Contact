document.querySelector('#contactForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
  // prevent default form submitting
  e.preventDefault();

  // get form values
  var siteName = document.querySelector('#name').value;
  var siteEmail = document.querySelector('#email').value;
  var siteURL = document.querySelector('#url').value;
  var sitemsg = document.querySelector('#message').value;
  
  if (!validateForm(siteName, siteURL, siteEmail)) {
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteURL,
    mail: siteEmail,
    message: sitemsg
  }

  console.log(bookmark);

  // local storage test
  // localStorage.setItem('bookmarks',JSON.stringify(bookmark));
  // console.log(JSON.parse(localStorage.getItem('bookmarks')));

  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  
  // Clear fields
  document.querySelector('#name').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#url').value = '';
  document.querySelector('#message').value = '';

  fetchBookmarks();  
}

function deleteBookmark(url) {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  for (var i=0; i<bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      bookmarks.splice(i,1);
    }
  }

  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  var bookmarksResults = document.querySelector('#bookmarksResults');

  bookmarksResults.innerHTML = '';

  var str = '<div class="card-deck text-center">';
  
  for (var i=0; i<bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    var mail = bookmarks[i].mail;
    var message = bookmarks[i].message;

    str += '<div class="col-sm-6 col-md-4 col-lg-3">' 
        + `<div class="card mb-4 shadow-sm">`
        + `<div class="card-header"><h5 class="my-0">${name}</h5></div>`
        + `<div class="card-body" style="width: 200px">`
        + `<div><p>${message}</p></div><br>`
        + `<a class="primary_btn" target="_blank" href="${url}">Visit</a>`
        + ` <a onclick="deleteBookmark('${url}')" class="primary_btn tr-bg" href="#">Delete</a>`
        + `</div></div></div>`;
  }
  str += '</div>'

  bookmarksResults.innerHTML = str;
}

function validateForm(siteName, siteURL, siteEmail) {
  if (!siteName || !siteURL || !siteEmail) {
    alert('Please fill in all data fields');
    return false;
  }

  var expURL = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var expEMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var regexURL = new RegExp(expURL);
  var regexEMAIL = new RegExp(expEMAIL);

  if (!siteURL.match(regexURL)) {
    alert('Please a valid URL');
    return false;
  }
  if (!siteEmail.match(regexEMAIL)) {
    alert('Please a valid Email');
    return false;
  }

  return true;
}