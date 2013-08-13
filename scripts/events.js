var VNTS = {
  events: function() {
    $('#fetch').click(function(event) {
      RCPTN.fetch();
    });

    $('#edit').click(function(event) {
      RCPTN.editable();
      event.preventDefault();
    });

    $('#refresh').click(function(event) {
      RCPTN.fetch();
    });

    $('#create').click(function(event) {
      RCPTN.create(true);
      RCPTN.editing();
    });

    $(document.body).on("change", "#file", function(event) {
      RCPTN.file(this);
    });

    $(document.body).on("change", "#member input", function(event) {
      RCPTN.flag();
    });

    $(document.body).on("click", "#back", function(event) {
      RCPTN.level(this);
      event.preventDefault();
    });

    $(document.body).on("click", "#return", function(event) {
      RCPTN.data();
      RCPTN.return();
    });

    $(document.body).on("click", "#cancel", function(event) {
      RCPTN.editing();
      RCPTN.cancel();
      event.preventDefault();
    });

    $(document.body).on("click", "#confirm", function(event) {
      RCPTN.excise(this);
      RCPTN.return();
    });

    $(document.body).on("click", "#editholder .avatar", function(event) {
      $('#file').click();
      event.preventDefault();
    });

    $(document.body).on("click", "#placeholder .companies .action", function(event) {
      RCPTN.level(this, "companies");
      event.preventDefault();
    });

    $(document.body).on("click", ".item-edit", function(event) {
      RCPTN.editing();
      RCPTN.active(this);
      RCPTN.create();
      event.preventDefault();
    });

    $(document.body).on("click", ".item-delete", function(event) {
      RCPTN.editing();
      RCPTN.active(this);
      RCPTN.drop();
      event.preventDefault();
    });

    $(document.body).on("click", ".close", function(event) {
      RCPTN.editing();
      RCPTN.cancel();
      event.preventDefault();
    });

    $(document.body).on("submit", "form", function(event) {
      $('#return').click();
      event.preventDefault();
    });
  },
  init: function() {
    
  }
}