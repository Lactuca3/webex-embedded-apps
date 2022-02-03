 var app = new window.Webex.Application();

 function handleDisplayContextChange(event) {
    console.log("Start of handleDisplayContextChange")  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1").textContent = "TEST";
 }

 function handleInfoChange(event) {
    console.log("Start of handleInfoChange")  
    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById("div1").textContent = "BOB";
 }

 // Wait for onReady promise, handle error scenario
 app.onReady().then(() => {
     log("Application ready. App", app);
     // Display the ID of the current user
     app.context.getUser().then((user)=> {
         log("User Name", user.displayName)
     }).catch((errorcode) => {
         log("Error", errorcode)
     })

     app.listen()
     .then(() => {
      console.log("Hit this code! Wooo!")
      app.on("application:displayContextChanged", (event) => {
        handleDisplayContextChange(event);
      })
      app.on("meeting:infoChanged", (event) => {
        handleInfoChange(event);
      })
     }).catch((err)=>{
        console.log("Error in listen")
        console.log(err);
     });

 }).catch((errorcode) =>  {
     log("Error with code: ", Webex.Application.ErrorCodes[errorcode])
 });

 function log(type, data) {
     let ul = document.getElementById("console");
     let li = document.createElement("li");
     let payload = document.createTextNode(`${type}: ${JSON.stringify(data)}`);
     li.appendChild(payload)
     ul.prepend(li);
 }
