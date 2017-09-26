// // back-end
function Ticket(movie, time, threeD, age) {
  this.movie = movie;
  this.time = time;
  this.threeD = threeD;
  this.age = age;
}

Ticket.prototype.bookingDetails = function() {
  return "You are purchasing " + this.age + " tickets to see: " + this.movie +  " at " + this.time + ".";
}

Ticket.prototype.finalPrice = function() {
  var price = 12;
  if (this.threeD === "true") {
    price += 8;
  }
  if (this.time === 'matinee') {
    price -= 3;
  }
  else if (this.age !== 'adult') {
    price -= 4;
  }
  return price;
};

// front-end
$(document).ready(function() {
  $("form#booking").submit(function(event) {
    event.preventDefault();

    var movie = $("#movie").val();
    var time = $("#time").val();
    var threeD = $("#3D").val();
    var age = $("#age").val();
    var newTicket = new Ticket(movie, time, threeD, age);
    var finalPrice = newTicket.finalPrice();
    var bookingDetails = newTicket.bookingDetails();

    $(".output h2").text(finalPrice);
    $(".output p").text(bookingDetails);
    $("form#booking").fadeOut(600);

  });
});
