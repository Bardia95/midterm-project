$(document).ready(function() {
  // new post form
  $("#newpost").on("click", function() {
    $(".new-post").dialog("open");
  });
  // sets dialog specifications and closes dialog if clicked outside
  $(".new-post").dialog({
    autoOpen: false,
    modal: true,
    dialogClass: 'noTitleStuff',
    show: {
      effect: "fade",
      duration: 150
    },
    hide: {
      effect: "fade",
      duration: 150
    },
    clickOutside: true,
    clickOutsideTrigger: "#newpost"
  });
  $(".post-form").on("submit", function(event) {
    event.preventDefault();
    const formSubmissionData = $(event.target);
    const URL = formSubmissionData.children("input#URL").val();
    const type = formSubmissionData.children("input[name='type']:checked").val();
    const subject = formSubmissionData.children("input[name='subject']:checked").val();
    const description = formSubmissionData.children("textarea.description").val();
    const title = formSubmissionData.children("input#title").val();
    const date = new Date().getTime();

    $.ajax({
      url: "/post",
      type: "POST",
      data: {
        title: title,
        link: URL,
        type: type,
        subject: subject,
        description: description,
        date: date
      }
    }).then(function(response) {
      if (response) {
        $("post").data("");
        $(".new-post").dialog("close");
        document.location.href = "/";
      } else {
        window.alert("Invalid Post");
      }
    });
  });
});
