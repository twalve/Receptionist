var RCPTN = {
  COMPANY: 0,
  CURRENT: 0,
  DATA: null,
  LEVEL: "companies",// members
  MEMBER: 0,
  active: function(which) {
    var $active = $("#placeholder").find("li");
    var $target = $(which).closest("li");
    var index = $active.index($target);

    if (RCPTN.LEVEL === "companies") {
      RCPTN.COMPANY = index;
    }
    else {
      RCPTN.MEMBER = index;
    }
  },
  add: function() {
    var extra = {
			"name": "",
			"logo": "",
			"members": [
				{
					"name": "",
					"email": "",
					"phone": "",
					"position": ""
				}
			]
		};
    var member = {
      "name": "",
			"email": "",
			"phone": "",
			"position": ""
    };

    if (RCPTN.LEVEL === "companies") {
      this.DATA.companies.push(extra);
    }
    else {
      this.DATA.companies[RCPTN.COMPANY].members.push(member);
    }
  },
  cancel: function() {
    if ($('#editholder').hasClass("blank")) {
      this.drop();

      $('#editholder').removeClass("blank");
    }
  },
  create: function(add) {
    var source;
    var template;
    var data;

    if (add) {
      this.add();

      if (RCPTN.LEVEL === "companies") {
        RCPTN.COMPANY = RCPTN.DATA.companies.length - 1;
      }
      else {
        RCPTN.MEMBER = RCPTN.DATA.companies[RCPTN.COMPANY].members.length - 1;
      }
    }

    if (RCPTN.LEVEL === "companies") {
      source = $("#edit-companies").html();
      data = RCPTN.DATA.companies[RCPTN.COMPANY];
    }
    else {
      source = $("#edit-members").html();
      data = RCPTN.DATA.companies[RCPTN.COMPANY].members[RCPTN.MEMBER];
    }

    template = Handlebars.compile(source);

    $("#editholder").html(template(data));

    if (!!add) {
      $("#editholder").addClass("blank");
    }
  },
  data: function() {
    var data;
    var company = RCPTN.DATA.companies[RCPTN.COMPANY];
    var member;

    if (RCPTN.LEVEL === "companies") {
      company.name = $('#edit-name').val();
      company.logo = $('#edit-logo').val();
    }
    else {
      member = company.members[RCPTN.MEMBER];

      member.name = $('#edit-name').val();
      member.logo = $('#edit-logo').val();
      member.email = $('#edit-email').val();
      member.phone = $('#edit-phone').val();
      member.role = $('#edit-position').val();
    }
  },
  drop: function(which) {
    var source = $("#confirm-delete").html();
    var template;
    var data;

    if (RCPTN.LEVEL === "companies") {
      data = RCPTN.DATA.companies[RCPTN.COMPANY];
    }
    else {       
      data = RCPTN.DATA.companies[RCPTN.COMPANY].members[RCPTN.MEMBER];
    }

    template = Handlebars.compile(source);

    $("#editholder").html(template(data));
  },
  editing: function() {
    $(document.body).toggleClass("editing");
  },
  editable: function() {
    var $body = $(document.body);

    $body.toggleClass("editable");

    if ($body.hasClass("editable")) {
      RCPTN.sorting();
      $('.mask').removeClass("action");
    }
    else {
      RCPTN.unsorting();
      $('.mask').addClass("action");
    }
  },
  excise: function(which) {
    var temp = RCPTN.DATA;
    
    if (RCPTN.LEVEL === "companies") {
      RCPTN.DATA.companies.splice(RCPTN.COMPANY, 1);
    }
    else {
      RCPTN.DATA.companies[RCPTN.COMPANY].members.splice(RCPTN.MEMBER, 1);
    }
  },
  fetch: function() {
    var url = this.url() + 'reception?fetch=' + this.stamp() + '&callback=?';

    $.ajax({
      dataType: 'jsonp',
      url: url,
      success: function(data) {
        RCPTN.DATA = data;
        RCPTN.populate();
      }
    });
  },
  file: function(which) {
    var file = which.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;

    if (name.length < 1) {
      return false;
    }
    else if (size > 1110112) {//102400
      alert("File is too big");
    }
    else if (type !== 'image/png' && type !== 'image/jpg' && type !== 'image/gif' && type !== 'image/jpeg' ) {
      alert("File must be either a PNG, JPG, or GIF");
    }
    else {
      RCPTN.upload();
    }
  },
  level: function(which, level) {
    this.CURRENT = $("#members .action").index(which);

    if (level === "companies") {
      this.LEVEL = "members";
      this.COMPANY = this.CURRENT;
    }
    else {
      this.LEVEL = "companies";
    }

    this.populate();
  },
  populate: function() {
    var source;
    var template;
    var data;
    var id;

    if (RCPTN.LEVEL === "companies") {
      source = $("#show-companies").html();
      data = RCPTN.DATA;
      id = "view-companies";
    }
    else {
      source = $("#show-members").html();
      data = RCPTN.DATA.companies[RCPTN.CURRENT];
      id = "view-members";
    }

    template = Handlebars.compile(source);

    $("#placeholder").html(template(data));
    $(document.body).attr("id", id).removeClass("unloaded");
  },
  return: function() {
    var url = this.url();
    var data = JSON.stringify(RCPTN.DATA, null, '\t');

    $.ajax({
      type: 'POST',
      data: data,
      url: url + 'receive/?' + this.stamp(),
      contentType: "application/json",
      dataType: "json",
      success: function(response) {
        RCPTN.editing();
        RCPTN.fetch();
      }
    });
  },
  sorting: function() {
    $("#members").sortable({
      placeholder: "ui-state-highlight",
      start: function(event, ui) {
        console.log("stated at => " + ui.item.index())
      },
      drag: function() {

      },
      stop: function(event, ui) {
        console.log("ended at => " + ui.item.index())

        // resort(this);
      }
    }).disableSelection();
  },
  unsorting: function() {
    $("#members").sortable("destroy");
  },
  stamp: function() {
    return (new Date()).getTime();
  },
  start: function() {
    $('#fetch').click();
    this.year();
  },
  upload: function() {
    $.ajax({
      url: $('#upload').attr("action"),
      type: 'POST',
      xhr: function() {  // custom xhr
        var myXhr = $.ajaxSettings.xhr();

        if (myXhr.upload) { // if upload property exists
          myXhr.upload.addEventListener('progress', RCPTN.progress, false); // progressbar
          myXhr.upload.addEventListener("load", RCPTN.transfer, false);
        }

        return myXhr;
      },
      success: successHandler = function(data) {
        var source = $('#source').val();
        var path = data.split("public/")[1];
        var name = path.split("images/")[1];
        var uri = source + path;
        
        name = name.substring(name.lastIndexOf("."));

        $('aside').eq(0).find("img").attr("src", "graphics/blank.gif").css("background-image", "url(" + uri + ")").attr("alt", name);
        $('#edit-logo').val(uri);
      },
      error: errorHandler = function(error) {
        console.log("Upload error => " + error);
      },
      data: new FormData($('#upload')[0]),// IE10+,
      // Options: don't process data or worry about content-type
      cache: false,
      contentType: false,
      processData: false
    }, 'json');
  },
  url: function() {
    return $('#source').val() || "http://localhost:1337/";
  },
  year: function() {
    $('#year').text((new Date()).getFullYear());
  },
  init: function() {
    VNTS.events();
    this.start();
  }
};
