// Group Project 2021 UG6

// Save the roomID chosen and open the join.html page.
function startCall(room){
    sessionStorage.setItem("roomID", room)
    console.log("Hi")
    window.location.href="join.html"
}