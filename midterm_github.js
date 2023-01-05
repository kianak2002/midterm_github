const username = document.getElementById('username_id');
languages = [];
const item = "";

//activates the sendRequest function when submit_button is clicked
for (var clickButton of document.getElementsByClassName(
    "submit_button"
  ))
    clickButton.addEventListener("click", sendRequest);

/*
displays the data in the boxes 
*/
function displayGithub(response, lang) {
    console.log(response)
    if(response.login == username.value){
        document.getElementById("email").innerHTML = response.blog;
        document.getElementById("name").innerHTML = response.name;
        document.getElementById("address").innerHTML = response.location;
        document.getElementById("profile_pic").src = response.avatar_url;
        document.getElementById("profile_pic").alt = "This Username doesn't have any picture";
        document.getElementById("bio").innerHTML = response.bio;
        document.getElementById("error").innerHTML = "";
        document.getElementById("save").innerHTML = "";
        document.getElementById("language").innerHTML = res;

        var item = {
            "email": response.blog,
            "name": response.name,
            "address": response.location,
            "pic_url": response.avatar_url,
            "bio": response.bio,
            "lan": lang
        }
        save_data(JSON.stringify(item));
    
    }
    else{
        document.getElementById("error").innerHTML = "The Username Not Found!";
        document.getElementById("save").innerHTML = "";
    }
}

/*
sends request to the username github profile 
then sends the response to the display function
*/
function sendRequest(){
    // localStorage.clear();
    let content = JSON.parse(window.localStorage.getItem(username.value));
    if (content != null){
        load_data();
    }

    else{
        repositories();
    }
}

// save username data in local storage
function save_data(item) {
    let username_git = username.value;
    window.localStorage.setItem(username_git, item);
    } 

/*
loads data from local storage and displays them
*/
function load_data() {
    let saved_data = JSON.parse(window.localStorage.getItem(username.value));
    document.getElementById("email").innerHTML = saved_data["email"];
    document.getElementById("name").innerHTML = saved_data["name"];
    document.getElementById("address").innerHTML = saved_data["address"];
    document.getElementById("profile_pic").src = saved_data["pic_url"];
    document.getElementById("profile_pic").alt = "This Username doesn't have any picture"
    document.getElementById("bio").innerHTML = saved_data["bio"];
    document.getElementById("save").innerHTML = "data comes from local storage";
    document.getElementById("error").innerHTML = "";
    document.getElementById("language").innerHTML= saved_data["lan"];
    }

/*
get repositories from git  
*/
function repositories() {
    let request = "https://api.github.com/users/" + username.value + "/repos?&sort=pushed&direction=desc";
    fetch(request)
    .then(response => response.json())
    .then(response => requests(response))
    
    // document.getElementById("language").innerHTML = response;
}

function requests(response) {
    console.log(response);
    repo1 = JSON.stringify(response[1]);
    repo_json1 = JSON.parse(repo1);
    lan1 = repo_json1["language"];
    repo2 = JSON.stringify(response[2]);
    repo_json2 = JSON.parse(repo2);
    lan2 = repo_json2["language"];
    repo3 = JSON.stringify(response[3]);
    repo_json3 = JSON.parse(repo3);
    lan3 = repo_json3["language"];
    repo4 = JSON.stringify(response[4]);
    repo_json4 = JSON.parse(repo4);
    lan4 = repo_json4["language"];
    repo5 = JSON.stringify(response[5]);
    repo_json5 = JSON.parse(repo5);
    lan5 = repo_json5["language"];
  
    languages.push(lan1);
    languages.push(lan2);
    languages.push(lan3);
    languages.push(lan4);
    languages.push(lan5);
    res = most_frequent(languages);
    languages = [];
    if(res == null)
        res = lan1;

    ////// send request for username's info except language
    let request = "https://api.github.com/users/" + username.value;
        fetch(request)
        .then(response => response.json())
        .then(response => displayGithub(response,res))
        .catch(err => console.error("[Fetch Error]:", err));  // handles network error !!!!

}

function most_frequent(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
}


