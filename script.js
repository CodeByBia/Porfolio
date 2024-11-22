const form = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

function sendEmail(){
  const bodymessage = `Name: ${name.value}<br> Email: ${email.value}<br> Number: ${number.value}<br> Message: ${message.value}<br>`

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : 'beatrizmartins3252@gmail.com',
        Password : "B37BBF3A5B04603978F4705C2483D5E021CE",
        To : 'beatrizmartins3252@gmail.com',
        From : 'beatrizmartins3252@gmail.com',
        Subject : subject.value,
        Body : bodymessage
    }).then(
      message => {
        if (message == "OK"){
          Swal.fire({
            title: "Sucess!",
            text: "Message sent Sucessfully!",
            icon: "success"
          });
        }
      }
    );
}

function checkInputs(){
  const items = document.querySelectorAll(".item");

  for (const item of items){
    if (item.value == ""){
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  sendEmail();
});