//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
function Address(street, city, state, type) {
  this.street = street;
  this.city = city;
  this.state = state;
  this.type = type;
}

Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() {
  return this.type + ", " + this.street + ", " + this.city + ", " + this.state;
}


//user inferface logic
function resetFields() {
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    $("input#new-state").val("");
    $("input#new-type").val("");
}

$(document).ready(function(){

  $("#add-address").click(function() {
    $("#new-addresses").append('<div id="removeableAddresses" class="new-address">' +
                                 '<div class="form-group">' +
                                   '<label for="new-street">Street</label>' +
                                   '<input type="text" class="form-control new-street">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-city">City</label>' +
                                   '<input type="text" class="form-control new-city">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-state">State</label>' +
                                   '<input type="text" class="form-control new-state">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-type">Type</label>' +
                                   '<input type="text" class="form-control new-type" placeholder="i.e. Home, Work, etc.">' +
                                 '</div>' +
                               '</div>');
  });

  $('form#new-contact').submit(function(event){
    event.preventDefault();

    var inputtedFirstName = $('input#new-first-name').val();
    var inputtedLastName = $('input#new-last-name').val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    $(".new-address").each(function() {
      var inputtedStreet = $(this).find("input.new-street").val();
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var inputtedType = $(this).find("input.new-type").val();

      var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState, inputtedType);
      newContact.addresses.push(newAddress);
    });

    $("#removeableAddresses").remove();

    $('ul#contacts').append("<li><span class='contact'>" + newContact.fullName() + "</span></li>");

    $(".contact").last().click(function() {
      $('#show-contact').show();
      $("#show-contact h2").text(newContact.fullName());
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    resetFields();

  });
});
